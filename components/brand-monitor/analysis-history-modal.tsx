'use client';

import React from 'react';
import { X, Trash2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface Analysis {
  id: string;
  companyName: string;
  url: string;
  createdAt: string;
  competitors?: any[];
}

interface AnalysisHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyses: Analysis[];
  currentAnalysisId: string | null;
  onSelectAnalysis: (id: string) => void;
  onDeleteAnalysis: (id: string) => void;
}

export function AnalysisHistoryModal({
  isOpen,
  onClose,
  analyses,
  currentAnalysisId,
  onSelectAnalysis,
  onDeleteAnalysis,
}: AnalysisHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-landing-card border border-landing-border rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.16)] w-full max-w-3xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-landing-border">
            <div>
              <h2 className="font-neueBit text-[24px] leading-[0.9] tracking-[-0.24px] text-landing-base">
                Analysis History
              </h2>
              <p className="font-geist text-[13px] text-landing-muted mt-2">
                {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'} saved
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-landing-background transition-colors"
            >
              <X className="w-5 h-5 text-landing-muted" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {analyses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-landing-background flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-landing-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-geist text-[15px] font-medium text-landing-base">No analyses yet</p>
                <p className="font-geist text-[13px] text-landing-muted mt-1">
                  Start your first brand analysis to see it here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {analyses.map((analysis) => {
                  const isSelected = currentAnalysisId === analysis.id;
                  const faviconUrl = `https://www.google.com/s2/favicons?domain=${analysis.url}&sz=64`;

                  return (
                    <div
                      key={analysis.id}
                      className={`group relative rounded-[12px] border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-landing-base bg-[#f4f2ed] shadow-sm'
                          : 'border-landing-border bg-white hover:border-landing-muted hover:shadow-sm'
                      }`}
                      onClick={() => {
                        onSelectAnalysis(analysis.id);
                        onClose();
                      }}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Favicon */}
                          <div className="w-12 h-12 rounded-lg bg-landing-background flex items-center justify-center flex-shrink-0 border border-landing-border">
                            <img
                              src={faviconUrl}
                              alt={analysis.companyName}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full flex items-center justify-center font-geist text-[16px] font-bold text-landing-muted';
                                  fallback.textContent = analysis.companyName?.charAt(0) || '?';
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-geist text-[15px] font-semibold text-landing-base truncate">
                                  {analysis.companyName || 'Untitled Analysis'}
                                </h3>
                                <p className="font-geist text-[12px] text-landing-muted truncate mt-1">
                                  {analysis.url}
                                </p>
                              </div>

                              {/* Delete button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteAnalysis(analysis.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-50 transition-all"
                              >
                                <Trash2 className="w-4 h-4 text-landing-muted hover:text-red-600" />
                              </button>
                            </div>

                            {/* Meta info */}
                            <div className="flex items-center gap-3 mt-3">
                              <span className="font-geist text-[11px] text-landing-muted">
                                {format(new Date(analysis.createdAt), 'MMM d, yyyy')}
                              </span>
                              {analysis.competitors && analysis.competitors.length > 0 && (
                                <>
                                  <span className="text-landing-border">•</span>
                                  <span className="font-geist text-[11px] text-landing-muted">
                                    {analysis.competitors.length} competitors
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Arrow indicator */}
                          <ChevronRight className={`w-5 h-5 transition-all ${
                            isSelected
                              ? 'text-landing-base'
                              : 'text-landing-muted opacity-0 group-hover:opacity-100'
                          }`} />
                        </div>

                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <div className="w-2 h-2 rounded-full bg-landing-base" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
