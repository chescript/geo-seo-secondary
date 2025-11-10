'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckStatus = 'pass' | 'warning' | 'fail';

interface CheckResult {
  id: string;
  label: string;
  title: string;
  status: CheckStatus;
  score: number;
  details: string;
  recommendation?: string;
}

interface AnalysisResultsDashboardProps {
  url: string;
  overallScore: number;
  seoScore: number;
  contentScore: number;
  checks: CheckResult[];
  recommendations: string[];
}

const statusTokens: Record<
  CheckStatus,
  { label: string; dot: string; text: string; pill: string; pillText: string }
> = {
  pass: {
    label: 'Good',
    dot: 'bg-[#1f8f4d]',
    text: 'text-[#1f8f4d]',
    pill: 'bg-[#e8f6ee]',
    pillText: 'text-[#146532]'
  },
  warning: {
    label: 'Needs attention',
    dot: 'bg-[#d97706]',
    text: 'text-[#a16207]',
    pill: 'bg-[#fff4e6]',
    pillText: 'text-[#9a5b04]'
  },
  fail: {
    label: 'Fail',
    dot: 'bg-[#c2410c]',
    text: 'text-[#b91c1c]',
    pill: 'bg-[#ffeceb]',
    pillText: 'text-[#8f1f12]'
  }
};

function CheckCard({
  check,
  isExpanded,
  onToggle
}: {
  check: CheckResult;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { dot, text, label, pill, pillText } = statusTokens[check.status];
  const summary =
    check.details.length > 180 ? `${check.details.slice(0, 177).trim()}…` : check.details;

  return (
    <div className="relative flex h-full flex-col rounded-[20px] border border-[#f1f1f1] bg-[#fafafa]/70 px-6 py-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-geist text-[11px] uppercase tracking-[0.16em] text-[#6d6d6d]">
            {check.label}
          </p>
          <p className="font-geist text-[21px] font-semibold leading-snug text-[#111111]">
            {check.title}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-geist uppercase tracking-[0.18em]",
              pill,
              pillText
            )}
          >
            <span className={cn('h-2 w-2 rounded-full', dot)} />
            {label}
          </div>
          <div className="text-right">
            <p className="font-geist text-[10px] uppercase tracking-[0.22em] text-[#9a9a9a]">
              Score
            </p>
            <p className="font-neueBit text-[34px] leading-none text-[#111111]">
              {check.score}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 font-geist text-[13px] leading-relaxed text-[#353535]">
        {summary}
      </p>

      {check.recommendation && !summary.includes(check.recommendation) && (
        <div className="mt-3 rounded-[16px] border border-[#f1f1f1] bg-white/80 p-3 text-[#111111]">
          <p className="font-geist text-[10px] uppercase tracking-[0.18em] text-[#8b8b8b]">
            Recommendation
          </p>
          <p className="mt-2 font-geist text-[13px] leading-relaxed">
            {check.recommendation}
          </p>
        </div>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={onToggle}
          className="group flex w-full items-center justify-between rounded-[12px] border border-[#e7e7e7] bg-white/60 px-4 py-2 text-[10px] font-geist uppercase tracking-[0.18em] text-[#5c5c5c] transition hover:border-[#111111] hover:text-[#111111]"
        >
          <span>View details</span>
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border border-[#f1f1f1] transition group-hover:border-[#111111]',
              text
            )}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-current" />
            ) : (
              <ChevronDown className="h-4 w-4 text-current" />
            )}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-[16px] border border-dashed border-[#e7e7e7] bg-white/90 p-4 text-sm text-[#111111]">
              <p className="font-geist text-[13px] leading-relaxed">{check.details}</p>
              {check.recommendation && (
                <p className="mt-3 font-geist text-[12px] text-[#6f6f6f]">
                  {check.recommendation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AnalysisResultsDashboard({
  url,
  overallScore,
  seoScore,
  contentScore,
  checks,
  recommendations
}: AnalysisResultsDashboardProps) {
  const hostname = useMemo(() => {
    try {
      return new URL(url.includes('http') ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  }, [url]);

  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'radial-gradient(circle at top, #ffffff, #fefbf4 70%, #f5eee2 110%)'
      }}
      className="rounded-[32px] border border-white/80 p-6 sm:p-10 shadow-[0_60px_140px_rgba(15,15,15,0.12)]"
    >
      <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-geist text-[11px] uppercase tracking-[0.2em] text-[#7a7a7a]">
            Analysis Results for
          </p>
          <div className="flex items-center gap-3 rounded-full border border-[#111111] bg-[#111111] px-5 py-2 text-white">
            <div className="flex items-center gap-1">
              <div className="h-6 w-1 rounded-full bg-white/30" />
              <div className="h-6 w-1 rounded-full bg-white/20" />
            </div>
            <span className="font-geist text-[14px]">{hostname}</span>
            <Search className="h-4 w-4 text-white/70" />
          </div>
          <p className="font-apercu text-[13px] tracking-[0.05em] text-[#7f7f7f]">
            Here's how AI-ready your website is
          </p>
        </div>

        <div className="rounded-[20px] border border-[#f1f1f1] bg-white/80 p-4 shadow-[inset_0_0_25px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: 'Overall Score', value: overallScore },
              { label: 'SEO Score', value: seoScore },
              { label: 'Content Quality', value: contentScore }
            ].map(card => (
              <div
                key={card.label}
                className="rounded-[16px] border border-[#f1f1f1] bg-[#fafafa] p-5 shadow-[inset_0_0_12px_rgba(0,0,0,0.02)]"
              >
                <p className="font-geist text-[11px] uppercase tracking-[0.18em] text-[#7d7d7d]">
                  {card.label}
                </p>
                <p className="mt-4 font-neueBit text-[42px] leading-none text-[#111111]">
                  {card.value}
                  <span className="ml-1 text-[18px] text-[#8c8c8c]">/100</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <div className="mt-4 flex flex-col gap-4">
          <p className="font-geist text-[11px] uppercase tracking-[0.18em] text-[#8a8a8a]">
            Detailed checks
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {checks.map(check => (
              <div key={check.id} className="h-full">
                <CheckCard
                  check={check}
                  isExpanded={expandedCardId === check.id}
                  onToggle={() => setExpandedCardId(prev => (prev === check.id ? null : check.id))}
                />
              </div>
            ))}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-8 rounded-[24px] border border-[#f1f1f1] bg-[#fafafa]/80 p-6 shadow-[inset_0_0_25px_rgba(0,0,0,0.03)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-geist text-[11px] uppercase tracking-[0.18em] text-[#868686]">
                  Key Recommendations
                </p>
                <p className="font-geist text-[19px] font-semibold text-[#111111]">
                  Where to improve next
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#e7e7e7] bg-white/80 px-4 py-1 text-[11px] font-geist uppercase tracking-[0.16em] text-[#666666]">
                <span className="h-2 w-2 rounded-full bg-[#f79009]" />
                High impact
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {recommendations.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-[18px] border border-[#f1f1f1] bg-white/90 px-4 py-3 text-[#111111]"
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/10 bg-white text-[#111111]'
                    )}
                  >
                    {idx % 2 === 0 ? (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 12l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <p className="flex-1 font-geist text-[14px] leading-[1.6] text-[#1f1f1f]">
                    {item}
                  </p>
                  <svg className="h-4 w-4 text-[#b5b5b5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

