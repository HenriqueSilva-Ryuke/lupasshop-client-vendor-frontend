'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
 return (
 <div className="bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
 <div className="max-w-lg w-full p-6 text-center space-y-8">
 {/* 404 Text */}
 <motion.div
 initial={{ scale: 0, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 0.5 }}
 >
 <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 mb-4">
 404
 </h1>
 <motion.div
 animate={{ y: [0, -10, 0] }}
 transition={{ duration: 2, repeat: Infinity }}
 className="text-6xl"
 >
 🔍
 </motion.div>
 </motion.div>

 {/* Message */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="space-y-4"
 >
 <h2 className="text-3xl font-bold text-gray-900">
 Página não encontrada
 </h2>
 <p className="text-gray-600 text-lg">
 A página que você procura não existe.
 </p>
 </motion.div>

 {/* Buttons */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="flex gap-4 justify-center flex-wrap"
 >
 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
 <Link
 href="/"
 className="inline-block px-8 py-3 bg-primary600 text-black rounded-lg font-semibold hover:bg-primary700 transition-colors shadow-lg"
 >
 Home
 </Link>
 </motion.div>
 <Button
 variant="default"
 onClick={() => window.history.back()}
 className="px-8 py-3 text-primary rounded-lg font-semibold border-2 border-primary600 hover:bg-primary50 transition-colors"
 >
 Voltar
 </Button>
 </motion.div>
 </div>
 </div>
 );
}
