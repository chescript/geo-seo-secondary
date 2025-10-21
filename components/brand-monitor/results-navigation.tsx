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
    { id: 'matrix', label: 'Comparison Matrix', icon: '📊' },
    { id: 'prompts', label: 'Prompts & Responses', icon: '💬' },
    { id: 'rankings', label: 'Provider Rankings', icon: '🏆' },
    { id: 'visibility', label: 'Visibility Score', icon: '👁️' },
  ];

  return (
    <nav className="w-80 flex-shrink-0 animate-fade-in flex flex-col ml-[-2rem] overflow-x-hidden" style={{ animationDelay: '0.3s' }}>
      <div className="w-full flex flex-col justify-between flex-1 overflow-x-hidden">
        {/* Navigation Tabs - at the top */}
        <div className="space-y-2 overflow-x-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id as ResultsTab)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Analyze another website button - at the bottom */}
        <div className="pt-4 pb-8 border-t border-gray-200">
          <button
            onClick={onRestart}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black hover:shadow-lg hover:shadow-gray-900/30 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Analyze another website
          </button>
        </div>
      </div>
    </nav>
  );
}