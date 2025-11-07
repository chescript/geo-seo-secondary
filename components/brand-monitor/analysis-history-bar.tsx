'use client';

import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { AnalysisHistoryModal } from './analysis-history-modal';

interface Analysis {
  id: string;
  companyName: string;
  url: string;
  createdAt: string;
  competitors?: any[];
}

interface AnalysisHistoryBarProps {
  analyses: Analysis[];
  currentAnalysisId: string | null;
  onSelectAnalysis: (id: string | null) => void;
  onDeleteAnalysis: (id: string) => void;
  isLoading?: boolean;
}

export function AnalysisHistoryBar({
  analyses,
  currentAnalysisId,
  onSelectAnalysis,
  onDeleteAnalysis,
  isLoading = false,
}: AnalysisHistoryBarProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const currentAnalysis = analyses.find(a => a.id === currentAnalysisId);

  return (
    <>
      <div className="bg-landing-background border-b border-landing-border relative z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Analysis History Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 px-5 py-3 bg-landing-card border border-landing-border rounded-[6px] hover:border-landing-muted hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-landing-background flex items-center justify-center">
                <Clock className="w-4 h-4 text-landing-base" />
              </div>
              <div className="text-left">
                <div className="font-geist text-[13px] font-semibold text-landing-base">
                  {currentAnalysis ? (currentAnalysis.companyName || 'Untitled Analysis') : 'Analysis History'}
                </div>
                <div className="font-geist text-[11px] text-landing-muted">
                  {currentAnalysis
                    ? format(new Date(currentAnalysis.createdAt), 'MMM d, yyyy')
                    : `${analyses.length} ${analyses.length === 1 ? 'analysis' : 'analyses'}`
                  }
                </div>
              </div>
            </button>

            {/* New Analysis Button */}
            <button
              onClick={() => onSelectAnalysis(null)}
              disabled={isLoading}
              className="inline-flex h-[44px] items-center gap-2 rounded-full bg-gradient-to-b from-[#282828] to-[#0f0f0f] border-t border-[#7a7a7a] px-6 font-geist text-[14px] font-medium text-white tracking-[-0.48px] hover:from-[#333333] hover:to-[#1a1a1a] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Analysis History Modal */}
      <AnalysisHistoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        analyses={analyses}
        currentAnalysisId={currentAnalysisId}
        onSelectAnalysis={onSelectAnalysis}
        onDeleteAnalysis={onDeleteAnalysis}
      />
    </>
  );
}
