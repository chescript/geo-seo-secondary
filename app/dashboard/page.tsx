'use client';

import Link from 'next/link';
import { useCustomer } from 'autumn-js/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, CreditCard, ArrowRight, Download, Sparkles } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { UsageProgress } from '@/components/dashboard/usage-progress';
import { RecentAnalysesList } from '@/components/dashboard/recent-analyses-list';
import { CompetitorInsights } from '@/components/dashboard/competitor-insights';
import { formatDistanceToNow } from 'date-fns';
import type { LucideIcon } from 'lucide-react';

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
  const { data: stats, isLoading, error } = useDashboardStats();
  const [isExporting, setIsExporting] = useState(false);

  const userProducts = customer?.products || [];
  const activeProduct = userProducts.find(p =>
    p.status === 'active' || p.status === 'trialing' || p.status === 'past_due'
  );

  const isPro = activeProduct?.id === 'pro';
  const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';
  const workspaceEmail = session.user?.email ?? '-';

  const handleExport = async (format: 'json' | 'csv') => {
    setIsExporting(true);
    try {
      const response = await fetch(`/api/brand-monitor/export?format=${format}`);
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brand-analyses-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export analyses. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAnalysis = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;

    try {
      const response = await fetch(`/api/brand-monitor/analyses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      // Refresh the dashboard data
      window.location.reload();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete analysis. Please try again.');
    }
  };

  const lastAnalysisFormatted = stats?.lastAnalysisDate
    ? formatDistanceToNow(new Date(stats.lastAnalysisDate), { addSuffix: true })
    : 'No scans yet';

  const quickActions: QuickAction[] = [
    {
      title: 'New Analysis',
      description: 'Launch brand monitor to analyze your AI visibility',
      icon: Sparkles,
      href: '/brand-monitor',
      disabled: false,
      badge: stats?.usageStats?.remaining === 0 ? 'Limit reached' : undefined,
    },
    {
      title: 'View Plans',
      description: 'Upgrade to unlock more analyses and features',
      icon: CreditCard,
      href: '/plans',
      disabled: false,
      badge: !isPro ? 'Upgrade' : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-landing-background">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="rounded-[32px] border border-landing-border bg-gradient-to-br from-white via-landing-card to-landing-background p-8 shadow-landing-card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Welcome back</p>
            <h1 className="font-neueBit text-[44px] leading-[0.9] text-landing-base">{userName}</h1>
            <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-landing-body">
              Track AI visibility, monitor competitors, and keep your brand optimized.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="rounded-2xl border border-landing-border bg-white/80 px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-landing-muted">
              {isPro ? 'Brand Monitor Access' : 'Free Workspace'}
            </div>
            <div className="flex gap-2">
              {stats && stats.brandAnalysesCount > 0 && (
                <button
                  onClick={() => handleExport('json')}
                  disabled={isExporting}
                  className="inline-flex items-center gap-2 rounded-full border border-landing-border bg-white px-4 py-2.5 font-apercu text-[11px] uppercase tracking-[0.3em] font-medium text-landing-base transition-all hover:bg-landing-background disabled:opacity-50"
                  title="Export analyses"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Exporting...' : 'Export'}
                </button>
              )}
              <Link
                href="/brand-monitor"
                className="inline-flex items-center gap-2 rounded-full bg-landing-base px-6 py-3 font-apercu text-[11px] uppercase tracking-[0.3em] font-medium text-white transition-all hover:bg-opacity-90"
              >
                New Analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[28px] border border-landing-border bg-white p-6 animate-pulse">
                <div className="h-12 w-12 bg-landing-background rounded-2xl mb-4" />
                <div className="h-4 w-24 bg-landing-background rounded mb-3" />
                <div className="h-10 w-32 bg-landing-background rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-red-800">Failed to load dashboard data. Please refresh the page.</p>
          </div>
        )}

        {/* Dashboard Content */}
        {!isLoading && !error && stats && (
          <>
            {/* Usage & Stats Section */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Usage Progress Card */}
              {stats.usageStats && (
                <UsageProgress
                  used={stats.usageStats.used}
                  limit={stats.usageStats.limit}
                  remaining={stats.usageStats.remaining}
                  percentage={stats.usageStats.percentage}
                  periodStart={stats.usageStats.periodStart}
                  periodEnd={stats.usageStats.periodEnd}
                />
              )}

              {/* Last Crawl Card */}
              <div className="rounded-[28px] border border-landing-border bg-white/95 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-landing-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-landing-background">
                    <Search className="w-6 h-6 text-landing-base" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Last Crawl</p>
                  <p className="font-neueBit text-[24px] leading-tight text-landing-base">
                    {lastAnalysisFormatted}
                  </p>
                </div>
              </div>

              {/* Plan Status Card */}
              <div className="rounded-[28px] border border-landing-border bg-white/95 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-landing-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-landing-base">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  {!isPro && (
                    <Link
                      href="/plans"
                      className="ml-auto px-3 py-1 rounded-full font-apercu text-[11px] uppercase tracking-[0.3em] font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                    >
                      Upgrade
                    </Link>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Plan Status</p>
                  <p className="font-neueBit text-[24px] leading-tight text-landing-base">
                    {isPro ? 'Brand Monitor' : 'Free Trial'}
                  </p>
                  <p className="font-apercu text-[11px] uppercase tracking-[0.2em] text-landing-body">
                    {isPro ? 'Priority support' : 'Limited access'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Analyses & Competitors Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <RecentAnalysesList
                analyses={stats.recentAnalyses}
                onDelete={handleDeleteAnalysis}
              />
              <CompetitorInsights
                competitors={stats.competitors}
                totalAnalyses={stats.brandAnalysesCount}
              />
            </div>
          </>
        )}

        {/* Quick Actions */}
        {!isLoading && !error && (
          <div className="space-y-4">
            <h2 className="font-neueBit text-[28px] leading-[0.9] text-landing-base">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map(action => {
                const Icon = action.icon;
                const card = (
                  <div
                    className={`relative rounded-[28px] border border-landing-border bg-white p-6 transition-all ${
                      action.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-landing-base hover:shadow-landing-card cursor-pointer'
                    }`}
                  >
                    {action.badge && (
                      <span className="absolute top-4 right-4 rounded-full bg-landing-base px-3 py-1 font-apercu text-[11px] uppercase tracking-[0.3em] font-medium text-white">
                        {action.badge}
                      </span>
                    )}
                    <div className="mb-4">
                      <div className="inline-flex rounded-2xl bg-landing-background p-4">
                        <Icon className="w-6 h-6 text-landing-base" />
                      </div>
                    </div>
                    <h3 className="font-neueBit text-[24px] leading-[0.9] text-landing-base mb-2">{action.title}</h3>
                    <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-landing-body">{action.description}</p>
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
        )}

        {/* Workspace Info */}
        <div className="rounded-[28px] border border-landing-border bg-white p-6 space-y-4 shadow-landing-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-neueBit text-[20px] leading-[0.9] text-landing-base">Workspace</h3>
              <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Account overview</p>
            </div>
            <div className="rounded-full border border-landing-border px-4 py-1 font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">
              {isPro ? 'Pro tier' : 'Free tier'}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Email</span>
              <span className="font-apercu text-[13px] uppercase tracking-[0.2em] font-medium text-landing-base">{workspaceEmail}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-landing-background">
              <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Plan</span>
              <div className="flex items-center gap-3">
                <span className="font-apercu text-[13px] uppercase tracking-[0.2em] font-medium text-landing-base">{isPro ? 'Pro' : 'Free'}</span>
                {!isPro && (
                  <Link
                    href="/plans"
                    className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-base underline hover:no-underline"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
            </div>
            {stats && (
              <>
                <div className="flex items-center justify-between py-2 border-t border-landing-background">
                  <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Total analyses</span>
                  <span className="font-neueBit text-[18px] leading-none text-landing-base">
                    {stats.brandAnalysesCount}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-landing-background">
                  <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Credits used</span>
                  <span className="font-neueBit text-[18px] leading-none text-landing-base">
                    {stats.totalCreditsUsed}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-landing-background">
                  <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Competitors tracked</span>
                  <span className="font-neueBit text-[18px] leading-none text-landing-base">
                    {stats.competitors.length}
                  </span>
                </div>
              </>
            )}
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
      <div className="min-h-screen bg-landing-background flex items-center justify-center text-landing-base">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-landing-base mx-auto" />
          <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Loading workspace…</p>
        </div>
      </div>
    );
  }

  return <DashboardContent session={session} />;
}
