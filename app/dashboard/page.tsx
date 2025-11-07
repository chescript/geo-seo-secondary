'use client';

import Link from 'next/link';
import { useCustomer } from 'autumn-js/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MessageSquare, Search, CreditCard, ArrowRight } from 'lucide-react';

function DashboardContent({ session }: { session: any }) {
  const { customer } = useCustomer();

  const userProducts = customer?.products || [];
  const activeProduct = userProducts.find(p =>
    p.status === 'active' || p.status === 'trialing' || p.status === 'past_due'
  );

  const isPro = activeProduct?.id === 'pro';
  const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';
  const workspaceEmail = session.user?.email ?? '—';

  const quickActions = [
    {
      title: 'Brand Monitor',
      description: 'Analyze your brand coverage across AI platforms',
      icon: Search,
      href: '/brand-monitor',
      disabled: false,
    },
    {
      title: 'AI Chat',
      description: 'Get competitive insights and strategic guidance',
      icon: MessageSquare,
      href: '/chat',
      disabled: !isPro,
      badge: !isPro ? 'Pro only' : undefined,
    },
    {
      title: 'View Plans',
      description: 'Upgrade to unlock advanced features',
      icon: CreditCard,
      href: '/plans',
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#6a665d] mb-2">Welcome back,</p>
            <h1 className="font-neueBit text-5xl text-[#111111]">{userName}</h1>
          </div>
          <Link
            href="/brand-monitor"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#2b2b2b]"
          >
            Launch Brand Monitor
            <ArrowRight className="w-4 h-4" />
          </Link>
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
        <div className="rounded-xl border border-[#e4ded0] bg-white p-6 space-y-4">
          <h3 className="font-neueBit text-lg text-[#111111]">Workspace</h3>
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
