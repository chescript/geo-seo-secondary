'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UsageStats {
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
}

export function UsageCounter() {
  const { data: session } = useSession();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsageStats() {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/usage/stats');
        if (response.ok) {
          const data = await response.json();
          setUsageStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch usage stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsageStats();
  }, [session]);

  if (!session?.user || loading) {
    return null;
  }

  if (!usageStats) {
    return null;
  }

  const isUnlimited = usageStats.limit === -1;
  const isNearLimit = usageStats.percentage >= 80 && !isUnlimited;
  const isAtLimit = usageStats.remaining === 0 && !isUnlimited;

  const statusLabel = isUnlimited
    ? 'Pro workspace'
    : isAtLimit
    ? 'Limit reached'
    : isNearLimit
    ? 'Almost at limit'
    : 'Healthy usage';

  const statusTone = isAtLimit
    ? 'text-[#111111]'
    : isNearLimit
    ? 'text-landing-body'
    : 'text-landing-muted';

  const containerClass =
    'rounded-[36px] border border-landing-border bg-landing-card px-6 py-7 sm:px-10 sm:py-9 shadow-[0_35px_80px_rgba(17,17,17,0.08)]';

  const progressFillClass = isAtLimit
    ? 'bg-[#111111]'
    : isNearLimit
    ? 'bg-[#4a473f]'
    : 'bg-[#111111]';

  const progressBgClass = isAtLimit
    ? 'bg-[#e5ded0]'
    : isNearLimit
    ? 'bg-[#ebe4d6]'
    : 'bg-[#ede7da]';

  const chipClass = cn(
    'inline-flex items-center gap-2 rounded-full border border-landing-border bg-white px-4 py-[10px] text-[11px] font-apercu uppercase tracking-[0.32em] text-landing-body',
    isUnlimited && 'border-[#111111] bg-[#111111] text-white'
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-12">
      <div className={containerClass}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isAtLimit || isNearLimit ? (
                <AlertCircle className="h-5 w-5 text-[#111111]" />
              ) : (
                <TrendingUp className="h-5 w-5 text-[#4a473f]" />
              )}
              <div className={chipClass}>
                {isUnlimited ? 'Pro access' : 'Monthly usage'}
              </div>
            </div>

            <p className={`font-apercu text-[12px] uppercase tracking-[0.3em] ${statusTone}`}>
              {statusLabel}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-landing-border bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,15,15,0.06)]">
              <p className="font-apercu text-[11px] uppercase tracking-[0.32em] text-landing-muted mb-3">
                {isUnlimited ? 'Analyses' : 'Used this month'}
              </p>
              <p className="font-neueBit text-[42px] leading-none text-[#111111]">
                {isUnlimited ? '∞' : usageStats.used}
              </p>
              <p className="font-apercu text-[12px] uppercase tracking-[0.3em] text-landing-body mt-3">
                {isUnlimited
                  ? 'Unlimited brand analyses'
                  : `${usageStats.remaining} remaining from ${usageStats.limit}`}
              </p>
            </div>

            {!isUnlimited && (
              <div className="rounded-[28px] border border-landing-border bg-white/75 p-6 shadow-[0_20px_45px_rgba(15,15,15,0.06)]">
                <div className="flex items-center justify-between text-[11px] font-apercu uppercase tracking-[0.3em] text-landing-muted mb-3">
                  <span>Progress</span>
                  <span>{usageStats.percentage}%</span>
                </div>
                <div className={`h-3 rounded-full ${progressBgClass} overflow-hidden`}>
                  <div
                    className={`${progressFillClass} h-full rounded-full transition-all`}
                    style={{ width: `${Math.min(100, usageStats.percentage)}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-[13px] text-landing-body">
                  <span>Cycle resets monthly</span>
                  <span>{usageStats.used}/{usageStats.limit}</span>
                </div>
              </div>
            )}
          </div>

          {!isUnlimited && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-dashed border-landing-border/70 bg-white/60 px-6 py-5">
              <div className="max-w-md font-apercu text-[13px] leading-relaxed text-landing-body uppercase tracking-[0.28em]">
                Need more headroom? Upgrade to increase your monthly analysis allotment.
              </div>
              <Link
                href="/plans"
                className="inline-flex h-[46px] items-center justify-center rounded-full border border-[#111111] bg-[#111111] px-7 font-neueBit text-[15px] text-white transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-[#111111]"
              >
                Upgrade plan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
