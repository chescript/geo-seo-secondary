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
    'inline-flex items-center gap-2 rounded-full border border-landing-border bg-white px-3 py-1.5 text-[11px] font-apercu uppercase tracking-[0.3em] text-landing-body',
    isUnlimited && 'border-[#111111] bg-[#111111] text-white'
  );

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-landing-border bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
      {isAtLimit || isNearLimit ? (
        <AlertCircle className="h-3 w-3 text-[#111111]" />
      ) : (
        <TrendingUp className="h-3 w-3 text-landing-muted" />
      )}

      <span className="font-sans text-[12px] text-landing-base">
        {isUnlimited ? '∞' : `${usageStats.used}/${usageStats.limit}`}
      </span>

      {!isUnlimited && usageStats.remaining === 0 && (
        <Link
          href="/plans"
          className="font-sans text-[11px] text-[#111111] underline hover:no-underline ml-1"
        >
          Upgrade
        </Link>
      )}
    </div>
  );
}
