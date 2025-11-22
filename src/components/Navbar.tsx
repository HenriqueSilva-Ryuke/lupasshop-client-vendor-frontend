"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove locale do pathname para comparação
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const isActiveLink = (href: string) => {
    const hrefWithoutLocale = href.replace(`/${locale}`, '') || '/';
    return pathWithoutLocale === hrefWithoutLocale;
  };

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/marketplace`, label: 'Marketplace' },
    { href: `/${locale}/about`, label: t('about') }
  ];

  return (
    <>
      <motion.nav
        className={`sticky top-4 z-50 transition-all duration-500 w-fit mx-auto left-0 right-0 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl rounded-full border border-white/20'
          : 'bg-transparent'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-6">
            {/* Logo - Lupa Interativa */}
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className={`relative p-3 rounded-full transition-all duration-500 ${isScrolled
                  ? 'bg-primary shadow-lg'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
                  }`}>
                  <svg
                    className={`w-6 h-6 transition-all duration-500 ${isScrolled ? 'text-white' : 'text-gray-800'
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${isScrolled ? 'border-primary-light' : 'border-white/30'
                      }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className={`text-lg font-bold transition-all duration-500 ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                  LupaShop
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActiveLink(item.href)
                      ? 'bg-primary text-white shadow-lg'
                      : isScrolled
                        ? 'text-gray-600 hover:text-white hover:bg-primary'
                        : 'text-white/80 hover:text-white hover:bg-primary/80'
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${isScrolled
                  ? 'text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                  : 'text-white/80 border-white/30 hover:border-white/50 hover:text-white'
                  }`}
              >
                {t('login')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isScrolled
                  ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                  }`}
              >
                {t('signup')}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${isScrolled
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-gray-900">LupaShop</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2 flex-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${isActiveLink(item.href)
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full py-3 px-4 text-base font-medium text-gray-700 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-900 transition-all duration-200"
                  >
                    {t('login')}
                  </motion.button>
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full py-3 px-4 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg"
                  >
                    {t('signup')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}