'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRegisterMutation } from '@/hooks/mutations';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'Você deve concordar com os termos')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const t = useTranslations('auth.register');
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password
      });

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao registrar');
    }
  };

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
        disabled={registerMutation.isPending}
        className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {registerMutation.isPending ? 'Registrando...' : t('button')}
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
