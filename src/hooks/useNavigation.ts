'use client';

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface NavigationGroup {
  items: NavigationItem[];
}

export function useNavigation() {
  const sellerNavigation: NavigationItem[] = [
    {
      label: 'Dashboard',
      href: '/seller/dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Produtos',
      href: '/seller/products',
      icon: 'inventory_2',
    },
    {
      label: 'Pedidos',
      href: '/seller/orders',
      icon: 'shopping_cart',
      badge: 3,
    },
    {
      label: 'Financeiro',
      href: '/seller/finances',
      icon: 'payments',
    },
    {
      label: 'Configurações',
      href: '/seller/settings',
      icon: 'settings',
    },
  ];

  const sidebarNavigation: NavigationItem[] = [
    ...sellerNavigation.slice(0, -1), // All except settings
    {
      label: 'Clientes',
      href: '/seller/customers',
      icon: 'group',
    },
    {
      label: 'Marketing',
      href: '/seller/marketing',
      icon: 'campaign',
    },
    {
      label: 'Configurações',
      href: '/seller/settings',
      icon: 'settings',
    },
  ];

  return {
    sellerNavigation,
    sidebarNavigation,
  };
}
