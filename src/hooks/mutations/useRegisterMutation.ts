'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, type RegisterRequest, type AuthResponse } from '@/services/auth';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useTranslations } from 'next-intl';

export function useRegisterMutation() {
  const { setUser, setToken } = useClientAuth();
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
      console.error('Register mutation error:', error);
    }
  });
}
