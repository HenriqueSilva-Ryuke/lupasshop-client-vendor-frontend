'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRegisterMutation } from '@/hooks/mutations';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'Você deve concordar com os termos')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password
      });

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao registrar');
    }
  };

  return {
    form,
    onSubmit,
    error,
    isLoading: registerMutation.isPending
  };
}