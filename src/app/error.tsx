'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

interface ErrorProps {
 error: Error & { digest?: string };
 reset: () => void;
}

const translations = {
  pt: {
    title: 'Erro Crítico',
    description: 'Algo deu muito errado. Por favor, tente recarregar a página.',
    tryAgain: 'Tentar Novamente',
    goHome: 'Home',
  },
  en: {
    title: 'Critical Error',
    description: 'Something went very wrong. Please try reloading the page.',
    tryAgain: 'Try Again',
    goHome: 'Home',
  },
} as const;

function detectLocale(): 'pt' | 'en' {
  if (typeof window === 'undefined') return 'pt';
  const pathMatch = window.location.pathname.match(/^\/(en|pt)/);
  if (pathMatch) return pathMatch[1] as 'pt' | 'en';
  return 'pt';
}

export default function RootError({ error, reset }: ErrorProps) {
  const [locale, setLocale] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  useEffect(() => {
    // Log error to monitoring service
    console.error('Root error:', error);
  }, [error]);

  const t = translations[locale];

 return (
 <div className="bg-linear-to-br from-red-900 to-orange-900 min-h-screen flex items-center justify-center">
 <div className="max-w-md w-full p-6 rounded-xl shadow-2xl">
 {/* Error Icon */}
 <motion.div
 initial={{ scale: 0, rotate: -180 }}
 animate={{ scale: 1, rotate: 0 }}
 transition={{ type: 'spring', stiffness: 100 }}
 className="text-6xl text-center mb-6"
 >
 🔥
 </motion.div>

 {/* Error Message */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-center space-y-4"
 >
 <h1 className="text-2xl font-bold text-gray-900">
 {t.title}
 </h1>
 <p className="text-gray-600">
 {t.description}
 </p>

 {/* Error Details */}
 {process.env.NODE_ENV === 'development' && error && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="bg-destructive/10 border border-destructive rounded p-3 text-left"
 >
 <p className="text-xs font-mono text-red-700 wrap-break-word">
 {error.message}
 </p>
 </motion.div>
 )}

 {/* Action Buttons */}
 <div className="flex gap-3 justify-center pt-4">
 <Button
 variant="default"
 onClick={reset}
 className="px-6 py-2 bg-orange-600 text-black rounded-lg font-semibold hover:bg-orange-700 transition-colors"
 >
 {t.tryAgain}
 </Button>
 <Button
 variant="default"
 onClick={() => {
 window.location.href = `/${locale}`;
 }}
 className="px-6 py-2 text-gray-800 rounded-lg font-semibold hover:bg-accent300 transition-colors"
 >
 {t.goHome}
 </Button>
 </motion.div>
 </div>
 </div>
 );
}
