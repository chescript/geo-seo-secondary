import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { Autumn } from "autumn-js";
import { performAnalysis, createSSEMessage } from "@/lib/analyze-common";
import { SSEEvent } from "@/lib/types";
import {
  AuthenticationError,
  InsufficientCreditsError,
  ValidationError,
  ExternalServiceError,
  handleApiError,
} from "@/lib/api-errors";
import {
  FEATURE_ID_MESSAGES,
  CREDITS_PER_BRAND_ANALYSIS,
  ERROR_MESSAGES,
  SSE_MAX_DURATION,
} from "@/config/constants";
import { checkCredits, trackCredits } from "@/lib/credits-utils";

const autumn = new Autumn({
  secretKey: process.env.AUTUMN_SECRET_KEY!,
});

export const runtime = "nodejs"; // Use Node.js runtime for streaming
export const maxDuration = 300; // 5 minutes

export async function POST(request: NextRequest) {
  console.log('\n🔬 [ANALYSIS] ========================================');
  console.log('🔬 [ANALYSIS] Starting brand analysis request');

  try {
    // Get the session
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      console.log('❌ [ANALYSIS] No authenticated user found');
      throw new AuthenticationError("Please log in to use brand monitor");
    }

    console.log('✅ [ANALYSIS] User authenticated:', sessionResponse.user.id);
    console.log('📧 [ANALYSIS] User email:', sessionResponse.user.email);

    // Check if user has enough credits (10 credits per analysis) - uses dev bypass if enabled
    try {
      console.log('💳 [ANALYSIS] Checking access - Customer ID:', sessionResponse.user.id);
      const access = await checkCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES
      );
      console.log('💳 [ANALYSIS] Access check result:', JSON.stringify(access.data, null, 2));

      if (
        !access.data?.allowed ||
        (access.data?.balance &&
          access.data.balance < CREDITS_PER_BRAND_ANALYSIS)
      ) {
        console.log('❌ [ANALYSIS] Insufficient credits - Balance:', access.data?.balance);
        throw new InsufficientCreditsError(
          ERROR_MESSAGES.INSUFFICIENT_CREDITS_BRAND_ANALYSIS,
          CREDITS_PER_BRAND_ANALYSIS,
          access.data?.balance || 0
        );
      }
      console.log('✅ [ANALYSIS] Credit check passed');
    } catch (err) {
      console.error('❌ [ANALYSIS] Failed to check access:', err);
      throw new ExternalServiceError(
        "Unable to verify credits. Please try again",
        "autumn"
      );
    }

    // Track usage (10 credits) - uses dev bypass if enabled
    try {
      console.log('📊 [ANALYSIS] Tracking usage - Customer ID:', sessionResponse.user.id);
      console.log('💰 [ANALYSIS] Credits to deduct:', CREDITS_PER_BRAND_ANALYSIS);
      const trackResult = await trackCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES,
        CREDITS_PER_BRAND_ANALYSIS
      );
      console.log('✅ [ANALYSIS] Track result:', JSON.stringify(trackResult, null, 2));
    } catch (err) {
      console.error('❌ [ANALYSIS] Failed to track usage:', err);
      // Log more details about the error
      if (err instanceof Error) {
        console.error('🔍 [ANALYSIS] Error details:', {
          message: err.message,
          stack: err.stack,
          response: (err as any).response?.data,
        });
      }
      throw new ExternalServiceError(
        "Unable to process credit deduction. Please try again",
        "autumn"
      );
    }

    const {
      company,
      prompts: customPrompts,
      competitors: userSelectedCompetitors,
      useWebSearch = false,
      providers: selectedProviders,
    } = await request.json();

    console.log('📦 [ANALYSIS] Request payload:', {
      companyName: company?.name,
      customPromptsCount: customPrompts?.length || 0,
      competitorsCount: userSelectedCompetitors?.length || 0,
      useWebSearch,
      selectedProviders: selectedProviders?.length || 0
    });

    if (!company || !company.name) {
      throw new ValidationError(ERROR_MESSAGES.COMPANY_INFO_REQUIRED, {
        company: "Company name is required",
      });
    }

    // Track usage with Autumn (deduct credits) - uses dev bypass if enabled
    try {
      console.log('📊 [ANALYSIS] Recording usage - Customer ID:', sessionResponse.user.id);
      await trackCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES,
        CREDITS_PER_BRAND_ANALYSIS
      );
      console.log('✅ [ANALYSIS] Usage recorded successfully');
    } catch (err) {
      console.error('❌ [ANALYSIS] Failed to track usage:', err);
      throw new ExternalServiceError(
        "Unable to process credit deduction. Please try again",
        "autumn"
      );
    }

    // Get remaining credits after deduction - uses dev bypass if enabled
    let remainingCredits = 0;
    try {
      const usage = await checkCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES
      );
      remainingCredits = usage.data?.balance || 0;
      console.log('💳 [ANALYSIS] Remaining credits after deduction:', remainingCredits);
    } catch (err) {
      console.error('⚠️  [ANALYSIS] Failed to get remaining credits:', err);
    }

    // Create a TransformStream for SSE
    console.log('📡 [ANALYSIS] Creating SSE stream...');
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Function to send SSE events
    const sendEvent = async (event: SSEEvent) => {
      console.log(`📤 [ANALYSIS] Sending SSE event: ${event.type} (stage: ${event.stage})`);
      await writer.write(encoder.encode(createSSEMessage(event)));
    };

    // Start the async processing
    (async () => {
      try {
        console.log('🚀 [ANALYSIS] Starting async analysis processing...');

        // Send initial credit info
        await sendEvent({
          type: "credits",
          stage: "credits",
          data: {
            remainingCredits,
            creditsUsed: CREDITS_PER_BRAND_ANALYSIS,
          },
          timestamp: new Date(),
        });

        // Perform the analysis using common logic
        console.log('🔬 [ANALYSIS] Calling performAnalysis...');
        const analysisResult = await performAnalysis({
          company,
          customPrompts,
          userSelectedCompetitors,
          useWebSearch,
          selectedProviders,
          sendEvent,
        });

        console.log('✅ [ANALYSIS] Analysis completed successfully!');
        console.log('📊 [ANALYSIS] Results summary:', {
          responsesCount: analysisResult.responses?.length || 0,
          competitorsCount: analysisResult.competitors?.length || 0,
          providersUsed: analysisResult.providerRankings?.length || 0,
          overallScore: analysisResult.scores?.overallScore
        });

        // Send final complete event with all data
        await sendEvent({
          type: "complete",
          stage: "finalizing",
          data: {
            analysis: analysisResult,
          },
          timestamp: new Date(),
        });

        console.log('🏁 [ANALYSIS] All SSE events sent, closing stream');
      } catch (error) {
        console.error('❌ [ANALYSIS] Analysis error:', error);
        await sendEvent({
          type: "error",
          stage: "error",
          data: {
            message: error instanceof Error ? error.message : "Analysis failed",
          },
          timestamp: new Date(),
        });
      } finally {
        await writer.close();
        console.log('🔬 [ANALYSIS] ========================================\n');
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    // For SSE endpoints, we need to return a proper error response
    // instead of using handleApiError which returns NextResponse
    console.error("Brand monitor analyze API error:", error);

    if (
      error instanceof AuthenticationError ||
      error instanceof InsufficientCreditsError ||
      error instanceof ValidationError ||
      error instanceof ExternalServiceError
    ) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            timestamp: new Date().toISOString(),
            metadata:
              error instanceof InsufficientCreditsError
                ? {
                    creditsRequired: error.creditsRequired,
                    creditsAvailable: error.creditsAvailable,
                  }
                : undefined,
          },
        }),
        {
          status: error.statusCode,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: {
          message: "An unexpected error occurred",
          code: "INTERNAL_ERROR",
          statusCode: 500,
          timestamp: new Date().toISOString(),
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}