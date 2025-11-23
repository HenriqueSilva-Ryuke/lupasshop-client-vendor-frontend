'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

export default function LoginForm() {
  const t = useTranslations('auth.login');
  const locale = useLocale();
  const { form, onSubmit, error, isLoading } = useLoginForm();
  const { register, handleSubmit, formState: { errors } } = form;

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

      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('email')}
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="seu@email.com"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-white`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('password')}
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.password
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-white`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 accent-primary"
          />
          <span className="text-sm text-gray-600">{t('rememberMe')}</span>
        </label>
        <Link
          href={`/${locale}/auth/forgot-password`}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {t('forgotPassword')}
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Entrando...' : t('button')}
      </motion.button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
        {t('noAccount')}{' '}
        <Link
          href={`/${locale}/auth/register`}
          className="text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          {t('signUp')}
        </Link>
      </p>
    </motion.form>
  );
}
