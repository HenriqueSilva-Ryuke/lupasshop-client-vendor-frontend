'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useLoginMutation } from '@/hooks/mutations';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password
      });

      if (data.rememberMe) {
        localStorage.setItem('remember-email', data.email);
      }

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao fazer login');
    }
  };

  return {
    form,
    onSubmit,
    error,
    isLoading: loginMutation.isPending
  };
}