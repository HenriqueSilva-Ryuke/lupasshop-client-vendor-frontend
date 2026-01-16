"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, User, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      setIsScrolled(currentY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 w-full max-w-6xl border rounded-xl backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] ${
            isScrolled
              ? 'bg-white/80 dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-800'
              : 'bg-white/40 dark:bg-transparent border-transparent'
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Search className="w-5 h-5 text-white dark:text-black" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase dark:text-white">
              Lupa<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop Nav - Minimalist */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-black uppercase tracking-widest transition-colors relative py-1 ${
                  isActiveLink(item.href)
                    ? 'text-white'
                    : 'text-white hover:text-primary'
                }`}
              >
                {item.label}
                {isActiveLink(item.href) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Outline Style */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {t('login')}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-xs font-black uppercase tracking-widest border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              {t('signup')}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-zinc-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu - Disruptive Fullscreen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-zinc-950 flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter uppercase dark:text-white">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 border-2 border-zinc-900 dark:border-white rounded-full">
                <X className="dark:text-white"/>
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors dark:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <button className="w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-zinc-900 dark:border-white dark:text-white rounded-xl">
                {t('login')}
              </button>
              <button className="w-full py-4 text-sm font-black uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-black rounded-xl">
                {t('signup')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}