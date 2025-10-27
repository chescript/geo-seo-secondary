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
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      "border-2 border-transparent hover:border-orange-200"
    )}>
      {/* Gradient background accent */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full",
        gradient
      )} />

      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl",
            iconColor
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-semibold",
              trend.isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
