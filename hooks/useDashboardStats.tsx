'use client';

import { useQuery } from '@tanstack/react-query';

interface BrandAnalysis {
  id: string;
  url: string;
  companyName: string;
  industry: string | null;
  creditsUsed: number;
  createdAt: string;
  competitors?: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
}

interface UsageStats {
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
  periodStart?: string;
  periodEnd?: string;
}

interface CompetitorInsight {
  name: string;
  count: number;
  urls: string[];
}

interface DashboardStats {
  // Legacy fields
  brandAnalysesCount: number;
  chatConversationsCount: number;
  accountAgeDays: number;

  // New fields
  usageStats: UsageStats | null;
  recentAnalyses: BrandAnalysis[];
  lastAnalysisDate: string | null;
  competitors: CompetitorInsight[];
  totalCreditsUsed: number;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch usage stats
      const usageRes = await fetch('/api/usage/stats');
      const usageStats: UsageStats | null = usageRes.ok ? await usageRes.json() : null;

      // Fetch analyses
      const analysesRes = await fetch('/api/brand-monitor/analyses');
      const analysesData = analysesRes.ok ? await analysesRes.json() : { analyses: [] };
      const analyses: BrandAnalysis[] = analysesData.analyses || [];

      // Fetch conversations count
      const chatsRes = await fetch('/api/chat');
      const chatsData = chatsRes.ok ? await chatsRes.json() : { conversations: [] };

      // Fetch user profile for account age
      const profileRes = await fetch('/api/user/profile');
      const profileData = profileRes.ok ? await profileRes.json() : null;

      // Calculate account age
      let accountAgeDays = 0;
      if (profileData?.user?.createdAt) {
        const createdDate = new Date(profileData.user.createdAt);
        const now = new Date();
        accountAgeDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      }

      // Get recent analyses (last 10)
      const recentAnalyses = analyses.slice(0, 10);

      // Get last analysis date
      const lastAnalysisDate = analyses.length > 0 ? analyses[0].createdAt : null;

      // Aggregate competitor insights
      const competitorMap = new Map<string, { count: number; urls: Set<string> }>();

      analyses.forEach((analysis) => {
        if (analysis.competitors && Array.isArray(analysis.competitors)) {
          analysis.competitors.forEach((competitor) => {
            if (competitor.name) {
              const existing = competitorMap.get(competitor.name) || { count: 0, urls: new Set() };
              existing.count += 1;
              if (competitor.url) {
                existing.urls.add(competitor.url);
              }
              competitorMap.set(competitor.name, existing);
            }
          });
        }
      });

      const competitors: CompetitorInsight[] = Array.from(competitorMap.entries())
        .map(([name, data]) => ({
          name,
          count: data.count,
          urls: Array.from(data.urls),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 competitors

      // Calculate total credits used
      const totalCreditsUsed = analyses.reduce((sum, analysis) => sum + (analysis.creditsUsed || 10), 0);

      return {
        brandAnalysesCount: analyses.length,
        chatConversationsCount: chatsData.conversations?.length || 0,
        accountAgeDays,
        usageStats,
        recentAnalyses,
        lastAnalysisDate,
        competitors,
        totalCreditsUsed,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
