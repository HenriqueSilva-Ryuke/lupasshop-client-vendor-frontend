'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useResetPasswordForm } from '@/hooks/forms/useResetPasswordForm';
import { InlineInput } from '@/components/ui/InlineInput';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ResetPasswordFormProps {
 token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
 const t = useTranslations('auth.resetPassword');
 const { form, onSubmit, error, success, isLoading } = useResetPasswordForm(token);
 const { register, handleSubmit, formState: { errors } } = form;
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
 <h3 className="text-lg font-semibold text-foreground mb-2">Sucesso!</h3>
 <p className="text-muted-foreground text-sm">{t('successMessage')}</p>
 </div>
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
 <p className="font-semibold">Erro ao redefinir senha</p>
 <p className="text-xs mt-1 opacity-90">{error}</p>
 </div>
 </motion.div>
 )}

 <InlineInput
 {...register('password')}
 type={showPassword ? 'text' : 'password'}
 label={t('password')}
 placeholder="••••••••"
 leftIcon={<Lock className="h-4 w-4" />}
 rightIcon={
 <button
 onClick={() => setShowPassword(!showPassword)}
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
 label={t('confirmPassword')}
 placeholder="••••••••"
 leftIcon={<Lock className="h-4 w-4" />}
 rightIcon={
 <button
 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

 <LoadingButton
 type="submit"
 loading={isLoading}
 variant="default"
 size="lg"
 className="w-full shadow-lg shadow-primary/20"
 >
 {t('button')}
 </LoadingButton>
 </motion.form>
 );
}
