'use client';

import React from 'react';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { AnimatedCheckbox } from '@/components/ui/AnimatedCheckbox';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function LoginForm() {
 const locale = useLocale();
 const t = useTranslations('auth.login');
 const { form, onSubmit, showPassword, togglePasswordVisibility, isLoading, error } = useLoginForm();
 const { register, formState: { errors }, watch } = form;
 
 const emailValue = watch('email');
 const passwordValue = watch('password');

 return (
 <motion.form onSubmit={onSubmit} className="flex flex-col gap-5">
 {/* Error Alert - contextual and clear */}
 {error && (
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2"
 >
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">{t('errorTitle')}</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
 </div>
 </motion.div>
 )}

 {/* Email Input with inline validation */}
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 >
 <InlineInput
 {...register('email')}
 type="email"
 label={t('email')}
 placeholder={t('emailPlaceholder')}
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 />
 </motion.div>

 {/* Password Input with inline validation */}
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 >
 <InlineInput
 {...register('password')}
 type={showPassword ? 'text' : 'password'}
 label={t('password')}
 placeholder={t('passwordPlaceholder')}
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
 hint={t('passwordHint')}
 />
 </motion.div>

 {/* Options Row */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="flex items-center justify-between"
 >
 <AnimatedCheckbox
 {...register('rememberMe')}
 label={t('rememberMe')}
 disabled={isLoading}
 />
 <Link
 href={`/${locale}/auth/forgot-password`}
 className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
 >
 {t('forgotPassword')}
 </Link>
 </motion.div>

 {/* Login Button with loading state */}
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 >
 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-md shadow-primary/20"
 >
 {t('button')}
 </LoadingButton>
 </motion.div>

 {/* Google Login Button */}
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5 }}
 >
 <button
 type="button"
 className="w-full flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-border hover:bg-muted/50 transition-colors bg-background"
 >
 <svg
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <path
 d="M23.745 12.27c0-.79-.1-1.54-.25-2.05H12v3.72h6.84c-.29 1.48-.74 2.84-1.6 3.97v2.7h2.52c1.52-1.4 2.4-3.47 2.4-5.9z"
 fill="#4285F4"
 />
 <path
 d="M12 24c2.13 0 3.92-.71 5.23-1.91l-2.51-1.95c-.73.52-1.76.85-2.72.85-2.09 0-3.86-1.41-4.49-3.3H4.41v2.84C5.72 22.45 8.64 24 12 24z"
 fill="#34A853"
 />
 <path
 d="M7.5 14.33c-.16-.52-.25-1.08-.25-1.66s.09-1.13.25-1.66V7.07H4.41C3.85 8.55 3.5 10.22 3.5 12s.35 3.45.9 4.89l2.85-2.22.25-.34z"
 fill="#FBBC05"
 />
 <path
 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C15.92 1.27 14.11.5 12 .5 8.64.5 5.72 2.05 4.41 4.89l2.85 2.22c.63-1.91 2.4-3.33 4.49-3.33z"
 fill="#EA4335"
 />
 </svg>
 <span className="text-sm font-medium text-foreground">{t('googleButton')}</span>
 </button>
 </motion.div>
 </motion.form>
 );
}
