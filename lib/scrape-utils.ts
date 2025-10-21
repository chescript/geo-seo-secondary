import { generateObject } from 'ai';
import { z } from 'zod';
import { Company } from './types';
import FirecrawlApp from '@mendable/firecrawl-js';
import { getConfiguredProviders, getProviderModel } from './provider-config';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

// Log API key status on module load
if (!process.env.FIRECRAWL_API_KEY) {
  console.warn('⚠️  [FIRECRAWL] API key not configured - scraping will fail');
} else {
  console.log('✅ [FIRECRAWL] API key configured');
}

const CompanyInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  industry: z.string(),
  mainProducts: z.array(z.string()),
  competitors: z.array(z.string()).optional(),
});

export async function scrapeCompanyInfo(url: string, maxAge?: number): Promise<Company> {
  try {
    // Ensure URL has protocol
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    console.log('🔥 [FIRECRAWL] Starting scrape for:', normalizedUrl);

    // Create a timeout promise that rejects after 60 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Scraping timeout - using fallback method')), 60000);
    });

    // Race between scraping and timeout
    // Note: Firecrawl SDK v4.x returns a Document object directly, throws errors on failure
    const document = await Promise.race([
      firecrawl.scrape(normalizedUrl, {
        formats: ['markdown'],
        onlyMainContent: true,
      }),
      timeoutPromise
    ]) as any;

    console.log('🔥 [FIRECRAWL] Document received');
    console.log('🔥 [FIRECRAWL] Has markdown:', !!document?.markdown);
    console.log('🔥 [FIRECRAWL] Has metadata:', !!document?.metadata);

    if (!document || !document.markdown) {
      console.error('⚠️  [FIRECRAWL] No markdown content in response');
      throw new Error('No content returned from Firecrawl');
    }

    const html = document.markdown;
    const metadata = document.metadata;

    console.log('🔥 [FIRECRAWL] Scraped content length:', html?.length || 0);
    console.log('🔥 [FIRECRAWL] Metadata title:', metadata?.title);
    

    // Use AI to extract structured information - try providers with fallback
    const configuredProviders = getConfiguredProviders();
    console.log('🤖 [AI] Available providers:', configuredProviders.map(p => p.name));

    if (configuredProviders.length === 0) {
      throw new Error('No AI providers configured and enabled for content extraction');
    }

    let object;
    let lastError;

    // Try each provider until one succeeds
    for (let i = 0; i < configuredProviders.length; i++) {
      const provider = configuredProviders[i];
      console.log(`🤖 [AI] Trying provider ${i + 1}/${configuredProviders.length}:`, provider.name);

      try {
        const model = getProviderModel(
          provider.id,
          provider.models.find(m => m.name.toLowerCase().includes('mini') || m.name.toLowerCase().includes('flash'))?.id || provider.defaultModel
        );

        if (!model) {
          console.warn(`⚠️  [AI] ${provider.name} model not available, skipping...`);
          continue;
        }

        console.log('🤖 [AI] Using model:', model.modelId);
        console.log('🤖 [AI] Starting content extraction...');

        const result = await generateObject({
          model,
          schema: CompanyInfoSchema,
          prompt: `Extract company information from this website content:

      URL: ${normalizedUrl}
      Content: ${html}

      Extract the company name, a brief description, relevant keywords, and identify the PRIMARY industry category.

      Industry detection rules:
      - If the company makes coolers, drinkware, outdoor equipment, camping gear, categorize as "outdoor gear"
      - If the company offers web scraping, crawling, data extraction, or HTML parsing tools/services, categorize as "web scraping"
      - If the company primarily provides AI/ML models or services, categorize as "AI"
      - If the company offers hosting, deployment, or cloud infrastructure, categorize as "deployment"
      - If the company is an e-commerce platform or online store builder, categorize as "e-commerce platform"
      - If the company sells physical products directly to consumers (clothing, accessories, etc.), categorize as "direct-to-consumer brand"
      - If the company is in fashion/apparel/underwear/clothing, categorize as "apparel & fashion"
      - If the company provides software tools or APIs, categorize as "developer tools"
      - If the company is a marketplace or aggregator, categorize as "marketplace"
      - For other B2B software, use "SaaS"
      - For other consumer products, use "consumer goods"

      IMPORTANT:
      1. For mainProducts, list the ACTUAL PRODUCTS (e.g., "coolers", "tumblers", "drinkware") not product categories
      2. For competitors, extract FULL COMPANY NAMES (e.g., "RTIC", "IGLOO", "Coleman") not just initials
      3. Focus on what the company MAKES/SELLS, not what goes IN their products (e.g., Yeti makes coolers, not beverages)`,
        });

        object = result.object;
        console.log('✅ [AI] Content extraction completed with', provider.name);
        console.log('📦 [AI] Extracted company name:', object.name);
        break; // Success! Exit the loop
      } catch (error) {
        lastError = error;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ [AI] ${provider.name} failed:`, errorMsg);

        // If this is the last provider, throw the error
        if (i === configuredProviders.length - 1) {
          throw error;
        }

        // Otherwise, try the next provider
        console.log(`🔄 [AI] Trying next provider...`);
      }
    }

    if (!object) {
      throw lastError || new Error('All AI providers failed');
    }

    // Extract favicon URL - try multiple sources
    const urlObj = new URL(normalizedUrl);
    const domain = urlObj.hostname.replace('www.', '');
    
    // Try to get a high-quality favicon from various sources
    const faviconUrl = metadata?.favicon || 
                      `https://www.google.com/s2/favicons?domain=${domain}&sz=128` ||
                      `${urlObj.origin}/favicon.ico`;
    
    return {
      id: crypto.randomUUID(),
      url: normalizedUrl,
      name: object.name,
      description: object.description,
      industry: object.industry,
      logo: metadata?.ogImage || undefined,
      favicon: faviconUrl,
      scraped: true,
      scrapedData: {
        title: object.name,
        description: object.description,
        keywords: object.keywords,
        mainContent: html || '',
        mainProducts: object.mainProducts,
        competitors: object.competitors,
        ogImage: metadata?.ogImage || undefined,
        favicon: faviconUrl,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isTimeout = errorMessage.includes('timeout') || errorMessage.includes('ETIMEDOUT');

    console.error('⚠️  [FIRECRAWL] Error scraping company info:', errorMessage);
    if (isTimeout) {
      console.log('⏱️  [FIRECRAWL] Timeout occurred - falling back to basic extraction');
    }

    // Ensure URL has protocol for fallback
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // Fallback: extract company name from URL
    const urlObj = new URL(normalizedUrl);
    const domain = urlObj.hostname.replace('www.', '');
    const companyName = domain.split('.')[0];
    const formattedName = companyName.charAt(0).toUpperCase() + companyName.slice(1);

    console.log('📝 [FIRECRAWL] Using fallback data:', { name: formattedName, scraped: false });

    return {
      id: crypto.randomUUID(),
      url: normalizedUrl,
      name: formattedName,
      description: `Information about ${formattedName}`,
      industry: 'technology',
      scraped: false,
    };
  }
} 