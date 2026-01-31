'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useResetPasswordForm } from '@/hooks/forms/useResetPasswordForm';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations('auth.resetPassword');
  const { form, onSubmit, error, success, isLoading } = useResetPasswordForm(token);
  const { register, handleSubmit, formState: { errors } } = form;

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
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
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Password Field */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t('password')}
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.password
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-border focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-card`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t('confirmPassword')}
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.confirmPassword
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-border focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-card`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-black rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Redefinindo...' : t('button')}
      </motion.button>
    </motion.form>
  );
}
