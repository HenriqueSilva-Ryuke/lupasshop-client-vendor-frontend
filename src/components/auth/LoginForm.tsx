'use client';

import React from 'react';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { AnimatedCheckbox } from '@/components/ui/AnimatedCheckbox';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function LoginForm() {
 const locale = useLocale();
 const { form, onSubmit, showPassword, togglePasswordVisibility, isLoading, error } = useLoginForm();
 const { register, formState: { errors }, watch } = form;
 
 const emailValue = watch('email');
 const passwordValue = watch('password');

 return (
 <form onSubmit={onSubmit} className="flex flex-col gap-5">
 {/* Error Alert - contextual and clear */}
 {error && (
 <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2">
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">Não foi possível fazer login</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
 </div>
 </div>
 )}

 {/* Email Input with inline validation */}
 <InlineInput
 {...register('email')}
 type="email"
 label="E-mail ou Usuário"
 placeholder="exemplo@email.com"
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 />

 {/* Password Input with inline validation */}
 <div>
 <InlineInput
 {...register('password')}
 type={showPassword ? 'text' : 'password'}
 label="Senha"
 placeholder="Digite sua senha"
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
 hint="Mínimo 6 caracteres"
 />
 </div>

 {/* Options Row */}
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

 {/* Login Button with loading state */}
 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-md shadow-primary/20"
 >
 Entrar
 </LoadingButton>
 </form>
 );
}
