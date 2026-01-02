'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, type LoginRequest, type AuthResponse } from '@/services/auth';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useTranslations } from 'next-intl';

export function useLoginMutation() {
  const { setUser, setToken } = useClientAuth();
  const t = useTranslations('auth');

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authService.login(credentials);
      if (!response) {
        throw new Error(t('errors.loginFailed') || 'Login failed');
      }
      return response;
    },
    onSuccess: (data: AuthResponse) => {
      if (data.user) {
        setUser({
          ...data.user,
          role: data.user.role as 'BUYER' | 'SELLER' | 'ADMIN',
        });
      }
      if (data.token) {
        setToken(data.token);
      }
    },
    onError: (error: Error) => {
      console.error('Login mutation error:', error);
    }
  });
}
