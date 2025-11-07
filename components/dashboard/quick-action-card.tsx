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
  const card = (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-[24px] border border-[#ece8dd] bg-white',
        'transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)]',
        disabled && 'opacity-60 pointer-events-none'
      )}
    >
      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500', gradient)} />

      <div className="relative p-6 space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2b2b2b] to-[#050505] flex items-center justify-center text-white">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-neueBit text-[22px] text-[#111111]">{title}</h3>
        <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#6a665d]">{description}</p>

        <div className="flex items-center gap-2 text-sm text-[#111111] underline decoration-dotted underline-offset-4">
          <span>Open</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );

  if (disabled) {
    return card;
  }

  return <Link href={href}>{card}</Link>;
}
