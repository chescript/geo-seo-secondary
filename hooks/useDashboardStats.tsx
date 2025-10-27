'use client';

import { useQuery } from '@tanstack/react-query';

interface DashboardStats {
  brandAnalysesCount: number;
  chatConversationsCount: number;
  accountAgeDays: number;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch analyses count
      const analysesRes = await fetch('/api/brand-monitor/analyses');
      const analysesData = analysesRes.ok ? await analysesRes.json() : { analyses: [] };

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

      return {
        brandAnalysesCount: analysesData.analyses?.length || 0,
        chatConversationsCount: chatsData.conversations?.length || 0,
        accountAgeDays,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
