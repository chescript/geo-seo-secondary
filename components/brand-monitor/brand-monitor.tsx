"use client";

import React, {
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { Company } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { ClientApiError } from "@/lib/client-errors";
import {
  brandMonitorReducer,
  initialBrandMonitorState,
  BrandMonitorAction,
  IdentifiedCompetitor,
} from "@/lib/brand-monitor-reducer";
import {
  validateUrl,
  validateCompetitorUrl,
  normalizeCompetitorName,
  assignUrlToCompetitor,
  getIndustryCompetitors,
} from "@/lib/brand-monitor-utils";
import { getEnabledProviders } from "@/lib/provider-config";
import { useSaveBrandAnalysis } from "@/hooks/useBrandAnalyses";

// Components
import { UrlInputSection } from "./url-input-section";
import { CompanyCard } from "./company-card";
import { AnalysisProgressSection } from "./analysis-progress-section";
import { ResultsNavigation } from "./results-navigation";
import { PromptsResponsesTab } from "./prompts-responses-tab";
import { VisibilityScoreTab } from "./visibility-score-tab";
import { ErrorMessage } from "./error-message";
import { AddPromptModal } from "./modals/add-prompt-modal";
import { AddCompetitorModal } from "./modals/add-competitor-modal";
import { ProviderComparisonMatrix } from "./provider-comparison-matrix";
import { ProviderRankingsTabs } from "./provider-rankings-tabs";
import { ProviderSelector } from "./provider-selector";
import { UsageCounter } from "./usage-counter";

// Skeleton loaders
import { ScrapingSkeleton } from "./skeletons/scraping-skeleton";
import { CompetitorSkeleton } from "./skeletons/competitor-skeleton";
import { PromptSkeleton } from "./skeletons/prompt-skeleton";
import { AnalysisSkeleton } from "./skeletons/analysis-skeleton";

// Hooks
import { useSSEHandler } from "./hooks/use-sse-handler";

interface BrandMonitorProps {
  selectedAnalysis?: any;
  onSaveAnalysis?: (analysis: any) => void;
}

export function BrandMonitor({
  selectedAnalysis,
  onSaveAnalysis,
}: BrandMonitorProps = {}) {
  const [state, dispatch] = useReducer(
    brandMonitorReducer,
    initialBrandMonitorState
  );
  const [demoUrl] = useState("example.com");
  const saveAnalysis = useSaveBrandAnalysis();
  const [isLoadingExistingAnalysis, setIsLoadingExistingAnalysis] =
    useState(false);
  const hasSavedRef = useRef(false);
  const analysisSectionRef = useRef<HTMLDivElement>(null);

  const { startSSEConnection } = useSSEHandler({
    state,
    dispatch,
    onAnalysisComplete: (completedAnalysis) => {
      console.log("🔍 onAnalysisComplete called", {
        selectedAnalysis,
        hasSavedRef: hasSavedRef.current,
        completedAnalysis
      });

      // Only save if this is a new analysis (not loaded from existing)
      if (!selectedAnalysis && !hasSavedRef.current) {
        hasSavedRef.current = true;

        const analysisData = {
          url: company?.url || url,
          companyName: company?.name,
          industry: company?.industry,
          analysisData: {
            ...completedAnalysis,
            selectedProviders: state.selectedProviders,
          },
          competitors: state.identifiedCompetitors,
          prompts: state.analyzingPrompts,
        };

        console.log("💾 Attempting to save analysis:", analysisData);

        saveAnalysis.mutate(analysisData, {
          onSuccess: (savedAnalysis) => {
            console.log("✅ Analysis saved successfully:", savedAnalysis);
            if (onSaveAnalysis) {
              onSaveAnalysis(savedAnalysis);
            }
          },
          onError: (error) => {
            console.error("❌ Failed to save analysis:", error);
            hasSavedRef.current = false;
          },
        });
      } else {
        console.log("⏭️ Skipping save - already saved or loading existing");
      }
    },
  });

  // Extract state for easier access
  const {
    url,
    urlValid,
    error,
    loading,
    analyzing,
    preparingAnalysis,
    generatingPrompts,
    company,
    showInput,
    showCompanyCard,
    showPromptsList,
    showCompetitors,
    customPrompts,
    removedDefaultPrompts,
    identifiedCompetitors,
    availableProviders,
    selectedProviders,
    analysisProgress,
    promptCompletionStatus,
    analyzingPrompts,
    analysis,
    activeResultsTab,
    expandedPromptIndex,
    showAddPromptModal,
    showAddCompetitorModal,
    newPromptText,
    newCompetitorName,
    newCompetitorUrl,
    scrapingCompetitors,
  } = state;

  // Initialize available providers on mount
  useEffect(() => {
    if (availableProviders.length === 0) {
      const enabledProviders = getEnabledProviders();
      const providerNames = enabledProviders.map(p => p.name);
      if (providerNames.length > 0) {
        dispatch({ type: "SET_AVAILABLE_PROVIDERS", payload: providerNames });
        // Set default selected providers
        dispatch({ type: "SET_SELECTED_PROVIDERS", payload: providerNames });
      }
    }
  }, [availableProviders.length]);

  // Remove the auto-save effect entirely - we'll save manually when analysis completes

  // Load selected analysis if provided or reset when null
  useEffect(() => {
    if (selectedAnalysis && selectedAnalysis.analysisData) {
      setIsLoadingExistingAnalysis(true);
      // Restore the analysis state from saved data
      dispatch({
        type: "SET_ANALYSIS",
        payload: selectedAnalysis.analysisData,
      });
      if (selectedAnalysis.companyName) {
        dispatch({
          type: "SCRAPE_SUCCESS",
          payload: {
            name: selectedAnalysis.companyName,
            url: selectedAnalysis.url,
            industry: selectedAnalysis.industry,
          } as Company,
        });
      }
      // Reset the flag after a short delay to ensure the save effect doesn't trigger
      setTimeout(() => setIsLoadingExistingAnalysis(false), 100);
    } else if (selectedAnalysis === null) {
      // Reset state when explicitly set to null (New Analysis clicked)
      dispatch({ type: "RESET_STATE" });
      hasSavedRef.current = false;
      setIsLoadingExistingAnalysis(false);
    }
  }, [selectedAnalysis]);

  // Handlers
  const handleUrlChange = useCallback(
    (newUrl: string) => {
      dispatch({ type: "SET_URL", payload: newUrl });

      // Clear any existing error when user starts typing
      if (error) {
        dispatch({ type: "SET_ERROR", payload: null });
      }

      // Validate URL on change
      if (newUrl.length > 0) {
        const isValid = validateUrl(newUrl);
        dispatch({ type: "SET_URL_VALID", payload: isValid });
      } else {
        dispatch({ type: "SET_URL_VALID", payload: null });
      }
    },
    [error]
  );

  const handleScrape = useCallback(async () => {
    if (!url) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a URL" });
      return;
    }

    // Validate URL
    if (!validateUrl(url)) {
      dispatch({
        type: "SET_ERROR",
        payload:
          "Please enter a valid URL (e.g., example.com or https://example.com)",
      });
      dispatch({ type: "SET_URL_VALID", payload: false });
      return;
    }

    console.log('\n🌐 [CLIENT] ========================================');
    console.log('🌐 [CLIENT] Starting URL scrape');
    console.log('🔗 [CLIENT] URL:', url);

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_URL_VALID", payload: true });

    try {
      console.log('📤 [CLIENT] Sending scrape request...');
      const response = await fetch("/api/brand-monitor/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        }),
      });

      console.log('📥 [CLIENT] Scrape response status:', response.status);

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error('❌ [CLIENT] Scrape API error:', errorData);
          if (errorData.error?.message) {
            throw new ClientApiError(errorData);
          }
          throw new Error(errorData.error || "Failed to scrape");
        } catch (e) {
          if (e instanceof ClientApiError) throw e;
          throw new Error("Failed to scrape");
        }
      }

      const data = await response.json();
      console.log('✅ [CLIENT] Scrape data received:', {
        hasCompany: !!data.company,
        companyName: data.company?.name,
        industry: data.company?.industry
      });

      if (!data.company) {
        console.error('❌ [CLIENT] No company data received');
        throw new Error("No company data received");
      }

      // Start fade out transition
      console.log('🎬 [CLIENT] Starting UI transitions...');
      dispatch({ type: "SET_SHOW_INPUT", payload: false });

      // After fade out completes, set company and show card with fade in
      setTimeout(() => {
        dispatch({ type: "SCRAPE_SUCCESS", payload: data.company });
        // Small delay to ensure DOM updates before fade in
        setTimeout(() => {
          dispatch({ type: "SET_SHOW_COMPANY_CARD", payload: true });
          console.log('✅ [CLIENT] Company card displayed');
          console.log('🌐 [CLIENT] ========================================\n');
        }, 50);
      }, 500);
    } catch (error: any) {
      let errorMessage = "Failed to extract company information";
      if (error instanceof ClientApiError) {
        errorMessage = error.getUserMessage();
      } else if (error.message) {
        errorMessage = `Failed to extract company information: ${error.message}`;
      }
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      console.error('❌ [CLIENT] HandleScrape error:', error);
      console.log('🌐 [CLIENT] ========================================\n');
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [url]);

  const handleProviderSelectionChange = useCallback((providers: string[]) => {
    dispatch({ type: "SET_SELECTED_PROVIDERS", payload: providers });
  }, []);

  const handlePrepareAnalysis = useCallback(async () => {
    if (!company) return;

    dispatch({ type: "SET_PREPARING_ANALYSIS", payload: true });

    // Check which providers are available
    try {
      const response = await fetch("/api/brand-monitor/check-providers", {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        const providers = data.providers || ["OpenAI", "Anthropic", "Google"];
        dispatch({ type: "SET_AVAILABLE_PROVIDERS", payload: providers });
        // Set default selected providers if none are selected
        if (selectedProviders.length === 0) {
          dispatch({ type: "SET_SELECTED_PROVIDERS", payload: providers });
        }
      }
    } catch (e) {
      // Default to providers with API keys if check fails
      const defaultProviders = [];
      if (process.env.NEXT_PUBLIC_HAS_OPENAI_KEY)
        defaultProviders.push("OpenAI");
      if (process.env.NEXT_PUBLIC_HAS_ANTHROPIC_KEY)
        defaultProviders.push("Anthropic");
      const fallbackProviders =
        defaultProviders.length > 0
          ? defaultProviders
          : ["OpenAI", "Anthropic"];
      dispatch({ type: "SET_AVAILABLE_PROVIDERS", payload: fallbackProviders });
      // Set default selected providers if none are selected
      if (selectedProviders.length === 0) {
        dispatch({
          type: "SET_SELECTED_PROVIDERS",
          payload: fallbackProviders,
        });
      }
    }

    // Extract competitors from scraped data or use industry defaults
    const extractedCompetitors = company.scrapedData?.competitors || [];
    const industryCompetitors = getIndustryCompetitors(company.industry || "");

    // Merge extracted competitors with industry defaults, keeping URLs where available
    const competitorMap = new Map<string, IdentifiedCompetitor>();

    // Add industry competitors first (they have URLs)
    industryCompetitors.forEach((comp) => {
      const normalizedName = normalizeCompetitorName(comp.name);
      competitorMap.set(normalizedName, comp as IdentifiedCompetitor);
    });

    // Add extracted competitors and try to match them with known URLs
    extractedCompetitors.forEach((name) => {
      const normalizedName = normalizeCompetitorName(name);

      // Check if we already have this competitor
      const existing = competitorMap.get(normalizedName);
      if (existing) {
        // If existing has URL but current doesn't, keep existing
        if (!existing.url) {
          const url = assignUrlToCompetitor(name);
          competitorMap.set(normalizedName, { name, url });
        }
        return;
      }

      // New competitor - try to find a URL for it
      const url = assignUrlToCompetitor(name);
      competitorMap.set(normalizedName, { name, url });
    });

    let competitors = Array.from(competitorMap.values())
      .filter(
        (comp) =>
          comp.name !== "Competitor 1" &&
          comp.name !== "Competitor 2" &&
          comp.name !== "Competitor 3" &&
          comp.name !== "Competitor 4" &&
          comp.name !== "Competitor 5"
      )
      .slice(0, 10);

    // Just use the first 6 competitors without AI validation
    competitors = competitors.slice(0, 6);

    console.log("Identified competitors:", competitors);
    dispatch({ type: "SET_IDENTIFIED_COMPETITORS", payload: competitors });

    // Show competitors on the same page with animation
    dispatch({ type: "SET_SHOW_COMPETITORS", payload: true });
    dispatch({ type: "SET_PREPARING_ANALYSIS", payload: false });
  }, [company]);

  const handleProceedToPrompts = useCallback(async () => {
    if (!company) return;

    console.log('\n📋 [CLIENT] ========================================');
    console.log('📋 [CLIENT] Generating prompts for display...');
    console.log('🏢 [CLIENT] Company:', company.name);
    console.log('👥 [CLIENT] Competitors:', identifiedCompetitors.length);

    // Set generating prompts state
    dispatch({ type: "SET_GENERATING_PROMPTS", payload: true });

    // Add a fade-out class to the current view
    const currentView = document.querySelector(".animate-panel-in");
    if (currentView) {
      currentView.classList.add("opacity-0");
    }

    // Wait for fade-out
    await new Promise(resolve => setTimeout(resolve, 300));

    // Hide competitors and show prompts list
    dispatch({ type: "SET_SHOW_COMPETITORS", payload: false });
    dispatch({ type: "SET_SHOW_PROMPTS_LIST", payload: true });

    // Generate prompts for display (if user hasn't added custom prompts)
    if (customPrompts.length === 0) {
      try {
        console.log('🤖 [CLIENT] Calling generate-prompts API...');
        const response = await fetch("/api/brand-monitor/generate-prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            competitors: identifiedCompetitors.map(c => c.name)
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ [CLIENT] Prompts generated:', data.prompts?.length || 0);

          if (data.prompts && data.prompts.length > 0) {
            // Store generated prompts as custom prompts for display
            const promptTexts = data.prompts.map((p: any) => p.prompt);
            dispatch({ type: "SET_CUSTOM_PROMPTS", payload: promptTexts });
            console.log('📋 [CLIENT] Prompts set:', promptTexts);
          } else {
            console.warn('⚠️  [CLIENT] No prompts returned from API');
          }
        } else {
          console.error('❌ [CLIENT] Failed to generate prompts:', response.status);
        }
      } catch (error) {
        console.error('❌ [CLIENT] Error generating prompts:', error);
      }
    } else {
      console.log('✅ [CLIENT] Using existing custom prompts:', customPrompts.length);
    }

    // Done generating prompts
    dispatch({ type: "SET_GENERATING_PROMPTS", payload: false });
    console.log('📋 [CLIENT] ========================================\n');
  }, [company, identifiedCompetitors, customPrompts]);

  const handleAnalyze = useCallback(async () => {
    if (!company) return;

    // Reset saved flag for new analysis
    hasSavedRef.current = false;

    console.log('\n🔬 [CLIENT] ========================================');
    console.log('🔬 [CLIENT] Starting brand analysis');
    console.log('🏢 [CLIENT] Company:', company.name);

    // Backend will generate AI-powered prompts (no more keyword-based detection!)
    // Only use custom prompts if user provided them
    const normalizedPrompts = customPrompts.map((p) => p.trim());

    // Store prompts for UI display (will be updated from SSE when backend generates them)
    dispatch({ type: "SET_ANALYZING_PROMPTS", payload: normalizedPrompts });

    console.log('📝 [CLIENT] Prompts prepared:', {
      customCount: customPrompts.length,
      note: customPrompts.length === 0 ? 'Backend will generate AI prompts' : 'Using custom prompts'
    });
    console.log('👥 [CLIENT] Competitors:', identifiedCompetitors.length);
    console.log('🤖 [CLIENT] Selected providers:', selectedProviders?.length || 'all');

    dispatch({ type: "SET_ANALYZING", payload: true });
    dispatch({
      type: "SET_ANALYSIS_PROGRESS",
      payload: {
        stage: "initializing",
        progress: 0,
        message: "Starting analysis...",
        competitors: [],
        prompts: [],
        partialResults: [],
      },
    });
    dispatch({ type: "SET_ANALYSIS_TILES", payload: [] });

    // Scroll to analysis section
    setTimeout(() => {
      analysisSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    // Initialize prompt completion status
    const initialStatus: any = {};
    const expectedProviders = getEnabledProviders().map(
      (config) => config.name
    );

    normalizedPrompts.forEach((prompt) => {
      initialStatus[prompt] = {};
      expectedProviders.forEach((provider) => {
        initialStatus[prompt][provider] = "pending";
      });
    });
    dispatch({ type: "SET_PROMPT_COMPLETION_STATUS", payload: initialStatus });

    console.log('📡 [CLIENT] Initializing SSE connection...');
    console.log('📤 [CLIENT] Sending analysis request payload');

    try {
      await startSSEConnection("/api/brand-monitor/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          prompts: normalizedPrompts,
          competitors: identifiedCompetitors,
          providers: selectedProviders,
        }),
      });
      console.log('✅ [CLIENT] Analysis completed successfully!');
      console.log('🔬 [CLIENT] ========================================\n');
    } catch (error) {
      console.error('❌ [CLIENT] Analysis failed:', error);
      console.log('🔬 [CLIENT] ========================================\n');
    } finally {
      dispatch({ type: "SET_ANALYZING", payload: false });
    }
  }, [
    company,
    removedDefaultPrompts,
    customPrompts,
    identifiedCompetitors,
    startSSEConnection,
    selectedProviders,
  ]);

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
    hasSavedRef.current = false;
    setIsLoadingExistingAnalysis(false);
  }, []);

  const batchScrapeAndValidateCompetitors = useCallback(
    async (competitors: IdentifiedCompetitor[]) => {
      const validatedCompetitors = competitors
        .map((comp) => ({
          ...comp,
          url: comp.url ? validateCompetitorUrl(comp.url) : undefined,
        }))
        .filter((comp) => comp.url);

      if (validatedCompetitors.length === 0) return;

      // Implementation for batch scraping - you can move the full implementation here
      // For now, just logging
      console.log(
        "Batch scraping validated competitors:",
        validatedCompetitors
      );
    },
    []
  );

  // Find brand data
  const brandData = analysis?.competitors?.find((c) => c.isOwn);

  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      {/* Usage Counter - shown on initial input screen */}
      {showInput && <UsageCounter />}

      {/* URL Input Section */}
      {showInput && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <UrlInputSection
                url={url}
                urlValid={urlValid}
                loading={loading}
                analyzing={analyzing}
                onUrlChange={handleUrlChange}
                onSubmit={handleScrape}
              />

              {/* Provider Selector */}
              <div className="max-w-md mx-auto">
                <ProviderSelector
                  availableProviders={availableProviders}
                  selectedProviders={selectedProviders}
                  onSelectionChange={handleProviderSelectionChange}
                  disabled={loading || analyzing}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scraping Skeleton Loader */}
      {loading && !company && <ScrapingSkeleton />}

      {/* Preparing Analysis Skeleton (Identifying Competitors) */}
      {preparingAnalysis && company && !showPromptsList && <CompetitorSkeleton />}

      {/* Company Card Section with Competitors */}
      {!showInput && company && !showPromptsList && !analyzing && !analysis && !loading && !preparingAnalysis && (
        <div className="flex items-center justify-center animate-panel-in">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-6">
              <div
                className={`transition-all duration-500 ${showCompanyCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <CompanyCard
                  company={company}
                  onAnalyze={handlePrepareAnalysis}
                  analyzing={preparingAnalysis}
                  showCompetitors={showCompetitors}
                  identifiedCompetitors={identifiedCompetitors}
                  onRemoveCompetitor={(idx) =>
                    dispatch({ type: "REMOVE_COMPETITOR", payload: idx })
                  }
                  onAddCompetitor={() => {
                    dispatch({
                      type: "TOGGLE_MODAL",
                      payload: { modal: "addCompetitor", show: true },
                    });
                    dispatch({
                      type: "SET_NEW_COMPETITOR",
                      payload: { name: "", url: "" },
                    });
                  }}
                  onContinueToAnalysis={handleProceedToPrompts}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generating Prompts Skeleton */}
      {generatingPrompts && showPromptsList && !analyzing && <PromptSkeleton />}

      {/* Prompts List Section - Shows both before and during analysis */}
      {showPromptsList && company && !analysis && !generatingPrompts && (
        <div ref={analysisSectionRef} className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <AnalysisProgressSection
            company={company}
            analyzing={analyzing}
            identifiedCompetitors={identifiedCompetitors}
            scrapingCompetitors={scrapingCompetitors}
            analysisProgress={analysisProgress}
            prompts={analyzingPrompts}
            customPrompts={customPrompts}
            removedDefaultPrompts={removedDefaultPrompts}
            promptCompletionStatus={promptCompletionStatus}
            onRemoveDefaultPrompt={(index) =>
              dispatch({ type: "REMOVE_DEFAULT_PROMPT", payload: index })
            }
            onRemoveCustomPrompt={(prompt) => {
              dispatch({
                type: "SET_CUSTOM_PROMPTS",
                payload: customPrompts.filter((p) => p !== prompt),
              });
            }}
            onAddPromptClick={() => {
              dispatch({
                type: "TOGGLE_MODAL",
                payload: { modal: "addPrompt", show: true },
              });
              dispatch({ type: "SET_NEW_PROMPT_TEXT", payload: "" });
            }}
            onStartAnalysis={handleAnalyze}
          />
        </div>
      )}

      {/* Analysis Results */}
      {analysis && brandData && (
        <div className="w-full animate-panel-in font-overused">
          {/* Horizontal Navigation Tabs */}
          <ResultsNavigation
            activeTab={activeResultsTab}
            onTabChange={(tab) => {
              dispatch({ type: "SET_ACTIVE_RESULTS_TAB", payload: tab });
            }}
            onRestart={handleRestart}
          />

          {/* Main Content Area */}
          <div className="w-full bg-landing-background">
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto relative">
                  {/* Tab Content */}
                  {activeResultsTab === "visibility" && (
                    <div
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                      key="visibility"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <VisibilityScoreTab
                        competitors={analysis.competitors}
                        brandData={brandData}
                        identifiedCompetitors={identifiedCompetitors}
                        providerRankings={analysis.providerRankings}
                        companyName={company?.name}
                      />
                    </div>
                  )}

                  {activeResultsTab === "matrix" && (
                    <div
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                      key="matrix"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <Card className="analysis-card bg-landing-card text-landing-base gap-6 flex flex-col border-landing-border">
                      <CardHeader className="border-b border-landing-border">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="font-neueBit text-[32px] leading-[0.9] tracking-[-0.32px]">
                              Comparison Matrix
                            </CardTitle>
                            <CardDescription className="font-geist text-[13px] text-landing-muted mt-2">
                              Compare visibility scores across different AI
                              providers
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="font-neueBit text-[40px] leading-[0.9] text-landing-base">
                              {brandData.visibilityScore}%
                            </p>
                            <p className="font-geist text-[11px] text-landing-muted mt-2">
                              Average Score
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                          {analysis.providerComparison ? (
                            <ProviderComparisonMatrix
                              data={analysis.providerComparison}
                              brandName={company?.name || ""}
                              competitors={identifiedCompetitors}
                            />
                          ) : (
                            <div className="text-center py-8 bg-landing-card rounded-[6px] border border-landing-border">
                              <p className="font-geist text-[16px] font-medium text-landing-base">No comparison data available</p>
                              <p className="font-geist text-[13px] text-landing-muted mt-2">
                                Please ensure AI providers are configured and the
                                analysis has completed.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    </div>
                  )}

                  {activeResultsTab === "rankings" &&
                    analysis.providerRankings && (
                      <div
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                        key="rankings"
                        style={{ willChange: 'opacity, transform' }}
                      >
                        <div id="provider-rankings" className="h-full">
                          <ProviderRankingsTabs
                            providerRankings={analysis.providerRankings}
                            brandName={company?.name || "Your Brand"}
                            shareOfVoice={brandData.shareOfVoice}
                            averagePosition={Math.round(
                              brandData.averagePosition
                            )}
                            sentimentScore={brandData.sentimentScore}
                            weeklyChange={brandData.weeklyChange}
                          />
                        </div>
                      </div>
                    )}

                  {activeResultsTab === "prompts" && analysis.prompts && (
                    <div
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                      key="prompts"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <Card className="analysis-card bg-landing-card text-landing-base gap-6 flex flex-col border-landing-border">
                      <CardHeader className="border-b border-landing-border">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="font-neueBit text-[32px] leading-[0.9] tracking-[-0.32px]">
                              Prompts & Responses
                            </CardTitle>
                            <CardDescription className="font-geist text-[13px] text-landing-muted mt-2">
                              AI responses to your brand queries
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="font-neueBit text-[40px] leading-[0.9] text-landing-base">
                              {analysis.prompts.length}
                            </p>
                            <p className="font-geist text-[11px] text-landing-muted mt-2">
                              Total Prompts
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <PromptsResponsesTab
                          prompts={analysis.prompts}
                          responses={analysis.responses}
                          expandedPromptIndex={expandedPromptIndex}
                          onToggleExpand={(index) =>
                            dispatch({
                              type: "SET_EXPANDED_PROMPT_INDEX",
                              payload: index,
                            })
                          }
                          brandName={analysis.company?.name || ""}
                          competitors={
                            analysis.competitors?.map((c) => c.name) || []
                          }
                        />
                      </CardContent>
                    </Card>
                    </div>
                  )}
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <ErrorMessage
          error={error}
          onDismiss={() => dispatch({ type: "SET_ERROR", payload: null })}
        />
      )}

      {/* Modals */}
      <AddPromptModal
        isOpen={showAddPromptModal}
        promptText={newPromptText}
        onPromptTextChange={(text) =>
          dispatch({ type: "SET_NEW_PROMPT_TEXT", payload: text })
        }
        onAdd={() => {
          if (newPromptText.trim()) {
            dispatch({
              type: "ADD_CUSTOM_PROMPT",
              payload: newPromptText.trim(),
            });
            dispatch({
              type: "TOGGLE_MODAL",
              payload: { modal: "addPrompt", show: false },
            });
            dispatch({ type: "SET_NEW_PROMPT_TEXT", payload: "" });
          }
        }}
        onClose={() => {
          dispatch({
            type: "TOGGLE_MODAL",
            payload: { modal: "addPrompt", show: false },
          });
          dispatch({ type: "SET_NEW_PROMPT_TEXT", payload: "" });
        }}
      />

      <AddCompetitorModal
        isOpen={showAddCompetitorModal}
        competitorName={newCompetitorName}
        competitorUrl={newCompetitorUrl}
        onNameChange={(name) =>
          dispatch({ type: "SET_NEW_COMPETITOR", payload: { name } })
        }
        onUrlChange={(url) =>
          dispatch({ type: "SET_NEW_COMPETITOR", payload: { url } })
        }
        onAdd={async () => {
          if (newCompetitorName.trim()) {
            const rawUrl = newCompetitorUrl.trim();
            const validatedUrl = rawUrl
              ? validateCompetitorUrl(rawUrl)
              : undefined;

            const newCompetitor: IdentifiedCompetitor = {
              name: newCompetitorName.trim(),
              url: validatedUrl,
            };

            dispatch({ type: "ADD_COMPETITOR", payload: newCompetitor });
            dispatch({
              type: "TOGGLE_MODAL",
              payload: { modal: "addCompetitor", show: false },
            });
            dispatch({
              type: "SET_NEW_COMPETITOR",
              payload: { name: "", url: "" },
            });

            // Batch scrape and validate the new competitor if it has a URL
            if (newCompetitor.url) {
              await batchScrapeAndValidateCompetitors([newCompetitor]);
            }
          }
        }}
        onClose={() => {
          dispatch({
            type: "TOGGLE_MODAL",
            payload: { modal: "addCompetitor", show: false },
          });
          dispatch({
            type: "SET_NEW_COMPETITOR",
            payload: { name: "", url: "" },
          });
        }}
      />
    </div>
  );
}
