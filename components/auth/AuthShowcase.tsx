'use client';

import Image from 'next/image';
import Link from 'next/link';

type HighlightStat = {
  value: string;
  label: string;
  subtext?: string;
};

interface AuthShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: HighlightStat[];
  checklist?: string[];
  footerNote?: string;
}

const defaultStats: HighlightStat[] = [
  { value: '12,481', label: 'Sites Benchmarked', subtext: 'Updated hourly' },
  { value: '5+', label: 'AI Surfaces', subtext: 'ChatGPT • Claude • Perplexity' },
  { value: '87', label: 'Avg. Readiness', subtext: '/ 100 Score' },
];

const defaultChecklist = [
  'LLM search coverage',
  'Metadata completeness',
  'Entity confidence signals',
];

export function AuthShowcase({
  eyebrow = 'LIVE IN AI SURFACES',
  title = 'Future-Proof Your Presence In The AI Web.',
  description = 'See how AI assistants rank and describe your brand before your customers ask.',
  stats = defaultStats,
  checklist = defaultChecklist,
  footerNote = 'Every crawl run refreshes your AI readiness score.',
}: AuthShowcaseProps) {
  return (
    <div className="relative hidden min-h-screen flex-col overflow-hidden border-r border-[#ece8dd] bg-[#fdfbf5] text-[#111111] lg:flex lg:w-1/2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff,_#f7f3eb_60%,_#f3edde_100%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(17,17,17,0.04) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      <div
        className="absolute inset-[32px] rounded-[40px] border border-white/70"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 40px 100px rgba(15,15,15,0.08)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-16 py-16">
        <div className="max-w-[500px] space-y-10">
          <Link href="/" className="inline-flex items-center gap-4 text-sm text-[#5f5a50] transition-colors hover:text-[#111111]">
            <div className="relative h-12 w-12">
              <Image
                src="/logos/Logo.png"
                alt="Geoscanner"
                fill
                priority
                sizes="48px"
                className="object-contain drop-shadow-sm"
              />
            </div>
            <span className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8f8a81]">Back to landing</span>
          </Link>

          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e1dbcf] bg-white/80 px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#6c6a62]">
              <span className="h-2 w-2 rounded-full bg-[#111111]" />
              {eyebrow}
            </span>
            <h1 className="font-neueBit text-[60px] leading-[0.9] tracking-tight text-[#111111]">{title}</h1>
            <p className="font-apercu text-[15px] leading-[1.8] text-[#5f5c55] uppercase tracking-[0.24em]">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] border border-[#e4dece] bg-white/80 p-5 text-[#111111] shadow-[0_20px_60px_rgba(15,15,15,0.07)]"
              >
                <p className="font-neueBit text-3xl leading-tight">{stat.value}</p>
                <p className="text-sm font-medium text-[#5c584c]">{stat.label}</p>
                {stat.subtext && <p className="text-xs text-[#9a9387]">{stat.subtext}</p>}
              </div>
            ))}
          </div>

          <ul className="space-y-3 text-[15px] text-[#403d35]">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] border border-[#d8d1c3] bg-white font-neueBit text-xs">
                  ✓
                </span>
                <span className="font-apercu uppercase tracking-[0.22em] text-[#5f5c55]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-[360px] rounded-[28px] border border-[#e9e3d4] bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,15,15,0.12)]">
          <p className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867a]">{footerNote}</p>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="font-neueBit text-5xl leading-none text-[#111111]">98</p>
              <p className="text-sm text-[#6b665c]">Visibility score</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-[#111111]">LLM Coverage</p>
              <p className="text-sm text-[#6b665c]">+12 pts vs last crawl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
