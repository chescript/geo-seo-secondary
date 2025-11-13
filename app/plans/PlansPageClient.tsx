'use client';

import EnhancedPricingTable from '@/components/enhanced-pricing-table';
import { useSession } from '@/lib/auth-client';
import { ShieldCheck, RefreshCcw, Headphones } from 'lucide-react';

const staticProducts = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'For all your messaging needs',
    price: {
      primaryText: 'Free',
      secondaryText: '*No credit card required',
    },
    items: [
      {
        primaryText: '1 analysis per month',
        secondaryText: 'Perfect for getting started',
      },
      {
        primaryText: 'Community support',
        secondaryText: 'Get help from our community',
      },
      {
        primaryText: 'Basic features',
        secondaryText: 'Quick AI-readiness check',
      },
      {
        primaryText: 'SEO & metadata score',
        secondaryText: 'Basic optimization insights',
      },
      {
        primaryText: 'Basic LLM compatibility check',
        secondaryText: 'Essential compatibility testing',
      },
    ],
  },
  {
    id: 'pro',
    name: 'Geoscanner Brand Monitor',
    description: 'Perfect for trying out our service',
    recommendText: 'POPULAR',
    price: {
      primaryText: '$10/month',
      secondaryText: '*Billed monthly',
    },
    items: [
      {
        primaryText: '100 analyses per month',
        secondaryText: 'More than enough for most businesses',
      },
      {
        primaryText: 'Premium support',
        secondaryText: 'Priority email and chat support',
      },
      {
        primaryText: 'Priority access',
        secondaryText: 'Skip the queue for faster results',
      },
      {
        primaryText: 'Real-time brand tracking across all AI models',
        secondaryText: 'Monitor your visibility everywhere',
      },
      {
        primaryText: 'Competitor analysis and ranking',
        secondaryText: 'See how you stack up',
      },
      {
        primaryText: 'Actionable insights & recommendations',
        secondaryText: 'Get specific steps to improve',
      },
      {
        primaryText: 'Email alerts for visibility changes',
        secondaryText: 'Stay informed automatically',
      },
    ],
  },
];

const benefits = [
  {
    title: 'Secure checkout',
    description: 'Stripe + Autumn handle billing and tax so your workspace stays safe.',
    icon: ShieldCheck,
  },
  {
    title: 'Cancel anytime',
    description: 'Month-to-month billing. Downgrade, pause, or restart whenever you like.',
    icon: RefreshCcw,
  },
  {
    title: '24/7 support',
    description: 'Onboarding help and AI readiness guidance from our team whenever you need it.',
    icon: Headphones,
  },
];

export default function PlansPageClient() {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="text-center space-y-6">
          <span className="inline-flex items-center justify-center rounded-full border border-[#e4ded0] bg-[#fdfbf5] px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#7f7a71]">
            Pricing & Access
          </span>
          <h1 className="font-neueBit text-[56px] leading-[0.9]">
            Invest in always-on AI visibility.
          </h1>
          <p className="font-apercu text-[14px] uppercase tracking-[0.32em] text-[#6a665d] max-w-3xl mx-auto">
            Explore for free or unlock unlimited crawls, AI chat, and live alerts when you are ready.
          </p>
          {session && (
            <p className="text-sm text-[#6a665d]">
              Signed in as {session.user?.name || session.user?.email}
            </p>
          )}
        </section>

        <section className="rounded-[40px] border border-[#ece8dd] bg-white/95 px-6 py-10 shadow-[0_60px_140px_rgba(0,0,0,0.08)]">
          {isPending ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center space-y-3">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-[#111111]" />
                <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#6a665d]">
                  Loading pricing...
                </p>
              </div>
            </div>
          ) : (
            <EnhancedPricingTable products={staticProducts} isAuthenticated={!!session} />
          )}
        </section>

        <section className="rounded-[40px] border border-[#ece8dd] bg-white/95 px-6 py-10 shadow-[0_45px_110px_rgba(0,0,0,0.08)] space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ded0] bg-[#fdfbf5] px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#7f7a71]">
              What every plan includes
            </span>
            <h2 className="font-neueBit text-[40px] leading-[0.92] text-[#111111]">
              No surprises. Just the essentials you need.
            </h2>
            <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-[#6a665d] max-w-3xl">
              Every workspace—free or pro—gets the same white-glove infrastructure so you can focus on improving AI visibility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-[28px] border border-[#ece8dd] bg-white/80 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-neueBit text-[20px]">{title}</p>
                </div>
                <p className="font-apercu text-sm text-[#4a473f] leading-relaxed leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
