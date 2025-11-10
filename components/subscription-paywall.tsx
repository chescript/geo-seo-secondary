'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionPaywallProps {
  featureName: string;
  description?: string;
  features?: string[];
}

export function SubscriptionPaywall({
  featureName,
  description,
  features = []
}: SubscriptionPaywallProps) {
  const defaultFeatures = features.length > 0 ? features : [
    '100 analyses per month',
    'Premium support',
    'Priority access',
    'Real-time brand tracking across all AI models',
    'Competitor analysis and ranking',
    'Actionable insights & recommendations',
    'Email alerts for visibility changes'
  ];

  return (
    <div className="flex items-center justify-center min-h-[560px] px-4 py-10 bg-[#f8f6f0]">
      <Card className="max-w-2xl w-full rounded-[40px] border border-[#ece8dd] bg-white/95 shadow-[0_60px_140px_rgba(0,0,0,0.08)]">
        <CardHeader className="text-center space-y-6 pb-0">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-[#2b2b2b] to-[#050505] text-white shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-3">
            <CardTitle className="font-neueBit text-[44px] leading-[0.9] text-[#111111]">
              Upgrade to Geoscanner Brand Monitor
            </CardTitle>
            <CardDescription className="font-apercu text-[13px] uppercase tracking-[0.3em] text-[#6a665d]">
              {description || `${featureName} requires the Geoscanner Brand Monitor plan.`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-8">
          <div className="space-y-5">
            <h3 className="font-apercu text-[12px] uppercase tracking-[0.35em] text-[#8b867c]">
              What you unlock
            </h3>
            <ul className="space-y-4">
              {defaultFeatures.map((feature, index) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-[10px] border border-[#d7d0c3] bg-white">
                    {index === 0 && <Sparkles className="h-3 w-3 text-[#111111]" />}
                    {index === 1 && <Zap className="h-3 w-3 text-[#111111]" />}
                    {index === 2 && <TrendingUp className="h-3 w-3 text-[#111111]" />}
                    {index > 2 && <div className="h-2 w-2 rounded-full bg-[#111111]" />}
                  </div>
                  <p className="font-apercu text-sm text-[#4a473f] leading-relaxed">{feature}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] border border-[#ece8dd] bg-[#fdfbf5] px-6 py-6 text-center space-y-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-neueBit text-[44px] leading-none text-[#111111]">$10</span>
              <span className="text-sm text-[#6a665d]">/month</span>
            </div>
            <p className="text-xs font-apercu uppercase tracking-[0.3em] text-[#8b867c]">
              Cancel anytime - No hidden fees
            </p>
            <Button
              asChild
              className="h-12 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] text-white font-medium shadow-[0_25px_60px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all"
            >
              <Link href="/plans">Upgrade to Geoscanner Brand Monitor</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




