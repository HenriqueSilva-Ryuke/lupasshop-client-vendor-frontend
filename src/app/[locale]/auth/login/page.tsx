'use client';

import { useTranslations } from 'next-intl';
import AuthLayout from '../../../../components/auth/AuthLayout';
import LoginForm from '../../../../components/auth/LoginForm';
import { useDevToolsProtection } from '../../../../hooks/useDevToolsProtection';

export default function LoginPage() {
  useDevToolsProtection();
  const t = useTranslations('auth.login');

  return (
    <AuthLayout title={t('title')} subtitle={t('subtitle')}>
      <LoginForm />
    </AuthLayout>
  );
}
