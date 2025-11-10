'use client';

import Link from 'next/link';
import { useCustomer } from 'autumn-js/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Search, CreditCard, ArrowRight, Gauge, CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CustomerUsageInfo = {
  usage?: {
    analyses?: number | null;
    lastAnalysis?: string | number | Date | null;
  } | null;
};

type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  disabled: boolean;
  badge?: string;
};

function DashboardContent({ session }: { session: any }) {
  const { customer } = useCustomer();
  const usageInfo = (customer as CustomerUsageInfo | undefined)?.usage;

  const userProducts = customer?.products || [];
  const activeProduct = userProducts.find(p =>
    p.status === 'active' || p.status === 'trialing' || p.status === 'past_due'
  );

  const isPro = activeProduct?.id === 'pro';
  const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';
  const workspaceEmail = session.user?.email ?? '-';
  const rawAnalysesUsed = usageInfo?.analyses ?? null;
  const analysesUsed = typeof rawAnalysesUsed === 'number' ? rawAnalysesUsed : null;
  const analysesLimit = isPro ? 100 : 10;
  const usagePercent =
    analysesUsed !== null
      ? Math.min(100, Math.round((analysesUsed / analysesLimit) * 100))
      : null;
  const rawLastAnalysis = usageInfo?.lastAnalysis ?? null;
  const lastAnalysisDate = rawLastAnalysis
    ? new Date(rawLastAnalysis).toLocaleDateString()
    : null;

  const quickActions: QuickAction[] = [
    {
      title: 'Brand Monitor',
      description: 'Analyze your brand coverage across AI platforms',
      icon: Search,
      href: '/brand-monitor',
      disabled: false,
    },
    {
      title: 'View Plans',
      description: 'Upgrade to unlock advanced features',
      icon: CreditCard,
      href: '/plans',
      disabled: false,
    },
  ];

  const insightCards = [
    {
      title: 'Analyses used',
      value: analysesUsed !== null ? `${analysesUsed}/${analysesLimit}` : 'Not available',
      subtext:
        analysesUsed !== null
          ? `${usagePercent}% of monthly allowance`
          : 'Run a crawl to populate usage',
      icon: Gauge,
    },
    {
      title: 'Last crawl',
      value: lastAnalysisDate ?? 'No scans yet',
      subtext: lastAnalysisDate ? 'Keep momentum with regular scans' : 'Launch the monitor to run your first crawl',
      icon: CalendarCheck,
    },
    {
      title: 'Plan status',
      value: isPro ? 'Brand Monitor' : 'Free Trial',
      subtext: isPro ? 'Priority support enabled' : 'Upgrade for advanced coverage',
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="rounded-[32px] border border-[#e4ded0] bg-gradient-to-br from-white via-[#fffdf8] to-[#f5efe2] p-8 shadow-[0_45px_120px_rgba(0,0,0,0.08)] flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8b8478]">Welcome back</p>
            <h1 className="font-neueBit text-[44px] leading-[0.9] text-[#111111]">{userName}</h1>
            <p className="text-sm text-[#6a665d]">
              Track AI visibility, monitor competitors, and keep your brand optimized.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="rounded-2xl border border-[#ece5d8] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[#8b8478]">
              {isPro ? 'Brand Monitor Access' : 'Free Workspace'}
            </div>
            <Link
              href="/brand-monitor"
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#2b2b2b]"
            >
              Launch Brand Monitor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {insightCards.map(({ title, value, subtext, icon: Icon }) => (
            <div
              key={title}
              className="rounded-[24px] border border-[#e4ded0] bg-white p-5 shadow-[0_25px_70px_rgba(0,0,0,0.05)] space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#f5efe2] p-3">
                  <Icon className="h-5 w-5 text-[#111111]" />
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#8b8478]">{title}</p>
              </div>
              <p className="font-neueBit text-[32px] text-[#111111] leading-none">{value}</p>
              <p className="text-sm text-[#6a665d]">{subtext}</p>
              {title === 'Analyses used' && usagePercent !== null && (
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-[#f1ede4]">
                    <div
                      className="h-full rounded-full bg-[#111111]"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="font-neueBit text-2xl text-[#111111]">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map(action => {
              const Icon = action.icon;
              const card = (
                <div
                  className={`relative rounded-xl border border-[#e4ded0] bg-white p-6 transition-all ${
                    action.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-[#111111] hover:shadow-sm cursor-pointer'
                  }`}
                >
                  {action.badge && (
                    <span className="absolute top-4 right-4 rounded-full bg-[#111111] px-2 py-1 text-[10px] font-medium text-white">
                      {action.badge}
                    </span>
                  )}
                  <div className="mb-4">
                    <div className="inline-flex rounded-lg bg-[#f8f6f0] p-3">
                      <Icon className="w-5 h-5 text-[#111111]" />
                    </div>
                  </div>
                  <h3 className="font-neueBit text-xl text-[#111111] mb-2">{action.title}</h3>
                  <p className="text-sm text-[#6a665d]">{action.description}</p>
                </div>
              );

              if (action.disabled) {
                return <div key={action.title}>{card}</div>;
              }

              return (
                <Link key={action.title} href={action.href}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Workspace Info */}
        <div className="rounded-[28px] border border-[#e4ded0] bg-white p-6 space-y-4 shadow-[0_35px_90px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-neueBit text-lg text-[#111111]">Workspace</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b8478]">Account overview</p>
            </div>
            <div className="rounded-full border border-[#ece5d8] px-4 py-1 text-xs text-[#6a665d]">
              {isPro ? 'Pro tier' : 'Free tier'}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#6a665d]">Email</span>
              <span className="text-sm font-medium text-[#111111]">{workspaceEmail}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#f1ede4]">
              <span className="text-sm text-[#6a665d]">Plan</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#111111]">{isPro ? 'Pro' : 'Free'}</span>
                {!isPro && (
                  <Link
                    href="/plans"
                    className="text-xs text-[#111111] underline hover:no-underline"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#f1ede4]">
              <span className="text-sm text-[#6a665d]">Last analysis</span>
              <span className="text-sm font-medium text-[#111111]">
                {lastAnalysisDate ?? 'No scans yet'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center text-[#111111]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#111111] mx-auto" />
          <p className="font-apercu text-sm uppercase tracking-[0.3em] text-[#6a665d]">Loading workspace…</p>
        </div>
      </div>
    );
  }

  return <DashboardContent session={session} />;
}
