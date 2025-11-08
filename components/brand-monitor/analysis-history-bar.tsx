'use client';

import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { AnalysisHistoryModal } from './analysis-history-modal';
import { Button } from '@/components/ui/button';

interface Analysis {
  id: string;
  companyName?: string | null;
  url: string;
  createdAt?: string | Date | null;
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
  const currentAnalysisDate =
    currentAnalysis?.createdAt ? format(new Date(currentAnalysis.createdAt), 'MMM d, yyyy') : null;

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
                  {currentAnalysis ? (currentAnalysis?.companyName || 'Untitled Analysis') : 'Analysis History'}
                </div>
                <div className="font-geist text-[11px] text-landing-muted">
                  {currentAnalysis
                    ? currentAnalysisDate || 'Date unavailable'
                    : `${analyses.length} ${analyses.length === 1 ? 'analysis' : 'analyses'}`
                  }
                </div>
              </div>
            </button>

            {/* New Analysis Button */}
            <Button
              onClick={() => onSelectAnalysis(null)}
              disabled={isLoading}
              variant="primary"
              size="sm"
              className="px-6 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              New Analysis
            </Button>
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
