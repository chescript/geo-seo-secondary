import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { scrapeCompanyInfo } from '@/lib/scrape-utils';
import {
  handleApiError,
  AuthenticationError,
  ValidationError,
} from '@/lib/api-errors';

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