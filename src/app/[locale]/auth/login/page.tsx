'use client';

import { useTranslations, useLocale } from 'next-intl';
import AuthLayout from '../../../../components/auth/AuthLayout';
import LoginForm from '../../../../components/auth/LoginForm';
import { useDevToolsProtection } from '../../../../hooks/useDevToolsProtection';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function LoginPage() {
 useDevToolsProtection();
 const t = useTranslations('auth.login');
 const locale = useLocale();

 return (
 <AuthLayout title={t('title')} subtitle={t('subtitle')}>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 >
 <LoginForm />

 {/* Divider */}
 <div className="relative flex py-4 items-center my-6">
 <div className="flex-grow border-t border-border"></div>
 <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-wider">
 {t('divider')}
 </span>
 <div className="flex-grow border-t border-border"></div>
 </div>

 {/* Sign Up Link */}
 <div className="text-center">
 <p className="text-sm text-muted-foreground mb-2">
 {t('noAccount')}{' '}
 <Link
 href={`/${locale}/auth/register`}
 className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
 >
 {t('signUp')}
 </Link>
 </p>
 </div>
 </motion.div>
 </AuthLayout>
 );
}
