import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { scrapeCompanyInfo } from '@/lib/scrape-utils';
import {
  handleApiError,
  AuthenticationError,
  ValidationError,
  ExternalServiceError,
} from '@/lib/api-errors';
import { canPerformAction } from '@/lib/usage-tracking';
import { ERROR_MESSAGES } from '@/config/constants';

export async function POST(request: NextRequest) {
  console.log('\n🔍 [SCRAPE] ========================================');
  console.log('🔍 [SCRAPE] Starting URL scrape request');

  try {
    // Get the session
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      console.log('❌ [SCRAPE] No authenticated user found');
      throw new AuthenticationError('Please log in to use this feature');
    }

    console.log('✅ [SCRAPE] User authenticated:', sessionResponse.user.id);
    console.log('📧 [SCRAPE] User email:', sessionResponse.user.email);

    // Check if user has remaining analyses this month
    try {
      console.log('📊 [SCRAPE] Checking usage limits - User ID:', sessionResponse.user.id);
      const usageCheck = await canPerformAction(sessionResponse.user.id, 'brand_analysis');

      console.log('📊 [SCRAPE] Usage check result:', {
        allowed: usageCheck.allowed,
        remaining: usageCheck.remaining,
        limit: usageCheck.limit,
      });

      if (!usageCheck.allowed) {
        console.error('❌ [SCRAPE] Monthly limit exceeded');
        throw new ValidationError(ERROR_MESSAGES.MONTHLY_LIMIT_EXCEEDED);
      }

      console.log(`✅ [SCRAPE] Usage check passed. Remaining: ${usageCheck.remaining}/${usageCheck.limit === -1 ? '∞' : usageCheck.limit}`);
    } catch (err) {
      console.error('❌ [SCRAPE] Usage check failed:', err);
      console.error('❌ [SCRAPE] Error type:', err instanceof Error ? err.constructor.name : typeof err);
      console.error('❌ [SCRAPE] Error message:', err instanceof Error ? err.message : String(err));

      if (err instanceof ValidationError) {
        throw err;
      }

      // Pass through the actual error message if available
      const errorMessage = err instanceof Error
        ? err.message
        : "Unable to verify usage limits. Please try again";

      throw new ExternalServiceError(
        errorMessage,
        "usage-tracking"
      );
    }

    const { url, maxAge } = await request.json();
    console.log('🌐 [SCRAPE] Raw URL received:', url);
    console.log('⏱️  [SCRAPE] Max age:', maxAge);

    if (!url) {
      console.log('❌ [SCRAPE] No URL provided');
      throw new ValidationError('Invalid request', {
        url: 'URL is required'
      });
    }

    // Ensure URL has protocol
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    console.log('🔗 [SCRAPE] Normalized URL:', normalizedUrl);

    console.log('🚀 [SCRAPE] Starting company info scraping...');
    const company = await scrapeCompanyInfo(normalizedUrl, maxAge);

    if (company?.scraped) {
      console.log('✅ [SCRAPE] Scraping completed successfully');
    } else {
      console.log('✅ [SCRAPE] Scraping completed with fallback');
    }
    console.log('📦 [SCRAPE] Company data:', {
      name: company?.name,
      description: company?.description?.substring(0, 100),
      industry: company?.industry,
      hasLogo: !!company?.logo
    });
    console.log('🔍 [SCRAPE] ========================================\n');

    return NextResponse.json({ company });
  } catch (error) {
    console.error('❌ [SCRAPE] Error occurred:', error);
    console.log('🔍 [SCRAPE] ========================================\n');
    return handleApiError(error);
  }
}