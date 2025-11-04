'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, type RegisterRequest, type AuthResponse } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { useTranslations } from 'next-intl';

export function useRegisterMutation() {
  const { setUser, setToken } = useAuthStore();
  const t = useTranslations('auth');

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authService.register(data);
      if (!response) {
        throw new Error(t('errors.registerFailed') || 'Registration failed');
      }
      return response;
    },
    onSuccess: (data: AuthResponse) => {
      if (data.user) {
        setUser(data.user);
      }
      if (data.token) {
        setToken(data.token);
      }
    },
    onError: (error: Error) => {
      console.error('Register mutation error:', error);
    }
  });
}
