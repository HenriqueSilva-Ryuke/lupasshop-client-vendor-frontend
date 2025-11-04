"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingMagnifier = ({ delay, size, position }: { delay: number; size: number; position: { x: string; y: string } }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        rotate: [-45, 0, 45],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </motion.div>
  );

  const magnifiers = [
    { delay: 0, size: 40, position: { x: '10%', y: '20%' } },
    { delay: 1, size: 30, position: { x: '80%', y: '30%' } },
    { delay: 2, size: 50, position: { x: '20%', y: '70%' } },
    { delay: 3, size: 35, position: { x: '70%', y: '60%' } },
    { delay: 4, size: 45, position: { x: '85%', y: '15%' } },
    { delay: 5, size: 25, position: { x: '15%', y: '85%' } },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-primary to-primary/40">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating Magnifiers */}
      {magnifiers.map((mag, index) => (
        <FloatingMagnifier 
          key={index}
          delay={mag.delay}
          size={mag.size}
          position={mag.position}
        />
      ))}

      {/* Animated Search Beam */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title with Magnifier Integration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <motion.div
              className="mr-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-blue-200">
              {t('title')}
            </h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto text-blue-100 font-light leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto"
        >
          {[
            { label: t('stats.partnerStores'), value: '100+' },
            { label: t('stats.products'), value: '10K+' },
            { label: t('stats.customers'), value: '50K+' },
            { label: t('stats.deliveries'), value: '1M+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {t('shopNow')}
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-blue-50 to-gray-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:border-white/50 transition-all duration-300"
          >
            <span className="flex items-center">
              {t('joinStore')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}