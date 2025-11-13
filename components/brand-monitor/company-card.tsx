'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Building2, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { Company } from '@/lib/types';
import Image from 'next/image';

interface CompanyCardProps {
  company: Company;
  onAnalyze: () => void;
  analyzing: boolean;
  showCompetitors?: boolean;
  identifiedCompetitors?: Array<{ 
    name: string; 
    url?: string;
    metadata?: {
      ogImage?: string;
      favicon?: string;
      description?: string;
      validated?: boolean;
    };
    loading?: boolean;
  }>;
  onRemoveCompetitor?: (index: number) => void;
  onAddCompetitor?: () => void;
  onContinueToAnalysis?: () => void;
  error?: string | null;
}

export function CompanyCard({
  company,
  onAnalyze,
  analyzing,
  showCompetitors = false,
  identifiedCompetitors = [],
  onRemoveCompetitor,
  onAddCompetitor,
  onContinueToAnalysis,
  error
}: CompanyCardProps) {
  const [logoError, setLogoError] = React.useState(false);
  const [faviconError, setFaviconError] = React.useState(false);
  
  // Validate URLs
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const validLogoUrl = isValidUrl(company.logo) ? company.logo : null;
  const validFaviconUrl = isValidUrl(company.favicon) ? company.favicon : null;

  return (
    <Card className="analysis-card p-2 text-[#111111] gap-6 py-6 overflow-hidden transition-all duration-300 group">
      <div className="flex">
        {/* Left side - OG Image with better styling */}
        <div className="relative w-80 h-48 ml-4 overflow-hidden rounded-lg bg-[#f8f6f0]">
          {validLogoUrl && !logoError ? (
            <div className="absolute inset-0 pr-4 py-4 bg-white">
              <Image
                src={validLogoUrl}
                alt=""
                fill
                className="object-contain"
                sizes="320px"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f8f6f0]">
              <div className="relative h-16 w-16 rounded-2xl bg-white shadow-lg border-2 border-[#ece8dd] flex items-center justify-center p-2">
                {validFaviconUrl && !faviconError ? (
                  <Image
                    src={validFaviconUrl}
                    alt={`${company.name} logo`}
                    width={32}
                    height={32}
                    className="object-contain w-8 h-8"
                    onError={() => setFaviconError(true)}
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-[#8b867c]" />
                )}
              </div>
            </div>
          )}

          {/* Website link overlay on image */}
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all shadow-lg hover:shadow-xl group-hover:scale-110 duration-200"
          >
            <ExternalLink className="h-4 w-4 text-[#111111] hover:text-[#4a473f]" />
          </a>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-neueBit text-[28px] leading-[1] text-[#111111] mb-3">{company.name}</h3>
              <div className="flex items-center gap-3 flex-wrap">
                {company.industry && (
                  <Badge className="bg-[#111111] text-white font-apercu text-[10px] uppercase tracking-[0.35em]">
                    {company.industry}
                  </Badge>
                )}
                <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#8b867c] flex items-center gap-1 bg-[#f8f6f0] px-3 py-1 rounded-full">
                  <Globe className="h-3.5 w-3.5 text-[#111111]" />
                  {new URL(company.url).hostname}
                </span>
              </div>
            </div>
            {!showCompetitors && (
              <Button
                onClick={onAnalyze}
                disabled={analyzing}
                variant="primary"
                size="default"
                className="ml-4"
              >
                {analyzing ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>Identify Competitors</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </Button>
            )}
          </div>

          <p className="font-sans text-[14px] text-[#4a473f] mb-4 line-clamp-2">
            {company.description}
          </p>

          {/* Keywords inline */}
          {company.scrapedData?.keywords && company.scrapedData.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {company.scrapedData.keywords.slice(0, 6).map((keyword, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full font-apercu text-[10px] uppercase tracking-[0.35em] bg-[#f8f6f0] text-[#111111]"
                >
                  {keyword}
                </span>
              ))}
              {company.scrapedData.keywords.length > 6 && (
                <span className="font-sans text-[12px] text-[#8b867c]">
                  +{company.scrapedData.keywords.length - 6} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Competitors Section */}
      {showCompetitors && identifiedCompetitors.length > 0 && (
        <div className="border-t border-[#ece8dd]">
          <div className="px-8 py-8">
            <div className="mb-6">
              <h3 className="font-neueBit text-[22px] leading-[1] text-[#111111]">Identified Competitors</h3>
              <p className="font-sans text-[14px] text-[#4a473f] mt-3">
                We&apos;ll compare how AI models (ChatGPT, Claude, Perplexity) describe {company.name} against these {identifiedCompetitors.length} competitors. You can add or remove competitors before starting the analysis.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {identifiedCompetitors.map((competitor, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white/90 rounded-[22px] border border-[#ece8dd] hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)] p-4 hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-up"
                  style={{
                    animationDelay: `${idx * 50}ms`,
                    animationFillMode: 'forwards',
                    animationDuration: '400ms'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Favicon with background */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white border border-[#ece8dd] flex items-center justify-center overflow-hidden shadow-sm">
                      {competitor.url ? (
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${competitor.url}&sz=64`}
                          alt=""
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-full bg-[#f8f6f0] flex items-center justify-center';
                            placeholder.innerHTML = '<svg class="w-6 h-6 text-[#8b867c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>';
                            target.parentElement!.appendChild(placeholder);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f8f6f0] flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-[#8b867c]" />
                        </div>
                      )}
                    </div>

                    {/* Name and URL */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[14px] font-medium text-[#111111] truncate">{competitor.name}</span>
                        {competitor.url && (
                          <a
                            href={competitor.url.startsWith('http') ? competitor.url : `https://${competitor.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#111111] hover:text-[#4a473f] transition-colors flex-shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {competitor.url && (
                        <p className="font-sans text-[12px] text-[#8b867c] truncate mt-1">{competitor.url}</p>
                      )}
                    </div>
                  </div>

                  {/* Remove button */}
                  {onRemoveCompetitor && (
                    <button
                      onClick={() => onRemoveCompetitor(idx)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#fff2f0]"
                    >
                      <Trash2 className="w-4 h-4 text-[#c94135] hover:text-[#a33328]" />
                    </button>
                  )}
                </div>
              ))}
            </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#ece8dd]">
                {onAddCompetitor && (
                  <Button
                    onClick={onAddCompetitor}
                    variant="primary"
                    size="default"
                  >
                    <Plus className="w-4 h-4" />
                    Add Competitor
                  </Button>
                )}

                <div className="flex-1" />

                {onContinueToAnalysis && (
                  <Button
                    onClick={onContinueToAnalysis}
                    variant="primary"
                    size="default"
                    className="px-8"
                    disabled={analyzing}
                  >
                    Start Analysis
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                )}
              </div>

              {/* Error Message Banner */}
              {!analyzing && error && (
                <div className="mt-6 rounded-[18px] border border-[#e4b4b0] bg-[#fff5f5] px-5 py-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-[#c94135] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[14px] leading-relaxed text-[#7d1f1a]">
                        {error}
                      </p>
                      {error.toLowerCase().includes('monthly') && error.toLowerCase().includes('limit') && (
                        <a
                          href="/plans"
                          className="inline-block mt-2 font-sans text-[13px] font-medium text-[#c94135] hover:text-[#a63529] underline"
                        >
                          View upgrade options →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      )}
    </Card>
  );
}