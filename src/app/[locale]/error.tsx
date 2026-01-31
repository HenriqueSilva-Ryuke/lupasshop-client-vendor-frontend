'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

interface ErrorProps {
 error: Error & { digest?: string };
 reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
 const locale = useLocale();

 useEffect(() => {
 // Log error to monitoring service (e.g., Sentry)
 console.error('Application error:', error);
 }, [error]);

 return (
 <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
 <div className="max-w-lg w-full">
 {/* Animated Error Icon */}
 <motion.div
 initial={{ scale: 0, rotate: -180, opacity: 0 }}
 animate={{ scale: 1, rotate: 0, opacity: 1 }}
 transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
 className="text-center mb-8"
 >
 <div className="inline-block">
 <motion.div
 animate={{ y: [0, -10, 0] }}
 transition={{ duration: 2, repeat: Infinity }}
 className="text-7xl"
 >
 ⚠️
 </motion.div>
 </div>
 </motion.div>

 {/* Content */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="text-center space-y-6"
 >
 <div>
 <h2 className="text-3xl font-bold mb-3">
 Algo deu errado!
 </h2>
 <p className="text-gray-600 text-lg">
 Desculpe, encontramos um erro inesperado. Estamos trabalhando para corrigi-lo.
 </p>
 </div>

 {/* Error Details - Development Only */}
 {process.env.NODE_ENV === 'development' && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="bg-red-100 border border-red-300 rounded-lg p-4 text-left"
 >
 <p className="text-sm font-mono text-red-800 mb-2">
 <strong>Erro:</strong>
 </p>
 <p className="text-xs font-mono text-red-700 wrap-break-word overflow-auto max-h-32 bg-destructive/10 p-2 rounded">
 {error.message}
 </p>
 {error.digest && (
 <p className="text-xs text-destructive mt-2">
 <strong>Digest:</strong> {error.digest}
 </p>
 )}
 </motion.div>
 )}

 {/* Illustration - Broken Elements */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="py-8"
 >
 <div className="relative h-32 flex items-center justify-center">
 <motion.div
 animate={{ rotate: [0, -5, 5, 0] }}
 transition={{ duration: 2, repeat: Infinity }}
 className="w-16 h-16 bg-red-200 rounded-lg border-4 border-red-400"
 />
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 3, repeat: Infinity }}
 className="absolute w-12 h-12 border-4 border-transparent border-t-orange-400 rounded-full"
 />
 </div>
 </motion.div>

 {/* CTA Buttons */}
 <div className="flex gap-4 justify-center pt-4 flex-wrap">
 <Button
 variant="default"
 onClick={reset}
 className="inline-block px-8 py-3 bg-orange-600 text-black rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
 >
 Tentar Novamente
 </Button>
 <motion.div
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 >
 <Link
 href={`/${locale}`}
 className="inline-block px-8 py-3 text-orange-600 rounded-lg font-semibold border-2 border-orange-600 hover:bg-orange-50 transition-colors"
 >
 Ir para Home
 </Link>
 </motion.div>
 </div>

 {/* Support Info */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.6 }}
 className="pt-4 border-t space-y-2"
 >
 <p className="text-sm text-gray-600">
 Se o problema persistir, tente:
 </p>
 <ul className="text-sm space-y-1">
 <li>✓ Limpar o cache do navegador</li>
 <li>✓ Recarregar a página</li>
 <li>✓ Entrar em contato com o suporte</li>
 </ul>
 </motion.div>
 </motion.div>
 </div>
 </div>
 );
}
