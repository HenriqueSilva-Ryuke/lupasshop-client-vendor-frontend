'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, type ResetPasswordRequest } from '@/services/auth';
import { useTranslations } from 'next-intl';

export function useResetPasswordMutation() {
  const t = useTranslations('auth');

  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await authService.resetPassword(data);
      if (!response) {
        throw new Error(t('errors.resetPasswordFailed') || 'Failed to reset password');
      }
      return response;
    },
    onError: (error: Error) => {
      console.error('Reset password mutation error:', error);
    }
  });
}
