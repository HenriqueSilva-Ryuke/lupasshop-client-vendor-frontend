'use client';
import { useMutation } from '@tanstack/react-query';

// TODO: Implement when backend supports resetPassword mutation
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (_data: { token: string; password: string }) => {
      throw new Error('Not implemented');
    },
  });
}
