'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type DashboardView = 
  | 'overview' 
  | 'shops' 
  | 'products' 
  | 'orders' 
  | 'finances' 
  | 'reviews' 
  | 'settings';

interface DashboardNavigationProps {
  onMenuClick: () => void;
  currentView: DashboardView;
}

export default function DashboardNavigation({
  onMenuClick,
  currentView,
}: DashboardNavigationProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { user, logout } = useClientAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/auth/login`);
  };

  const getTitleForView = (view: DashboardView): string => {
    const titles: Record<DashboardView, string> = {
      overview: t('dashboard.nav.overview'),
      shops: t('dashboard.nav.shops'),
      products: t('dashboard.nav.products'),
      orders: t('dashboard.nav.orders'),
      finances: t('dashboard.nav.finances'),
      reviews: t('dashboard.nav.reviews'),
      settings: t('dashboard.nav.settings'),
    };
    return titles[view] || 'Dashboard';
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border sticky top-0 z-20"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Side - Menu + Title */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="material-icons text-muted-foreground">menu</span>
          </motion.button>
          <h2 className="text-xl font-semibold text-foreground">
            {getTitleForView(currentView)}
          </h2>
        </div>

        {/* Right Side - Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="material-icons text-muted-foreground">notifications</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 bg-destructive/100 rounded-full"
            />
          </motion.button>

          {/* Language Switcher */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-1 px-3 py-2 hover:bg-muted rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {locale.toUpperCase()}
            </span>
          </motion.div>

          {/* Profile Dropdown */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <span className="text-black text-sm font-bold">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.fullName || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
            </div>
            <span className="material-icons text-muted-foreground text-xl group-hover:rotate-180 transition-transform">
              expand_more
            </span>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
            title="Logout"
          >
            <span className="material-icons">logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
