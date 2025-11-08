import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/lib/auth-client';
import type { UserProfile, UserSettings } from '@/lib/db/schema';
import { parseApiResponse, ClientApiError } from '@/lib/client-errors';
import { toast } from 'sonner';

interface ProfileData {
  profile: UserProfile | null;
  settings: UserSettings | null;
  user: {
    id: string;
    email: string;
  };
}

export function useProfile() {
  const { data: session } = useSession();

  return useQuery<ProfileData>({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const res = await fetch('/api/user/profile');
      return parseApiResponse<ProfileData>(res);
    },
    enabled: !!session?.user?.id,
    retry: (failureCount, error) => {
      if (error instanceof ClientApiError) {
        if (error.isAuthenticationError() || error.isAuthorizationError()) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return parseApiResponse<UserProfile>(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', session?.user?.id] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      if (error instanceof ClientApiError) {
        toast.error(error.getUserMessage());
      } else {
        toast.error('Failed to update profile');
      }
    },
  });
}

export function useSettings() {
  const { data: session } = useSession();

  return useQuery<UserSettings>({
    queryKey: ['settings', session?.user?.id],
    queryFn: async () => {
      const res = await fetch('/api/user/settings');
      return parseApiResponse<UserSettings>(res);
    },
    enabled: !!session?.user?.id,
    retry: (failureCount, error) => {
      if (error instanceof ClientApiError) {
        if (error.isAuthenticationError() || error.isAuthorizationError()) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data: Partial<UserSettings>) => {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return parseApiResponse<UserSettings>(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', session?.user?.id] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      if (error instanceof ClientApiError) {
        toast.error(error.getUserMessage());
      } else {
        toast.error('Failed to update settings');
      }
    },
  });
}