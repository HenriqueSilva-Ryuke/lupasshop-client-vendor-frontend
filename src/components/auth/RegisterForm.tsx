'use client';

import React from 'react';
import { useRegisterForm } from '@/hooks/forms/useRegisterForm';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { AnimatedCheckbox } from '@/components/ui/AnimatedCheckbox';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function RegisterForm() {
 const locale = useLocale();
 const router = useRouter();
 const {
 form,
 onSubmit,
 showPassword,
 showConfirmPassword,
 togglePasswordVisibility,
 toggleConfirmPasswordVisibility,
 isLoading,
 error,
 } = useRegisterForm();
 const { register, formState: { errors } } = form;

 return (
 <form onSubmit={onSubmit} className="flex flex-col gap-5">
 {/* Error Alert */}
 {error && (
 <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2">
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">Erro ao criar conta</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
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
 />

 <InlineInput
 {...register('email')}
 type="email"
 label="E-mail"
 placeholder="seu@email.com"
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <InlineInput
 {...register('password')}
 type={showPassword ? 'text' : 'password'}
 label="Senha"
 placeholder="••••••"
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
 autoComplete="new-password"
 />

 <InlineInput
 {...register('confirmPassword')}
 type={showConfirmPassword ? 'text' : 'password'}
 label="Confirmar Senha"
 placeholder="••••••"
 leftIcon={<Lock className="h-4 w-4" />}
 rightIcon={
 <button
 onClick={toggleConfirmPasswordVisibility}
 type="button"
 className="hover:text-primary transition-colors"
 tabIndex={-1}
 >
 {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
 </button>
 }
 error={errors.confirmPassword?.message}
 disabled={isLoading}
 autoComplete="new-password"
 />
 </div>

 <AnimatedCheckbox
 {...register('terms')}
 label={
 <span className="text-sm text-muted-foreground">
 Concordo com os{' '}
 <a href="#" className="font-semibold text-primary hover:underline">Termos de Uso</a>
 {' '}e a{' '}
 <a href="#" className="font-semibold text-primary hover:underline">Política de Privacidade</a>
 {' '}da LupaShop.
 </span>
 }
 disabled={isLoading}
 />
 {errors.terms && (
 <p className="text-destructive text-xs mt-1 -mt-3">{errors.terms.message}</p>
 )}

 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-lg shadow-primary/20 mt-2"
 >
 Criar minha conta
 </LoadingButton>
 </form>
 );
}
