'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { SIGNUP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';

const registerSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(1, 'Confirme sua senha'),
  terms: z.boolean(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
}).refine(data => data.terms === true, {
  message: 'Você deve aceitar os termos de uso',
  path: ['terms'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface SignupResponse {
  signup: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  };
}

export function useRegisterForm() {
  const locale = useLocale();
  const router = useRouter();
  const { setUser, setToken } = useClientAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const { data: response } = await apolloClient.mutate<SignupResponse>({
        mutation: SIGNUP,
        variables: {
          input: {
            email: data.email.toLowerCase(),
            password: data.password,
            fullName: data.fullName,
            role: 'BUYER',
          },
        },
      });

      if (!response?.signup) {
        throw new Error('Falha ao criar conta');
      }

      return response.signup;
    },
    onSuccess: (data) => {
      setError(null);
      
      // Salvar dados do usuário (token is in HTTP-only cookie now)
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: (data.user.role as 'BUYER' | 'SELLER' | 'ADMIN') || 'BUYER',
        });
      }

      // Redirecionar para dashboard
      setTimeout(() => {
        router.push(`/${locale}/user`);
      }, 500);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao criar conta';
      setError(errorMessage);
      console.error('Register error:', err);
    },
  });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    form,
    onSubmit: form.handleSubmit((data) => registerMutation.mutate(data)),
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    isLoading: registerMutation.isPending,
    error,
  };
}