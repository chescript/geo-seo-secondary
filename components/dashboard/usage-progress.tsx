import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface UsageProgressProps {
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
  periodStart?: string;
  periodEnd?: string;
}

export function UsageProgress({
  used,
  limit,
  remaining,
  percentage,
  periodStart,
  periodEnd,
}: UsageProgressProps) {
  const isApproachingLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-landing-border bg-white/95',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-landing-card'
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full bg-gradient-to-br from-landing-base to-gray-500" />

      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-2xl bg-landing-base">
            <Activity className="w-6 h-6 text-white" />
          </div>
          {isApproachingLimit && (
            <div
              className={cn(
                'px-2 py-1 rounded-full font-apercu text-[11px] uppercase tracking-[0.3em] font-semibold',
                isAtLimit ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              )}
            >
              {isAtLimit ? 'Limit Reached' : `${remaining} left`}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">
              Analyses Used
            </p>
            <p className="font-neueBit text-[32px] leading-[0.95] text-landing-base">
              {used}/{limit}
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-2 bg-landing-background rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-500 rounded-full',
                  isAtLimit
                    ? 'bg-red-500'
                    : isApproachingLimit
                    ? 'bg-amber-500'
                    : 'bg-landing-base'
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Billing period */}
          {periodStart && periodEnd && (
            <p className="font-apercu text-[11px] uppercase tracking-[0.2em] text-landing-body">
              Period: {formatDate(periodStart)} - {formatDate(periodEnd)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
