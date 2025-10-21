'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
}

export function CompanyCard({ 
  company, 
  onAnalyze, 
  analyzing,
  showCompetitors = false,
  identifiedCompetitors = [],
  onRemoveCompetitor,
  onAddCompetitor,
  onContinueToAnalysis 
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
    <Card className="p-2 bg-gradient-to-br from-white to-gray-50 text-card-foreground gap-6 rounded-xl border border-gray-200 py-6 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:border-orange-200 duration-300 group">
      <div className="flex">
        {/* Left side - OG Image with better styling */}
        <div className="relative w-80 h-48 ml-4 overflow-hidden rounded-lg bg-gray-100">
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative h-16 w-16 rounded-2xl bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center p-2">
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
                  <Building2 className="h-8 w-8 text-gray-400" />
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
            <ExternalLink className="h-4 w-4 text-gray-700 hover:text-gray-900" />
          </a>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{company.name}</h3>
              <div className="flex items-center gap-3 flex-wrap">
                {company.industry && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold">
                    {company.industry}
                  </Badge>
                )}
                <span className="text-sm text-gray-600 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Globe className="h-3.5 w-3.5 text-orange-600" />
                  {new URL(company.url).hostname}
                </span>
              </div>
            </div>
            <button
              onClick={onAnalyze}
              disabled={analyzing}
              className="ml-4 h-10 px-6 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none"
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
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {company.description}
          </p>

          {/* Keywords inline */}
          {company.scrapedData?.keywords && company.scrapedData.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {company.scrapedData.keywords.slice(0, 6).map((keyword, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {keyword}
                </span>
              ))}
              {company.scrapedData.keywords.length > 6 && (
                <span className="text-xs text-gray-500">
                  +{company.scrapedData.keywords.length - 6} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Competitors Section */}
      {showCompetitors && identifiedCompetitors.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="px-8 py-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Identified Competitors</h3>
              <p className="text-sm text-gray-600 mt-1">We'll compare {company.name} against these {identifiedCompetitors.length} competitors</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {identifiedCompetitors.map((competitor, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-orange-300 p-4 hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-up"
                  style={{
                    animationDelay: `${idx * 50}ms`,
                    animationFillMode: 'forwards',
                    animationDuration: '400ms'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Favicon with background */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                      {competitor.url ? (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${competitor.url}&sz=64`}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
                            placeholder.innerHTML = '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>';
                            e.currentTarget.parentElement!.appendChild(placeholder);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Name and URL */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm truncate">{competitor.name}</span>
                        {competitor.url && (
                          <a
                            href={competitor.url.startsWith('http') ? competitor.url : `https://${competitor.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 transition-colors flex-shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {competitor.url && (
                        <p className="text-xs text-gray-500 truncate mt-1">{competitor.url}</p>
                      )}
                    </div>
                  </div>

                  {/* Remove button */}
                  {onRemoveCompetitor && (
                    <button
                      onClick={() => onRemoveCompetitor(idx)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 hover:text-red-700" />
                    </button>
                  )}
                </div>
              ))}
            </div>
              
              {/* Actions */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                {onAddCompetitor && (
                  <button
                    onClick={onAddCompetitor}
                    className="h-10 px-5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Add Competitor
                  </button>
                )}

                <div className="flex-1" />

                {onContinueToAnalysis && (
                  <button
                    onClick={onContinueToAnalysis}
                    className="h-10 px-8 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black hover:shadow-lg hover:shadow-gray-900/30 hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none"
                  >
                    Continue to Analysis
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
        </div>
      )}
    </Card>
  );
}