import { useTranslations } from 'next-intl';

export interface DashboardNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export function useDashboardNavigation() {
  const t = useTranslations('dashboard');

  const navItems: DashboardNavItem[] = [
    {
      id: 'overview',
      label: t('nav.overview'),
      icon: 'dashboard',
      href: '#overview',
    },
    {
      id: 'shops',
      label: t('nav.shops'),
      icon: 'storefront',
      href: '#shops',
    },
    {
      id: 'products',
      label: t('nav.products'),
      icon: 'inventory_2',
      href: '#products',
    },
    {
      id: 'orders',
      label: t('nav.orders'),
      icon: 'shopping_cart',
      href: '#orders',
    },
    {
      id: 'finances',
      label: t('nav.finances'),
      icon: 'payments',
      href: '#finances',
    },
    {
      id: 'reviews',
      label: t('nav.reviews'),
      icon: 'rate_review',
      href: '#reviews',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: 'settings',
      href: '#settings',
    },
  ];

  return { navItems };
}
