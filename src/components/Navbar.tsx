"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, User, ShoppingBag } from 'lucide-react';
import { useNavbarState } from '@/hooks/useNavbarState';

export default function Navbar() {
  const {
    t,
    locale,
    user,
    isAuthenticated,
    isMenuOpen,
    setIsMenuOpen,
    isScrolled,
    totalItems,
    navItems,
    getDashboardUrl,
    isActiveLink,
  } = useNavbarState();

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 w-full max-w-6xl border rounded-xl backdrop-blur-md ${isScrolled
              ? 'bg-background/80 border-border shadow-sm'
              : 'bg-background/40 border-transparent shadow-none'
            }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Search className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-foreground">
              Lupa<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop Nav - Minimalist */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-black uppercase tracking-widest transition-colors relative py-1 ${isActiveLink(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
                {isActiveLink(item.href) && (
                  <motion.div layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Outline Style */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {isAuthenticated && user ? (
              <Link
                href={getDashboardUrl()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors border-2 border-border rounded-lg hover:bg-card"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{user.fullName || user.email}</span>
              </Link>
            ) : (
              <>
                <Link
                  href={`/${locale}/auth/login`}
                  className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-foreground transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  className="px-5 py-2 text-xs font-black uppercase tracking-widest border-2 border-border text-card-foreground rounded-lg hover:bg-card hover:text-primary transition-all inline-block"
                >
                  {t('signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-card-foreground"
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
            className="fixed inset-0 z-[60] bg-card flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter uppercase">{t('menu')}</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 border-2 border-border border-border rounded-full">
                <X className="text-card-foreground" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors text-card-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/cart`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors text-card-foreground flex items-center gap-4"
              >
                {t('cart')}
                {totalItems > 0 && (
                  <span className="bg-primary text-primary-foreground text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              {isAuthenticated && user ? (
                <Link
                  href={getDashboardUrl()}
                  className="w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-primary bg-primary/10 text-primary rounded-xl text-center flex items-center justify-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span className="truncate max-w-[200px]">{user.fullName || user.email}</span>
                </Link>
              ) : (
                <>
                  <Link
                    href={`/${locale}/auth/login`}
                    className="w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-border text-card-foreground rounded-xl text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`/${locale}/auth/register`}
                    className="w-full py-4 text-sm font-black uppercase tracking-widest bg-card text-black rounded-xl text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}