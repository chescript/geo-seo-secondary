import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  gradient: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  gradient,
  iconColor,
  trend
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-[#ece8dd] bg-white/95',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(0,0,0,0.12)]'
      )}
    >
      <div className={cn('absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full', gradient)} />

      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn('p-3 rounded-2xl text-white', iconColor || 'bg-[#111111]')}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div
              className={cn(
                'px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1',
                trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              )}
            >
              <span>{trend.isPositive ? '?' : '?'}</span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-apercu uppercase tracking-[0.3em] text-[#8b867c]">{title}</p>
          <p className="font-neueBit text-[32px] leading-[0.95] text-[#111111]">{value}</p>
          {description && <p className="text-sm text-[#6a665d]">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
