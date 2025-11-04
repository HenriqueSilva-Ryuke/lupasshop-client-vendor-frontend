'use client';

import { motion } from 'motion/react';

export default function AuthIllustration() {
  return (
    <div className="hidden lg:flex items-center justify-center w-1/2 bg-linear-to-br from-primary/10 to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ top: '-100px', left: '-100px' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ bottom: '-50px', right: '-50px' }}
      />

      {/* Main Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-8 max-w-md"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Bem-vindo ao LupaShop
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Junte-se à nossa comunidade de vendedores e compradores. 
            Compre no marketplace integrado ou gerencie sua loja parceira.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="mt-12 space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + item * 0.1 }}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-gray-600">
                {item === 1 && '500+ Lojas Parceiras'}
                {item === 2 && '50K+ Produtos'}
                {item === 3 && '100K+ Clientes'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
