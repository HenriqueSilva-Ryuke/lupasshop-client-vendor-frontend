'use client';

import { motion } from 'motion/react';
import AuthIllustration from './AuthIllustration';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-card"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-foreground">LupaShop</span>
            </Link>

            {/* Title & Subtitle */}
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground"
          >
            <p>
              Ao continuar, você concorda com nossos{' '}
              <Link href={`/${locale}/terms`} className="text-primary hover:underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Illustration */}
      <AuthIllustration />
    </div>
  );
}
