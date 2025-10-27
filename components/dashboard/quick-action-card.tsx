import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  disabled?: boolean;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
  disabled = false
}: QuickActionCardProps) {
  const content = (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 cursor-pointer",
      "hover:shadow-2xl hover:-translate-y-2 border-2",
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:border-orange-300"
    )}>
      {/* Animated gradient background */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        gradient
      )} />

      <div className="relative p-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl mb-4 flex items-center justify-center",
          "bg-gradient-to-br from-orange-400 to-orange-600",
          "group-hover:scale-110 transition-transform duration-300"
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 group-hover:text-gray-700">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );

  if (disabled) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
