'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, type ForgotPasswordRequest } from '@/services/auth';
import { useTranslations } from 'next-intl';

export function useForgotPasswordMutation() {
  const t = useTranslations('auth');

  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await authService.forgotPassword(data);
      if (!response) {
        throw new Error(t('errors.forgotPasswordFailed') || 'Failed to send reset email');
      }
      return response;
    },
    onError: (error: Error) => {
      console.error('Forgot password mutation error:', error);
    }
  });
}
