'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { LOGIN } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail ou usuário é obrigatório')
    .refine(
      (value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-zA-Z0-9_-]{3,}$/.test(value);
        return isEmail || isUsername;
      },
      'Digite um e-mail válido ou nome de usuário'
    ),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .min(1, 'Senha é obrigatória'),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  };
}

export function useLoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const { setUser, setToken } = useClientAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { data: response } = await apolloClient.mutate<LoginResponse>({
        mutation: LOGIN,
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (!response?.login) {
        throw new Error('Falha ao fazer login');
      }

      return response.login;
    },
    onSuccess: (data, variables) => {
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

      // Lembrar email se selecionado
      if (variables.rememberMe) {
        localStorage.setItem('remember-email', variables.email);
      } else {
        localStorage.removeItem('remember-email');
      }

      // Redirecionar para dashboard
      setTimeout(() => {
        router.push(`/${locale}/user`);
      }, 500);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao fazer login';
      setError(errorMessage);
      console.error('Login error:', err);
    },
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    form,
    onSubmit: form.handleSubmit((data) => loginMutation.mutate(data)),
    showPassword,
    togglePasswordVisibility,
    isLoading: loginMutation.isPending,
    error,
  };
}