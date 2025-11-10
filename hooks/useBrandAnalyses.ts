import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/lib/auth-client';
import type { BrandAnalysis } from '@/lib/db/schema';
import { parseApiResponse, ClientApiError } from '@/lib/client-errors';
import { toast } from 'sonner';

export function useBrandAnalyses() {
  const { data: session } = useSession();

  return useQuery<BrandAnalysis[]>({
    queryKey: ['brandAnalyses', session?.user?.id],
    queryFn: async () => {
      const res = await fetch('/api/brand-monitor/analyses');
      return parseApiResponse<BrandAnalysis[]>(res);
    },
    enabled: !!session?.user?.id,
    retry: (failureCount, error) => {
      // Don't retry on authentication or authorization errors
      if (error instanceof ClientApiError) {
        if (error.isAuthenticationError()) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });
}

export function useBrandAnalysis(analysisId: string | null) {
  const { data: session } = useSession();

  return useQuery<BrandAnalysis>({
    queryKey: ['brandAnalysis', analysisId],
    queryFn: async () => {
      const res = await fetch(`/api/brand-monitor/analyses/${analysisId}`);
      return parseApiResponse<BrandAnalysis>(res);
    },
    enabled: !!session?.user?.id && !!analysisId,
    retry: (failureCount, error) => {
      if (error instanceof ClientApiError) {
        if (error.isAuthenticationError() || error.isNotFoundError()) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });
}

export function useSaveBrandAnalysis() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (analysisData: Partial<BrandAnalysis>) => {
      const res = await fetch('/api/brand-monitor/analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      });

      return parseApiResponse<BrandAnalysis>(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brandAnalyses', session?.user?.id] });
      toast.success('Brand analysis saved successfully');
    },
    onError: (error) => {
      if (error instanceof ClientApiError) {
        toast.error(error.getUserMessage());
      } else {
        toast.error('Failed to save brand analysis');
      }
    },
  });
}

export function useDeleteBrandAnalysis() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (analysisId: string) => {
      const res = await fetch(`/api/brand-monitor/analyses/${analysisId}`, {
        method: 'DELETE',
      });

      return parseApiResponse(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brandAnalyses', session?.user?.id] });
      toast.success('Brand analysis deleted successfully');
    },
    onError: (error) => {
      if (error instanceof ClientApiError) {
        toast.error(error.getUserMessage());
      } else {
        toast.error('Failed to delete brand analysis');
      }
    },
  });
}