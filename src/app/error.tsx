'use client';

import { motion } from 'motion/react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Root error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-linear-to-br from-red-900 to-orange-900 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-2xl">
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
              Erro Crítico
            </h1>
            <p className="text-gray-600">
              Algo deu muito errado. Por favor, tente recarregar a página.
            </p>

            {/* Error Details */}
            {process.env.NODE_ENV === 'development' && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-red-50 border border-red-200 rounded p-3 text-left"
              >
                <p className="text-xs font-mono text-red-700 wrap-break-word">
                  {error.message}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="px-6 py-2 bg-orange-600 text-black rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Tentar Novamente
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
