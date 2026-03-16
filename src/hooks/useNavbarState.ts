'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardUrlByRole, isLocaleRouteActive } from '@/utils/navbar';

export function useNavbarState() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      setIsScrolled(currentY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/marketplace`, label: t('marketplace') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  const getDashboardUrl = () => getDashboardUrlByRole(locale, user?.role);
  const isActiveLink = (href: string) => isLocaleRouteActive(pathname, href, locale);

  return {
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
  };
}
