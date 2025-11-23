'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useForgotPasswordMutation } from '@/hooks/mutations';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email obrigatório')
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function useForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const forgotPasswordMutation = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    try {
      await forgotPasswordMutation.mutateAsync({
        email: data.email
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao solicitar recuperação');
    }
  };

  return {
    form,
    onSubmit,
    error,
    success,
    isLoading: forgotPasswordMutation.isPending
  };
}