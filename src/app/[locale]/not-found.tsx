'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 mb-4">
            404
          </h1>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🔍
          </motion.div>
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
              Página não encontrada
            </h2>
            <p className="text-gray-600 text-lg">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
          </div>

          {/* Illustration - Floating Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="py-8"
          >
            <div className="relative h-32">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute left-10 w-12 h-12 bg-primary200 rounded-lg"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute right-10 w-12 h-12 bg-indigo-200 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${locale}`}
                className="inline-block px-8 py-3 bg-primary600 text-black rounded-lg font-semibold hover:bg-primary700 transition-colors shadow-lg"
              >
                Ir para Home
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="inline-block px-8 py-3 text-primary rounded-lg font-semibold border-2 border-primary600 hover:bg-primary50 transition-colors"
              >
                Voltar
              </button>
            </motion.div>
          </div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-4 border-t border-gray-300"
          >
            <p className="text-sm text-gray-500">
              Código do erro: <span className="font-mono font-semibold">404 NOT_FOUND</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
