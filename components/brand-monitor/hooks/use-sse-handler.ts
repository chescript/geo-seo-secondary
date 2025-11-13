import { useRef, useEffect } from 'react';
import { BrandMonitorState, BrandMonitorAction } from '@/lib/brand-monitor-reducer';
import { SSEParser } from '@/lib/sse-parser';
import { 
  ProgressData, 
  CompetitorFoundData, 
  PromptGeneratedData, 
  AnalysisProgressData, 
  PartialResultData 
} from '@/lib/types';

interface UseSSEHandlerProps {
  state: BrandMonitorState;
  dispatch: React.Dispatch<BrandMonitorAction>;
  onAnalysisComplete?: (analysis: any) => void;
}

export function useSSEHandler({ state, dispatch, onAnalysisComplete }: UseSSEHandlerProps) {
  // Use ref to track current prompt status to avoid closure issues in SSE handler
  const promptCompletionStatusRef = useRef(state.promptCompletionStatus);
  const analyzingPromptsRef = useRef(state.analyzingPrompts);
  
  useEffect(() => {
    promptCompletionStatusRef.current = state.promptCompletionStatus;
  }, [state.promptCompletionStatus]);
  
  useEffect(() => {
    analyzingPromptsRef.current = state.analyzingPrompts;
  }, [state.analyzingPrompts]);

  const handleSSEEvent = (eventData: any) => {
    console.log(`📥 [SSE] Event received: ${eventData.type} (stage: ${eventData.stage})`);
    if (eventData.data) {
      console.log('📦 [SSE] Event data:', eventData.data);
    }

    switch (eventData.type) {
      case 'progress':
        const progressData = eventData.data as ProgressData;
        dispatch({
          type: 'UPDATE_ANALYSIS_PROGRESS',
          payload: {
            stage: progressData.stage,
            progress: progressData.progress,
            message: progressData.message
          }
        });
        break;

      case 'competitor-found':
        const competitorData = eventData.data as CompetitorFoundData;
        dispatch({
          type: 'UPDATE_ANALYSIS_PROGRESS',
          payload: {
            competitors: [...(state.analysisProgress.competitors || []), competitorData.competitor]
          }
        });
        break;

      case 'prompt-generated':
        const promptData = eventData.data as PromptGeneratedData;
        const existingPrompts = analyzingPromptsRef.current || [];
        const analysisPrompts = state.analysisProgress.prompts || [];
        
        // If prompts are already set (from custom prompts), don't process prompt-generated events
        // This prevents overwriting the initial prompts set in handleAnalyze
        if (existingPrompts.length > 0) {
          
          // Still update analysis progress prompts to keep them in sync
          if (!analysisPrompts.includes(promptData.prompt)) {
            dispatch({
              type: 'UPDATE_ANALYSIS_PROGRESS',
              payload: {
                prompts: [...analysisPrompts, promptData.prompt]
              }
            });
          }
          break;
        }
        
        // Only process if this is truly a new prompt being generated
        if (!existingPrompts.includes(promptData.prompt)) {
          dispatch({
            type: 'UPDATE_ANALYSIS_PROGRESS',
            payload: {
              prompts: [...analysisPrompts, promptData.prompt]
            }
          });
          dispatch({
            type: 'SET_ANALYZING_PROMPTS',
            payload: [...existingPrompts, promptData.prompt]
          });
          
          // Initialize prompt completion status
          const newStatus = { ...promptCompletionStatusRef.current };
          const normalizedPrompt = promptData.prompt.trim();
          newStatus[normalizedPrompt] = {};
          state.availableProviders.forEach(provider => {
            newStatus[normalizedPrompt][provider] = 'pending';
          });
          dispatch({
            type: 'SET_PROMPT_COMPLETION_STATUS',
            payload: newStatus
          });
        }
        break;

      case 'analysis-start':
        const analysisStartData = eventData.data as AnalysisProgressData;
        const normalizedStartPrompt = analysisStartData.prompt.trim();
        
        dispatch({
          type: 'UPDATE_ANALYSIS_PROGRESS',
          payload: {
            currentProvider: analysisStartData.provider,
            currentPrompt: normalizedStartPrompt,
          }
        });
        
        dispatch({
          type: 'UPDATE_PROMPT_STATUS',
          payload: {
            prompt: normalizedStartPrompt,
            provider: analysisStartData.provider,
            status: 'running'
          }
        });
        
        // Update tile status to running
        const tileIndex = state.analysisTiles.findIndex(tile => tile.prompt === analysisStartData.prompt);
        if (tileIndex !== -1) {
          const updatedTile = { ...state.analysisTiles[tileIndex] };
          const providerIndex = updatedTile.providers.findIndex(p => p.name === analysisStartData.provider);
          if (providerIndex !== -1) {
            updatedTile.providers[providerIndex].status = 'running';
            dispatch({
              type: 'UPDATE_ANALYSIS_TILE',
              payload: { index: tileIndex, tile: updatedTile }
            });
          }
        }
        break;

      case 'partial-result':
        const partialData = eventData.data as PartialResultData;
        const normalizedPartialPrompt = partialData.prompt.trim();
        
        dispatch({
          type: 'UPDATE_ANALYSIS_PROGRESS',
          payload: {
            partialResults: [...(state.analysisProgress.partialResults || []), partialData],
          }
        });
        
        dispatch({
          type: 'UPDATE_PROMPT_STATUS',
          payload: {
            prompt: normalizedPartialPrompt,
            provider: partialData.provider,
            status: 'completed'
          }
        });
        
        // Update tile with result
        const partialTileIndex = state.analysisTiles.findIndex(tile => tile.prompt === partialData.prompt);
        if (partialTileIndex !== -1) {
          const updatedTile = { ...state.analysisTiles[partialTileIndex] };
          const providerIndex = updatedTile.providers.findIndex(p => p.name === partialData.provider);
          if (providerIndex !== -1) {
            updatedTile.providers[providerIndex] = {
              ...updatedTile.providers[providerIndex],
              status: 'completed',
              result: {
                brandMentioned: partialData.response.brandMentioned || false,
                brandPosition: partialData.response.brandPosition,
                sentiment: partialData.response.sentiment || 'neutral'
              }
            };
            dispatch({
              type: 'UPDATE_ANALYSIS_TILE',
              payload: { index: partialTileIndex, tile: updatedTile }
            });
          }
        }
        break;

      case 'analysis-complete':
        const analysisCompleteData = eventData.data as AnalysisProgressData;
        
        if (!analysisCompleteData.prompt || !analysisCompleteData.provider) {
          console.error('[ERROR] Missing prompt or provider in analysis-complete event');
          break;
        }
        
        const normalizedCompletePrompt = analysisCompleteData.prompt.trim();
        
        if (analysisCompleteData.status === 'failed') {
          dispatch({
            type: 'UPDATE_PROMPT_STATUS',
            payload: {
              prompt: normalizedCompletePrompt,
              provider: analysisCompleteData.provider,
              status: 'failed'
            }
          });

          // Store error message if available
          const errorMessage = (analysisCompleteData as any).error || 'Analysis failed';
          dispatch({
            type: 'UPDATE_PROMPT_ERROR',
            payload: {
              prompt: normalizedCompletePrompt,
              provider: analysisCompleteData.provider,
              error: errorMessage
            }
          });

          // Update tile status to failed
          const failedTileIndex = state.analysisTiles.findIndex(tile => tile.prompt === analysisCompleteData.prompt);
          if (failedTileIndex !== -1) {
            const updatedTile = { ...state.analysisTiles[failedTileIndex] };
            const providerIndex = updatedTile.providers.findIndex(p => p.name === analysisCompleteData.provider);
            if (providerIndex !== -1) {
              updatedTile.providers[providerIndex].status = 'failed';
              dispatch({
                type: 'UPDATE_ANALYSIS_TILE',
                payload: { index: failedTileIndex, tile: updatedTile }
              });
            }
          }
        } /* else if ('status' in analysisCompleteData && analysisCompleteData.status === 'skipped') {
          dispatch({
            type: 'UPDATE_PROMPT_STATUS',
            payload: {
              prompt: normalizedCompletePrompt,
              provider: analysisCompleteData.provider,
              status: 'skipped'
            }
          });
        } else */ {
          dispatch({
            type: 'UPDATE_PROMPT_STATUS',
            payload: {
              prompt: normalizedCompletePrompt,
              provider: analysisCompleteData.provider,
              status: 'completed'
            }
          });
        }
        break;

      case 'complete':
        console.log('✅ [SSE] Analysis complete event received');
        const completeData = eventData.data as { analysis: any };
        console.log('📊 [SSE] Analysis results:', {
          responsesCount: completeData.analysis?.responses?.length || 0,
          competitorsCount: completeData.analysis?.competitors?.length || 0,
          promptsCount: completeData.analysis?.prompts?.length || 0
        });

        dispatch({
          type: 'ANALYSIS_COMPLETE',
          payload: completeData.analysis
        });

        // Call the completion callback
        console.log('✅ [SSE] Analysis complete, calling onAnalysisComplete callback');
        if (onAnalysisComplete) {
          onAnalysisComplete(completeData.analysis);
        }
        break;

      case 'error':
        const errorData = eventData.data as { message?: string };
        console.error('❌ [SSE] Error event received:', errorData.message);
        dispatch({
          type: 'SET_ERROR',
          payload: errorData.message || 'Analysis failed'
        });
        break;
    }
  };

  const startSSEConnection = async (url: string, options?: RequestInit) => {
    console.log('📡 [SSE] Starting SSE connection to:', url);

    try {
      const response = await fetch(url, options);
      console.log('📡 [SSE] Response received, status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to analyze';

        try {
          const errorData = await response.json();
          console.error('❌ [SSE] Request failed with error data:', errorData);
          console.error('❌ [SSE] Error structure:', JSON.stringify(errorData, null, 2));

          // Extract error message from nested structure
          // Try multiple possible locations for the error message
          if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData.error === 'string') {
            errorMessage = errorData.error;
          } else {
            errorMessage = `Analysis failed with status ${response.status}`;
          }
          console.error('❌ [SSE] Extracted error message:', errorMessage);
        } catch (parseError) {
          console.error('❌ [SSE] Failed to parse error response:', parseError);
          errorMessage = `Analysis failed with status ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error('❌ [SSE] No response body available');
        throw new Error('No response body');
      }

      console.log('📡 [SSE] Stream reader obtained, starting to read events...');
      const parser = new SSEParser();
      const decoder = new TextDecoder();
      let eventCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('✅ [SSE] Stream completed, total events:', eventCount);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const events = parser.parse(chunk);

        for (const event of events) {
          if (event.data) {
            try {
              eventCount++;
              const eventData = JSON.parse(event.data);
              handleSSEEvent(eventData);
            } catch (e) {
              console.error('❌ [SSE] Failed to parse event:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('❌ [SSE] Connection error:', error);

      // Determine the error message to show
      let errorMessage = 'Failed to analyze brand visibility';

      if (error instanceof TypeError && error.message.includes('network')) {
        errorMessage = 'Connection lost. Please check your internet connection and try again.';
      } else if (error instanceof Error && error.message) {
        // Use the actual error message from the API
        errorMessage = error.message;
      }

      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      });

      // Reset progress
      dispatch({
        type: 'SET_ANALYSIS_PROGRESS',
        payload: {
          stage: 'initializing',
          progress: 0,
          message: '',
          competitors: [],
          prompts: [],
          partialResults: []
        }
      });
    }
  };

  return { startSSEConnection };
}