'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Clock, Trash2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import Image from 'next/image';

interface Analysis {
  id: string;
  companyName?: string | null;
  url: string;
  createdAt?: string | Date | null;
  competitors?: any[];
}

interface AnalysisDropdownProps {
  analyses: Analysis[];
  currentAnalysisId: string | null;
  onSelectAnalysis: (id: string | null) => void;
  onDeleteAnalysis: (id: string) => void;
  onViewAll?: () => void;
  isLoading?: boolean;
  maxVisible?: number;
}

export function AnalysisDropdown({
  analyses,
  currentAnalysisId,
  onSelectAnalysis,
  onDeleteAnalysis,
  onViewAll,
  isLoading = false,
  maxVisible = 8,
}: AnalysisDropdownProps) {
  const [open, setOpen] = useState(false);
  const currentAnalysis = analyses.find(a => a.id === currentAnalysisId);

  // Hide dropdown if no analyses exist
  if (analyses.length === 0) {
    return null;
  }

  const visibleAnalyses = analyses.slice(0, maxVisible);
  const hasMore = analyses.length > maxVisible;

  const handleNewAnalysis = () => {
    onSelectAnalysis(null);
    setOpen(false);
  };

  const handleSelectAnalysis = (id: string) => {
    onSelectAnalysis(id);
    setOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteAnalysis(id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-landing-border bg-white hover:bg-landing-card hover:border-landing-muted transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Clock className="h-3.5 w-3.5 text-landing-muted" />
          <span className="font-sans text-[13px] text-landing-base">
            {currentAnalysis
              ? currentAnalysis.companyName || 'Untitled'
              : 'Select Analysis'}
          </span>
          {currentAnalysis?.createdAt && (
            <span className="font-sans text-[11px] text-landing-muted">
              • {format(new Date(currentAnalysis.createdAt), 'MMM d')}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-landing-muted" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] rounded-[18px] border border-landing-border bg-white p-2 shadow-lg"
      >
        {/* New Analysis Action */}
        <DropdownMenuItem
          onClick={handleNewAnalysis}
          className="flex items-center gap-3 px-4 py-3 rounded-[12px] cursor-pointer hover:bg-landing-background transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-landing-base">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <span className="font-sans text-[14px] font-medium text-landing-base">
            New Analysis
          </span>
        </DropdownMenuItem>

        {analyses.length > 0 && <DropdownMenuSeparator className="my-2" />}

        {/* Recent Analyses */}
        <div className="max-h-[400px] overflow-y-auto">
          {visibleAnalyses.map((analysis) => {
            const isActive = analysis.id === currentAnalysisId;
            const analysisDate = analysis.createdAt
              ? format(new Date(analysis.createdAt), 'MMM d, yyyy')
              : 'Date unavailable';
            const competitorCount = Array.isArray(analysis.competitors)
              ? analysis.competitors.length
              : 0;

            return (
              <div
                key={analysis.id}
                className="group relative"
              >
                <DropdownMenuItem
                  onClick={() => handleSelectAnalysis(analysis.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[12px] cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-landing-background'
                      : 'hover:bg-landing-background/50'
                  }`}
                >
                  {/* Favicon */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-landing-border bg-white flex-shrink-0">
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${analysis.url}&sz=64`}
                      alt=""
                      width={16}
                      height={16}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[13px] font-medium text-landing-base truncate">
                      {analysis.companyName || 'Untitled Analysis'}
                    </div>
                    <div className="font-sans text-[11px] text-landing-muted">
                      {analysisDate}
                      {competitorCount > 0 && (
                        <span> • {competitorCount} competitor{competitorCount !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  {!isActive && (
                    <button
                      onClick={(e) => handleDelete(e, analysis.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-600" />
                    </button>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-landing-base flex-shrink-0" />
                  )}
                </DropdownMenuItem>
              </div>
            );
          })}
        </div>

        {/* View All Option */}
        {hasMore && onViewAll && (
          <>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              onClick={onViewAll}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] cursor-pointer hover:bg-landing-background transition-colors"
            >
              <MoreHorizontal className="h-4 w-4 text-landing-muted" />
              <span className="font-sans text-[13px] text-landing-muted">
                View All ({analyses.length} total)
              </span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
