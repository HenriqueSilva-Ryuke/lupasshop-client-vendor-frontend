'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRegisterForm } from '@/hooks/forms/useRegisterForm';

export default function RegisterForm() {
  const t = useTranslations('auth.register');
  const locale = useLocale();
  const { form, onSubmit, error, isLoading } = useRegisterForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full"
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

      {/* Name Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('name')}
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="João Silva"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.name
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-white`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

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

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('confirmPassword')}
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
            errors.confirmPassword
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-primary focus:ring-primary/10'
          } focus:outline-none focus:ring-4 bg-white`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          {...register('terms')}
          type="checkbox"
          className="w-4 h-4 mt-1 rounded border-gray-300 accent-primary"
        />
        <span className="text-sm text-gray-600">
          {t('terms')}
        </span>
      </label>
      {errors.terms && (
        <p className="text-red-500 text-xs">{errors.terms.message}</p>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-black rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Registrando...' : t('button')}
      </motion.button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600">
        {t('haveAccount')}{' '}
        <Link
          href={`/${locale}/auth/login`}
          className="text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          {t('signIn')}
        </Link>
      </p>
    </motion.form>
  );
}
