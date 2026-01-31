'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AuthLayout from '../../../../components/auth/AuthLayout';
import ResetPasswordForm from '../../../../components/auth/ResetPasswordForm';
import { useDevToolsProtection } from '../../../../hooks/useDevToolsProtection';

export default function ResetPasswordPage() {
 useDevToolsProtection();
 const t = useTranslations('auth.resetPassword');
 const searchParams = useSearchParams();
 const token = searchParams.get('token') || '';

 if (!token) {
 return (
 <AuthLayout title="Erro" subtitle="Token de recuperação não foi fornecido">
 <div className="text-center text-destructive">
 Link de recuperação inválido. Por favor, solicit um novo link.
 </div>
 </AuthLayout>
 );
 }

 return (
 <AuthLayout title={t('title')} subtitle={t('subtitle')}>
 <ResetPasswordForm token={token} />
 </AuthLayout>
 );
}
