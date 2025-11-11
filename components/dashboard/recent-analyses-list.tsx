'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, ExternalLink, Trash2, Calendar, Building2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface Analysis {
  id: string;
  url: string;
  companyName: string;
  industry: string | null;
  creditsUsed: number;
  createdAt: string;
}

interface RecentAnalysesListProps {
  analyses: Analysis[];
  onDelete?: (id: string) => void;
}

export function RecentAnalysesList({ analyses, onDelete }: RecentAnalysesListProps) {
  if (analyses.length === 0) {
    return (
      <Card
        className={cn(
          'relative overflow-hidden rounded-[28px] border border-landing-border bg-white/95',
          'transition-all duration-300'
        )}
      >
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-landing-background">
              <FileText className="w-8 h-8 text-landing-muted" />
            </div>
          </div>
          <h3 className="font-neueBit text-[24px] leading-[0.9] text-landing-base mb-2">No scans yet</h3>
          <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-landing-body mb-4">
            Launch the monitor to run your first crawl
          </p>
          <Link
            href="/brand-monitor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-landing-base text-white rounded-full font-apercu text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-opacity-90 transition-all"
          >
            Start Analysis
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-landing-border bg-white/95',
        'transition-all duration-300'
      )}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-landing-base">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-neueBit text-[20px] leading-[0.9] text-landing-base">Recent Analyses</h3>
        </div>

        <div className="space-y-3">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className={cn(
                'group relative p-4 rounded-2xl border border-landing-border bg-landing-card',
                'hover:bg-white hover:shadow-sm transition-all duration-200'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-landing-muted flex-shrink-0" />
                    <h4 className="font-apercu text-[13px] uppercase tracking-[0.2em] text-landing-base truncate font-medium">
                      {analysis.companyName}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 font-apercu text-[11px] uppercase tracking-[0.2em] text-landing-body">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })}
                    </span>
                    {analysis.industry && (
                      <span className="px-2 py-0.5 rounded-full bg-landing-background text-landing-muted">
                        {analysis.industry}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/brand-monitor/analysis/${analysis.id}`}
                    className="p-1.5 rounded-lg hover:bg-landing-background text-landing-body hover:text-landing-base transition-colors"
                    title="View details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(analysis.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-landing-body hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {analyses.length >= 5 && (
          <Link
            href="/brand-monitor/history"
            className="mt-4 block text-center font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body hover:text-landing-base transition-colors"
          >
            View all analyses
          </Link>
        )}
      </div>
    </Card>
  );
}
