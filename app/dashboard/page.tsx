'use client';

import { useCustomer } from 'autumn-js/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  TrendingUp,
  MessageSquare,
  Search,
  CreditCard,
  User,
  Sparkles,
  Calendar,
  BarChart3
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { QuickActionCard } from '@/components/dashboard/quick-action-card';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Card, CardContent } from '@/components/ui/card';

// Separate component that uses Autumn hooks
function DashboardContent({ session }: { session: any }) {
  const { customer } = useCustomer();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  // Get current user's subscription
  const userProducts = customer?.products || [];
  const activeProduct = userProducts.find(p =>
    p.status === 'active' || p.status === 'trialing' || p.status === 'past_due'
  );

  const isPro = activeProduct?.id === 'pro';
  const userName = session.user?.name || session.user?.email?.split('@')[0] || 'User';

  // Mock activity data - in production, fetch from API
  const [activities] = useState([
    {
      id: '1',
      type: 'analysis' as const,
      title: 'Brand Analysis Completed',
      description: 'Analyzed brand presence across social platforms',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    },
    {
      id: '2',
      type: 'chat' as const,
      title: 'AI Conversation Started',
      description: 'New chat about brand monitoring strategies',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      type: 'profile' as const,
      title: 'Profile Updated',
      description: 'Changed account settings',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Hero Section */}
        <Card className="relative overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50 animate-in fade-in duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl opacity-20" />
          <CardContent className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                    Welcome Back
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Hello, <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                    {userName}
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {isPro
                    ? "You're on the Pro plan with unlimited access to all features."
                    : "Upgrade to Pro to unlock unlimited brand monitoring and AI chat."}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg animate-pulse-slow">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700 delay-150">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <StatCard
              title="Subscription"
              value={isPro ? "Pro" : "Free"}
              icon={CreditCard}
              description={isPro ? "Active subscription" : "Limited access"}
              gradient="bg-gradient-to-br from-orange-400 to-orange-600"
              iconColor="bg-gradient-to-br from-orange-500 to-orange-600"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <StatCard
              title="Brand Analyses"
              value={statsLoading ? "-" : stats?.brandAnalysesCount || 0}
              icon={TrendingUp}
              description="Total analyses created"
              gradient="bg-gradient-to-br from-blue-400 to-blue-600"
              iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
              trend={stats?.brandAnalysesCount ? { value: 12, isPositive: true } : undefined}
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
            <StatCard
              title="Chat Conversations"
              value={statsLoading ? "-" : stats?.chatConversationsCount || 0}
              icon={MessageSquare}
              description="Active conversations"
              gradient="bg-gradient-to-br from-green-400 to-green-600"
              iconColor="bg-gradient-to-br from-green-500 to-green-600"
              trend={stats?.chatConversationsCount ? { value: 8, isPositive: true } : undefined}
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <StatCard
              title="Account Age"
              value={statsLoading ? "-" : `${stats?.accountAgeDays || 0}d`}
              icon={Calendar}
              description="Days since joined"
              gradient="bg-gradient-to-br from-purple-400 to-purple-600"
              iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
            />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="animate-in fade-in duration-700 delay-[600ms]">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600">Jump to your most-used features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              title="Brand Monitor"
              description="Analyze your brand's online presence"
              icon={Search}
              href="/brand-monitor"
              gradient="bg-gradient-to-br from-blue-400/10 to-blue-600/10"
              disabled={!isPro}
            />

            <QuickActionCard
              title="AI Chat"
              description="Chat with AI for insights"
              icon={MessageSquare}
              href="/chat"
              gradient="bg-gradient-to-br from-green-400/10 to-green-600/10"
              disabled={!isPro}
            />

            <QuickActionCard
              title="View Plans"
              description="Upgrade your subscription"
              icon={CreditCard}
              href="/plans"
              gradient="bg-gradient-to-br from-orange-400/10 to-orange-600/10"
            />

            <QuickActionCard
              title="Analytics"
              description="View detailed usage stats"
              icon={BarChart3}
              href="/dashboard"
              gradient="bg-gradient-to-br from-purple-400/10 to-purple-600/10"
            />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-700 delay-700">
          <div className="lg:col-span-2">
            <ActivityTimeline activities={activities} maxItems={5} />
          </div>

          {/* Quick Stats Card */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Account Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-xs text-gray-600 truncate max-w-[150px]">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Plan</p>
                        <p className="text-xs text-gray-600">
                          {isPro ? "Pro - $9.99/mo" : "Free Tier"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!isPro && (
                    <button
                      onClick={() => window.location.href = '/plans'}
                      className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Upgrade to Pro
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render DashboardContent when we have a session and AutumnProvider is available
  return <DashboardContent session={session} />;
}