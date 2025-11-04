'use client';

import { useTranslations } from 'next-intl';
import AuthLayout from '../../../../components/auth/AuthLayout';
import ForgotPasswordForm from '../../../../components/auth/ForgotPasswordForm';
import { useDevToolsProtection } from '../../../../hooks/useDevToolsProtection';

export default function ForgotPasswordPage() {
  useDevToolsProtection();
  const t = useTranslations('auth.forgotPassword');

  return (
    <AuthLayout title={t('title')} subtitle={t('subtitle')}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
