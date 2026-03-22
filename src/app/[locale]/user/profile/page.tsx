'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useAuthProtection } from '@/hooks/useAuthProtection';
import { useCurrentUser } from 'lupa-api-client/hooks';
import { getApiClient } from 'lupa-api-client';
import { UPDATE_USER } from '@/graphql/mutations';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { errorTextClass, inputBaseClass, inputErrorClass, labelClass } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = useLocale();
  const router = useRouter();

  // Always call all hooks in the same order
  const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection(['BUYER']);
  const { data: user, isLoading: loading } = useCurrentUser();

  const updateUserMutation = useMutation({
    mutationFn: async (input: { id: string; fullName: string; email: string }) => {
      const client = getApiClient();
      return client.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: input.id,
          input: { fullName: input.fullName, email: input.email },
        },
      });
    },
  });

  const updating = updateUserMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  // Handle redirects after all hooks are called
  useEffect(() => {
    if (!isAuthLoading && !isAuthorized) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [isAuthLoading, isAuthorized, router, locale]);

  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        fullName: values.fullName,
        email: values.email,
      });
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar perfil');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className={`${labelClass} mb-1`}>Nome Completo</label>
            <input
              {...register('fullName')}
              className={cn(inputBaseClass, errors.fullName && inputErrorClass)}
            />
            {errors.fullName && <p className={`${errorTextClass} mt-1`}>{errors.fullName.message}</p>}
          </div>

          <div>
            <label className={`${labelClass} mb-1`}>Email</label>
            <input
              {...register('email')}
              disabled
              className={cn(inputBaseClass, 'bg-muted cursor-not-allowed', errors.email && inputErrorClass)}
            />
            {errors.email && <p className={`${errorTextClass} mt-1`}>{errors.email.message}</p>}
          </div>

          <Button type="submit" disabled={updating} className="w-full h-12">
            {updating ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
