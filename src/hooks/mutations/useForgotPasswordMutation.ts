'use client';
import { useMutation } from '@tanstack/react-query';

// TODO: Implement when backend supports forgotPassword mutation
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (_data: { email: string }) => {
      throw new Error('Not implemented');
    },
  });
}
