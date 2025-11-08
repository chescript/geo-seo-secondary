import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';
import { handleApiError, ValidationError, ExternalServiceError } from '@/lib/api-errors';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!
});

export async function POST(request: NextRequest) {
  try {
    let { url } = await request.json();

    if (!url) {
      throw new ValidationError('URL is required', { url: 'required' });
    }
    
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const baseUrl = new URL(url).origin;
    
    // Check for llms.txt variations directly
    const variations = ['llms.txt', 'LLMs.txt', 'llms-full.txt'];
    const results: any = {
      url: baseUrl,
      checks: []
    };
    
    for (const filename of variations) {
      const testUrl = `${baseUrl}/${filename}`;
      
      try {
        // Try with fetch first
        const response = await fetch(testUrl);
        const text = await response.text();
        
        results.checks.push({
          filename,
          fetchStatus: response.status,
          fetchOk: response.ok,
          contentLength: text.length,
          isHTML: text.includes('<!DOCTYPE') || text.includes('<html'),
          has404: text.includes('404') || text.includes('Not Found'),
          hasLLMContent: (
            text.toLowerCase().includes('llm') || 
            text.toLowerCase().includes('ai') ||
            text.toLowerCase().includes('documentation') ||
            text.toLowerCase().includes('api') ||
            text.includes('#') ||
            text.includes('http')
          ),
          first100Chars: text.substring(0, 100)
        });
      } catch (e: any) {
        results.checks.push({
          filename,
          error: e.message
        });
      }
    }
    
    // Also try with Firecrawl to see what it finds
    try {
      const scrapeResult = await firecrawl.scrape(`${baseUrl}/llms.txt`, {
        formats: ['markdown'],
      });
      
      results.firecrawlResult = {
        success: true,
        hasContent: !!scrapeResult?.markdown,
        contentLength: scrapeResult?.markdown?.length || 0,
        first100Chars: scrapeResult?.markdown?.substring(0, 100)
      };
    } catch (e: any) {
      results.firecrawlResult = {
        success: false,
        error: e.message
      };
    }
    
    return NextResponse.json(results);

  } catch (error) {
    return handleApiError(error, 'Failed to check LLMs.txt');
  }
}