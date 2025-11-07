import React from 'react';
import { ResultsTab } from '@/lib/brand-monitor-reducer';

interface BrandData {
  visibilityScore: number;
  sentimentScore: number;
  shareOfVoice: number;
  overallScore: number;
  averagePosition: number;
  weeklyChange?: number;
}

interface ResultsNavigationProps {
  activeTab: ResultsTab;
  onTabChange: (tab: ResultsTab) => void;
  onRestart: () => void;
  brandData?: BrandData;
  brandName?: string;
}

export function ResultsNavigation({
  activeTab,
  onTabChange,
  onRestart,
  brandData,
  brandName
}: ResultsNavigationProps) {
  const handleTabClick = (tab: ResultsTab) => {
    onTabChange(tab);
  };

  const tabs = [
    { id: 'matrix', label: 'Comparison Matrix' },
    { id: 'prompts', label: 'Prompts & Responses' },
    { id: 'rankings', label: 'Provider Rankings' },
    { id: 'visibility', label: 'Visibility Score' },
  ];

  return (
    <nav className="w-full bg-landing-background border-b-2 border-landing-border relative z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Horizontal Tabs */}
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id as ResultsTab)}
              className={`relative px-6 py-4 font-geist text-[14px] transition-all duration-300 ease-out cursor-pointer whitespace-nowrap rounded-t-[8px] ${
                activeTab === tab.id
                  ? 'text-landing-base font-semibold bg-white border-2 border-landing-border border-b-0 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] mb-[-2px]'
                  : 'text-landing-muted font-medium hover:text-landing-body hover:bg-landing-card/50'
              }`}
              style={{ willChange: activeTab === tab.id ? 'auto' : 'transform' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}