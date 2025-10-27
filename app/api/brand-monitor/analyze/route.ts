import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { performAnalysis, createSSEMessage } from "@/lib/analyze-common";
import { SSEEvent } from "@/lib/types";
import {
  AuthenticationError,
  SubscriptionRequiredError,
  ValidationError,
  ExternalServiceError,
  handleApiError,
} from "@/lib/api-errors";
import {
  ERROR_MESSAGES,
  SSE_MAX_DURATION,
} from "@/config/constants";
import { requireProSubscription } from "@/lib/subscription-utils";

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

    // Check if user has Pro subscription to access brand monitoring
    try {
      console.log('💳 [ANALYSIS] Checking subscription - User ID:', sessionResponse.user.id);
      await requireProSubscription(sessionResponse.user.id, 'brand-monitor');
      console.log('✅ [ANALYSIS] Subscription check passed');
    } catch (err) {
      console.error('❌ [ANALYSIS] Subscription check failed:', err);
      if (err instanceof Error && err.message.includes('Pro subscription')) {
        throw new SubscriptionRequiredError(
          ERROR_MESSAGES.SUBSCRIPTION_REQUIRED_BRAND_MONITOR,
          'brand-monitor'
        );
      }
      throw new ExternalServiceError(
        "Unable to verify subscription. Please try again",
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
      error instanceof SubscriptionRequiredError ||
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
              error instanceof SubscriptionRequiredError
                ? {
                    requiredTier: error.requiredTier,
                    featureName: error.featureName,
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