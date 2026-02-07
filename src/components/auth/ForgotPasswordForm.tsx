'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useForgotPasswordForm } from '@/hooks/forms/useForgotPasswordForm';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordForm() {
 const t = useTranslations('auth.forgotPassword');
 const locale = useLocale();
 const { form, onSubmit, error, success, isLoading } = useForgotPasswordForm();
 const { register, handleSubmit, formState: { errors } } = form;

 if (success) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-6"
 >
 <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
 <CheckCircle className="w-8 h-8 text-success" />
 </div>
 <div>
 <h3 className="text-lg font-semibold text-foreground mb-2">Email enviado!</h3>
 <p className="text-muted-foreground text-sm">{t('successMessage')}</p>
 </div>
 <Link
 href={`/${locale}/auth/login`}
 className="inline-block px-6 py-3 bg-primary text-card-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
 >
 {t('backToLogin')}
 </Link>
 </motion.div>
 );
 }

 return (
 <motion.form
 onSubmit={handleSubmit(onSubmit)}
 className="space-y-6 w-full"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 {error && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm flex items-start gap-2"
 >
 <div className="flex-shrink-0 mt-0.5">⚠️</div>
 <div>
 <p className="font-semibold">Erro ao enviar email</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
 </div>
 </motion.div>
 )}

 <InlineInput
 {...register('email')}
 type="email"
 label={t('email')}
 placeholder="seu@email.com"
 leftIcon={<Mail className="h-4 w-4" />}
 error={errors.email?.message}
 disabled={isLoading}
 autoComplete="email"
 />

 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-lg shadow-primary/20"
 >
 {t('button')}
 </LoadingButton>

 <Link
 href={`/${locale}/auth/login`}
 className="block text-center text-sm text-primary hover:text-primary/80 hover:underline transition-colors font-semibold"
 >
 {t('backToLogin')}
 </Link>
 </motion.form>
 );
}
