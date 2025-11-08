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

const statusTokens: Record<CheckStatus, { label: string; dot: string; text: string }> = {
  pass: {
    label: 'Good',
    dot: 'bg-[#1f8f4d]',
    text: 'text-[#1f8f4d]'
  },
  warning: {
    label: 'Needs attention',
    dot: 'bg-[#d97706]',
    text: 'text-[#a16207]'
  },
  fail: {
    label: 'Fail',
    dot: 'bg-[#c2410c]',
    text: 'text-[#b91c1c]'
  }
};

const scoreCardGradient = [
  'from-[#111111]',
  'from-[#111111]/90',
  'from-[#111111]/80'
];

function ScoreCard({
  label,
  score,
  index
}: {
  label: string;
  score: number;
  index: number;
}) {
  return (
    <div className="rounded-[16px] border border-white/60 bg-gradient-to-b from-white via-white/90 to-[#f6f6f6] p-5 shadow-[0_25px_80px_rgba(15,15,15,0.08)]">
      <p className="font-apercu text-[12px] uppercase tracking-[0.18em] text-[#818181]">
        {label}
      </p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-neueBit text-[48px] leading-none text-[#111111]">{score}</p>
        <div className={cn('h-10 w-10 rounded-full bg-gradient-to-b to-[#050505]', scoreCardGradient[index % scoreCardGradient.length])} />
      </div>
    </div>
  );
}

function CheckCard({
  check,
  isExpanded,
  onToggle
}: {
  check: CheckResult;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { dot, text, label } = statusTokens[check.status];

  return (
    <div className="rounded-[16px] border border-[#f1f1f1] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <p className="font-apercu text-[12px] uppercase tracking-[0.24em] text-[#818181]">
            {check.label}
          </p>
          <p className="font-neueBit text-[22px] leading-tight text-[#111111]">{check.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-neueBit text-[34px] leading-none text-[#111111]">{check.score}</p>
            <p className={cn('text-[12px] font-geist font-medium', text)}>{label}</p>
          </div>
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border border-[#f1f1f1]'
            )}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4 text-[#818181]" /> : <ChevronDown className="h-4 w-4 text-[#818181]" />}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-dashed border-[#e7e7e7] pt-4 text-sm text-[#4a4a4a]">
              <p className="font-geist leading-relaxed">{check.details}</p>
              {check.recommendation && (
                <div className="mt-3 rounded-[12px] bg-[#f8f8f8] p-3 text-[13px]">
                  <p className="font-geist font-medium uppercase tracking-[0.22em] text-[#8f8f8f]">
                    Recommendation
                  </p>
                  <p className="mt-1 text-[#111111]">{check.recommendation}</p>
                </div>
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
      className="rounded-[32px] border border-[#f1f1f1] bg-white/95 p-6 sm:p-10 shadow-[0_60px_140px_rgba(15,15,15,0.12)] backdrop-blur-[8px]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-apercu text-[12px] uppercase tracking-[0.24em] text-[#818181]">
              Analysis Results
            </p>
            <div className="mt-2 flex items-center gap-3 rounded-full border border-[#111111] bg-[#111111] px-4 py-2 text-white">
              <div className="flex items-center gap-1">
                <div className="h-8 w-1 rounded-full bg-white/30" />
                <div className="h-8 w-1 rounded-full bg-white/20" />
              </div>
              <span className="font-geist text-[14px]">{hostname}</span>
              <Search className="h-4 w-4 text-white/70" />
            </div>
          </div>
          <div className="text-right">
            <p className="font-geist text-[12px] uppercase tracking-[0.22em] text-[#818181]">
              Overall Visibility
            </p>
            <p className="font-neueBit text-[52px] leading-none text-[#111111]">{overallScore}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ScoreCard label="Overall" score={overallScore} index={0} />
          <ScoreCard label="SEO" score={seoScore} index={1} />
          <ScoreCard label="Content" score={contentScore} index={2} />
        </div>

        <div className="mt-2 flex flex-col gap-4">
          <p className="font-apercu text-[12px] uppercase tracking-[0.22em] text-[#818181]">
            Detailed checks
          </p>
          <div className="flex flex-col gap-3">
            {checks.map(check => (
              <CheckCard
                key={check.id}
                check={check}
                isExpanded={expandedCardId === check.id}
                onToggle={() => setExpandedCardId(prev => (prev === check.id ? null : check.id))}
              />
            ))}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-6 rounded-[20px] border border-[#f1f1f1] bg-[#fefbf5] p-5">
            <p className="font-apercu text-[12px] uppercase tracking-[0.24em] text-[#b26d1f]">
              Recommendations
            </p>
            <ul className="mt-4 space-y-3">
              {recommendations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#4a4a4a]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#b26d1f]" />
                  <p className="leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.section>
  );
}
