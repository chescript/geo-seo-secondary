import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Autumn } from 'autumn-js';
import { scrapeCompanyInfo } from '@/lib/scrape-utils';
import {
  handleApiError,
  AuthenticationError,
  ValidationError,
  InsufficientCreditsError,
  ExternalServiceError
} from '@/lib/api-errors';
import { FEATURE_ID_MESSAGES } from '@/config/constants';
import { checkCredits, trackCredits } from '@/lib/credits-utils';

const autumn = new Autumn({
  secretKey: process.env.AUTUMN_SECRET_KEY!,
});

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

    // Check if user has enough credits (1 credit for URL scraping) - uses dev bypass if enabled
    try {
      console.log('💳 [SCRAPE] Checking credits...');
      const access = await checkCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES
      );

      console.log('💳 [SCRAPE] Credit check result:', {
        allowed: access.data?.allowed,
        balance: access.data?.balance
      });

      if (!access.data?.allowed || (access.data?.balance && access.data.balance < 1)) {
        console.log('❌ [SCRAPE] Insufficient credits:', access.data?.balance);
        throw new InsufficientCreditsError(
          'Insufficient credits. You need at least 1 credit to analyze a URL.',
          { required: 1, available: access.data?.balance || 0 }
        );
      }
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        throw error;
      }
      console.error('[SCRAPE] Credit check error:', error);
      throw new ExternalServiceError('Unable to verify credits. Please try again', 'autumn');
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

    // Track usage (1 credit for scraping) - uses dev bypass if enabled
    try {
      console.log('📊 [SCRAPE] Tracking credit usage...');
      await trackCredits(
        autumn,
        sessionResponse.user.id,
        FEATURE_ID_MESSAGES,
        1
      );
      console.log('✅ [SCRAPE] Credit tracked successfully');
    } catch (err) {
      console.error('⚠️  [SCRAPE] Error tracking usage:', err);
      // Continue even if tracking fails - we don't want to block the user
    }

    console.log('🚀 [SCRAPE] Starting company info scraping...');
    const company = await scrapeCompanyInfo(normalizedUrl, maxAge);

    console.log('✅ [SCRAPE] Scraping completed successfully');
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