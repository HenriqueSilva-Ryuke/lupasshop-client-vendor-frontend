'use client';

import { useTranslations } from 'next-intl';
import AuthLayout from '../../../../components/auth/AuthLayout';
import RegisterForm from '../../../../components/auth/RegisterForm';
import { useDevToolsProtection } from '../../../../hooks/useDevToolsProtection';

export default function RegisterPage() {
  useDevToolsProtection();
  const t = useTranslations('auth.register');

  return (
    <AuthLayout title={t('title')} subtitle={t('subtitle')}>
      <RegisterForm />
    </AuthLayout>
  );
}
