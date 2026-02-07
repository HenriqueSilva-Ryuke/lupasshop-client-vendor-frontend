'use client';

import { useSignupForm } from '@/hooks/forms/useSignupForm';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { User, Mail, Lock, UserCircle } from 'lucide-react';

export function SignupForm() {
 const locale = useLocale();
 const { form, onSubmit, isLoading, error } = useSignupForm();
 const { register, formState: { errors } } = form;

 return (
 <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
 <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
  
 <form onSubmit={onSubmit} className="space-y-4">
 {error && (
 <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2">
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">Erro ao criar conta</p>
 <p className="text-xs mt-1 opacity-90">{typeof error === 'string' ? error : 'Verifique os dados e tente novamente'}</p>
 </div>
 </div>
 )}

 <InlineInput
 {...register('fullName')}
 type="text"
 label="Nome Completo"
 placeholder="Seu nome completo"
 leftIcon={<User className="h-4 w-4" />}
 error={errors.fullName?.message}
 disabled={isLoading}
 autoComplete="name"
 required
 />

 <InlineInput
 {...register('email')}
 type="email"
 label="Email"
 placeholder="seu@email.com"
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 required
 />

 <InlineInput
 {...register('password')}
 type="password"
 label="Senha"
 placeholder="••••••••"
 leftIcon={<Lock className="h-4 w-4" />}
 error={errors.password?.message}
 disabled={isLoading}
 autoComplete="new-password"
 hint="Mínimo 6 caracteres"
 required
 />

 <div>
 <label htmlFor="role" className="block text-sm font-medium text-foreground mb-1.5">
 Tipo de Conta<span className="text-destructive ml-0.5">*</span>
 </label>
 <div className="relative">
 <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
 <select
 id="role"
 {...register('role')}
 disabled={isLoading}
 className="w-full pl-10 pr-4 py-2 h-10 rounded-md border border-input bg-background text-foreground text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:opacity-50"
 >
 <option value="BUYER">Comprador</option>
 <option value="SELLER">Vendedor</option>
 </select>
 </div>
 {errors.role && (
 <p className="mt-1.5 text-xs text-destructive">{errors.role.message}</p>
 )}
 </div>

 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-md shadow-primary/20"
 >
 Criar Conta
 </LoadingButton>
 </form>

 <div className="mt-6 text-center">
 <p className="text-sm text-muted-foreground">
 Já tem uma conta?{' '}
 <Link href={`/${locale}/auth/login`} className="text-primary hover:text-primary/80 font-medium hover:underline">
 Faça login
 </Link>
 </p>
 </div>
 </div>
 );
}
