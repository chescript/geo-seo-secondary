'use client';

import React, { useState, Fragment } from 'react';
import { ProviderComparisonData } from '@/lib/types';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { CompetitorCell } from './competitor-cell';
import { getConfiguredProviders } from '@/lib/provider-config';
import Image from 'next/image';

interface ProviderComparisonMatrixProps {
  data: ProviderComparisonData[];
  brandName: string;
  competitors?: { 
    name: string; 
    url?: string;
    metadata?: {
      ogImage?: string;
      favicon?: string;
      description?: string;
    };
  }[];
}

// Provider icon mapping
const getProviderIcon = (provider: string) => {
  switch (provider) {
    case 'OpenAI':
      return (
        <Image 
          src="/providers/openai.svg" 
          alt="OpenAI" 
          width={28}
          height={28}
          className="w-7 h-7"
        />
      );
    case 'Anthropic':
      return (
        <Image 
          src="/Logos/anthropic.png" 
          alt="Anthropic" 
          width={20}
          height={20}
          className="w-5 h-5"
        />
      );
    case 'Google':
      return (
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
      );
    case 'Perplexity':
      return (
        <Image 
          src="/Logos/perplexity-ai.png" 
          alt="Perplexity" 
          width={20}
          height={20}
          className="w-5 h-5"
        />
      );
    default:
      return <div className="w-5 h-5 bg-gray-400 rounded" />;
  }
};

// Generate a fallback URL from competitor name
const generateFallbackUrl = (competitorName: string): string | undefined => {
  // Clean the name for URL generation
  const cleanName = competitorName.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '') // Remove spaces
    .trim();
  
  // Skip if name is too generic or short
  if (cleanName.length < 3 || ['inc', 'llc', 'corp', 'company', 'the'].includes(cleanName)) {
    return undefined;
  }
  
  // Try common domain patterns
  const possibleDomains = [
    `${cleanName}.com`,
    `${cleanName}.io`,
    `${cleanName}.ai`,
    `get${cleanName}.com`,
    `www.${cleanName}.com`
  ];
  
  // Return the most likely domain (usually .com)
  return possibleDomains[0];
};

export function ProviderComparisonMatrix({ data, brandName, competitors }: ProviderComparisonMatrixProps) {
  // Hooks must be called before any conditional returns
  const [sortColumn, setSortColumn] = useState<string>('competitor');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');
  
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-landing-card rounded-[22px] border border-landing-border">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#f1f0ed] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-landing-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-landing-base font-neueBit text-[24px] mb-2">No comparison data yet</h3>
          <p className="text-landing-muted font-geist text-[14px] leading-relaxed mb-4">
            The analysis may still be processing, or no providers returned data for your competitors.
          </p>
          <div className="inline-flex items-center gap-2 text-landing-muted font-geist text-[12px] uppercase tracking-[0.3em]">
            <div className="w-2 h-2 rounded-full bg-landing-muted animate-pulse" />
            <span>Check back in a moment</span>
          </div>
        </div>
      </div>
    );
  }

  // Get configured providers from centralized config
  const configuredProviders = getConfiguredProviders();
  let providers = configuredProviders.map(p => p.name);
  
  // If no providers configured, extract from data
  if (providers.length === 0 && data.length > 0) {
    const providerSet = new Set<string>();
    data.forEach(item => {
      Object.keys(item.providers).forEach(provider => providerSet.add(provider));
    });
    providers = Array.from(providerSet);
  }
  
  // Don't filter out providers - show all enabled providers even if they have no data
  // This ensures users can see which providers were attempted
  // providers = providers.filter(provider => {
  //   // Check if at least one competitor has data for this provider
  //   return data.some(competitor => {
  //     const providerData = competitor.providers[provider];
  //     // Provider has data if visibilityScore exists and is > 0, or if mentions > 0
  //     return providerData && (providerData.visibilityScore > 0 || providerData.mentions > 0);
  //   });
  // });
  
  // Get background style based on score - using landing page muted color palette
  const getBackgroundStyle = (score: number) => {
    const opacity = Math.pow(score / 100, 0.5) * 0.6; // More subtle
    return {
      backgroundColor: `rgba(139, 134, 124, ${opacity})`, // landing-muted color
      border: score > 0 ? '1px solid rgba(139, 134, 124, 0.3)' : undefined
    };
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDirection === null) {
        setSortColumn('competitor');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Get sorted data
  const getSortedData = () => {
    return [...data].sort((a, b) => {
      if (sortDirection === null) return 0;
      
      if (sortColumn === 'competitor') {
        return sortDirection === 'asc' 
          ? a.competitor.localeCompare(b.competitor)
          : b.competitor.localeCompare(a.competitor);
      }
      
      const aValue = a.providers[sortColumn]?.visibilityScore || 0;
      const bValue = b.providers[sortColumn]?.visibilityScore || 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

  // Get sort icon
  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-4 h-4 opacity-30" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  // If no providers are included, don't render the component
  if (providers.length === 0) return null;
  
  return (
    <div className="rounded-[6px] border border-landing-border">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr>
            <th className="bg-landing-card border-b border-r border-landing-border w-[180px]">
              <button
                onClick={() => handleSort('competitor')}
                className="w-full p-3 font-geist text-[13px] font-medium text-landing-base flex items-center justify-between hover:bg-landing-background transition-colors text-left"
              >
                Competitors
                {getSortIcon('competitor')}
              </button>
            </th>
            {providers.map((provider, index) => (
              <th
                key={provider}
                className={`bg-landing-card border-b ${
                  index < providers.length - 1 ? 'border-r' : ''
                } border-landing-border`}
              >
                <button
                  onClick={() => handleSort(provider)}
                  className="w-full p-3 font-geist text-[13px] font-medium text-landing-base flex items-center justify-center hover:bg-landing-background transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    {getProviderIcon(provider)}
                    {getSortIcon(provider)}
                  </div>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSortedData().map((competitor, rowIndex) => {
            const competitorData = competitors?.find(c =>
              c.name === competitor.competitor ||
              c.name.toLowerCase() === competitor.competitor.toLowerCase()
            );

            // Generate URL if not found - try to guess from competitor name
            const fallbackUrl = !competitorData?.url ? generateFallbackUrl(competitor.competitor) : undefined;

            return (
              <tr
                key={competitor.competitor}
                className={`
                  ${rowIndex > 0 ? 'border-t border-landing-border' : ''}
                  ${rowIndex % 2 === 1 ? 'bg-[#faf9f6]' : 'bg-white'}
                  hover:bg-[#f1f0ed] transition-colors duration-150
                `}
              >
                <td className="border-r border-landing-border">
                  <CompetitorCell
                    name={competitor.competitor}
                    isOwn={competitor.isOwn}
                    favicon={competitorData?.metadata?.favicon}
                    url={competitorData?.url || fallbackUrl}
                  />
                </td>
                {providers.map((provider, index) => {
                  const providerData = competitor.providers[provider];
                  const score = providerData?.visibilityScore || 0;

                  return (
                    <td
                      key={provider}
                      className={`text-center p-3 ${
                        index < providers.length - 1 ? 'border-r border-landing-border' : ''
                      } relative group`}
                      style={getBackgroundStyle(score)}
                      title={`${competitor.competitor} visibility on ${provider}: ${score}%`}
                    >
                      <span className="text-landing-base font-geist text-[13px] font-medium">
                        {score}%
                      </span>
                      {score === 0 && (
                        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-landing-muted">
                          No data
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
