'use client';

import React from 'react';
import { useSellerLoginForm } from '@/hooks/forms/useSellerLoginForm';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { AnimatedCheckbox } from '@/components/ui/AnimatedCheckbox';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function SellerLoginForm() {
 const locale = useLocale();
 const { form, onSubmit, showPassword, togglePasswordVisibility, isLoading, error } = useSellerLoginForm();
 const { register, formState: { errors } } = form;

 return (
 <form onSubmit={onSubmit} className="flex flex-col gap-5">
 {/* Error Alert */}
 {error && (
 <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2">
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">Falha no acesso</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
 </div>
 </div>
 )}

 <InlineInput
 {...register('email')}
 type="email"
 label="E-mail corporativo"
 placeholder="seuemail@loja.com"
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 />

 <InlineInput
 {...register('password')}
 type={showPassword ? 'text' : 'password'}
 label="Senha"
 placeholder="••••••••"
 leftIcon={<Lock className="h-4 w-4" />}
 rightIcon={
 <button
 onClick={togglePasswordVisibility}
 type="button"
 className="hover:text-primary transition-colors"
 tabIndex={-1}
 >
 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
 </button>
 }
 error={errors.password?.message}
 disabled={isLoading}
 autoComplete="current-password"
 />

 <div className="flex items-center justify-between">
 <AnimatedCheckbox
 {...register('rememberMe')}
 label="Lembrar-me"
 disabled={isLoading}
 />
 <Link
 href={`/${locale}/auth/forgot-password`}
 className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
 >
 Esqueci minha senha
 </Link>
 </div>

 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-lg shadow-primary/20"
 rightIcon={<ArrowRight className="h-4 w-4" />}
 >
 Acessar Painel
 </LoadingButton>
 </form>
 );
 </form>
 );
}
