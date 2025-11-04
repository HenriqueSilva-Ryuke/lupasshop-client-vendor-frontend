'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useForgotPasswordMutation } from '@/hooks/mutations';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email obrigatório')
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const forgotPasswordMutation = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    try {
      await forgotPasswordMutation.mutateAsync({
        email: data.email
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao solicitar recuperação');
    }
  };

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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email enviado!</h3>
          <p className="text-gray-600 text-sm">{t('successMessage')}</p>
        </div>
        <Link
          href={`/${locale}/auth/login`}
          className="inline-block px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
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

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {forgotPasswordMutation.isPending ? 'Enviando...' : t('button')}
      </motion.button>

      {/* Back to Login */}
      <Link
        href={`/${locale}/auth/login`}
        className="block text-center text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
      >
        {t('backToLogin')}
      </Link>
    </motion.form>
  );
}
