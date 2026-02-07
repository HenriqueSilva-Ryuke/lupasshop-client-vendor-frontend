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

const sellerLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .min(1, 'Senha é obrigatória'),
  rememberMe: z.boolean(),
});

export type SellerLoginFormData = z.infer<typeof sellerLoginSchema>;

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

export function useSellerLoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const { setUser, setToken } = useClientAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async (data: SellerLoginFormData) => {
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

      // Validar que é um seller
      if (response.login.user.role !== 'SELLER' && response.login.user.role !== 'ADMIN') {
        throw new Error('Esta conta não tem acesso ao painel de lojista');
      }

      return response.login;
    },
    onSuccess: (data, variables) => {
      setError(null);
      
      // Salvar token
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
      }

      // Salvar dados do usuário
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: (data.user.role as 'BUYER' | 'SELLER' | 'ADMIN') || 'SELLER',
        });
      }

      // Lembrar email se selecionado
      if (variables.rememberMe) {
        localStorage.setItem('remember-seller-email', variables.email);
      } else {
        localStorage.removeItem('remember-seller-email');
      }

      // Redirecionar para dashboard de vendedor
      setTimeout(() => {
        router.push(`/${locale}/seller/dashboard`);
      }, 500);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao fazer login';
      setError(errorMessage);
      console.error('Seller login error:', err);
    },
  });

  const form = useForm<SellerLoginFormData>({
    resolver: zodResolver(sellerLoginSchema),
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
