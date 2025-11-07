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

  const containerClass = cn(
    'rounded-[32px] border px-6 py-6 sm:px-8 sm:py-7 shadow-[0_25px_60px_rgba(17,17,17,0.08)] transition-colors bg-white/90 backdrop-blur',
    isAtLimit
      ? 'border-[#f4cbc4] bg-[#fff8f6]'
      : isNearLimit
      ? 'border-[#f8e0c2] bg-[#fffaf5]'
      : 'border-[#ece8dd]'
  );

  const accentSurfaceClass = isAtLimit
    ? 'bg-[#c94135]'
    : isNearLimit
    ? 'bg-[#f28f2a]'
    : 'bg-[#111111]';

  const accentColorClass = isAtLimit
    ? 'text-[#c94135]'
    : isNearLimit
    ? 'text-[#f28f2a]'
    : 'text-[#111111]';

  const accentChipClass = isAtLimit
    ? 'text-[#c94135] border-[#f4cbc4]'
    : isNearLimit
    ? 'text-[#f28f2a] border-[#f8e0c2]'
    : 'text-[#111111] border-[#d7d0c3]';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-10">
      <div className={containerClass}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {isAtLimit || isNearLimit ? (
                <AlertCircle className={`h-5 w-5 ${accentColorClass}`} />
              ) : (
                <TrendingUp className="h-5 w-5 text-[#111111]" />
              )}
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-apercu uppercase tracking-[0.35em] ${accentChipClass}`}>
                {isUnlimited ? 'Pro plan' : 'Monthly usage'}
              </div>
            </div>

            <div>
              <p className="font-neueBit text-[32px] leading-[1] text-[#111111]">
                {isUnlimited
                  ? 'Unlimited brand analyses'
                  : `${usageStats.used} analyses used this month`}
              </p>
              <p className="font-apercu text-[12px] uppercase tracking-[0.3em] text-[#8b867c] mt-2">
                {isUnlimited
                  ? 'FireGEO Brand Monitor plan'
                  : isAtLimit
                  ? 'Monthly limit reached'
                  : `${usageStats.remaining} analyses remaining`}
              </p>
            </div>
          </div>

          {!isUnlimited && (
            <div className="w-full md:w-auto space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] font-apercu uppercase tracking-[0.3em] text-[#8b867c] mb-2">
                  <span>Progress</span>
                  <span>{usageStats.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#ece8dd] overflow-hidden">
                  <div
                    className={`${accentSurfaceClass} h-full transition-all`}
                    style={{ width: `${Math.min(100, usageStats.percentage)}%` }}
                  />
                </div>
              </div>

              {(isNearLimit || isAtLimit) && (
                <Link
                  href="/plans"
                  className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#111111] bg-[#111111] px-6 font-neueBit text-[15px] text-white transition-all hover:-translate-y-0.5"
                >
                  Upgrade plan
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
