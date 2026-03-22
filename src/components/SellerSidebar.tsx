'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { LayoutDashboard, Package, ShoppingCart, Settings, Users, LogOut, PlusCircle, BarChart3, Wallet, Share2, Boxes } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import Button from './ui/Button';

export function SellerSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('seller');
  const { logout } = useAuth();

  const sellerItems = [
    { icon: LayoutDashboard, label: t('overview'), href: '/seller/dashboard' },
    { icon: Package, label: t('myProducts'), href: '/seller/products' },
    { icon: Boxes, label: t('stock'), href: '/seller/stock' },
    { icon: ShoppingCart, label: t('orders'), href: '/seller/orders' },
    { icon: Users, label: t('customers'), href: '/seller/customers' },
    { icon: BarChart3, label: t('reports'), href: '/seller/reports' },
    { icon: Wallet, label: t('finances'), href: '/seller/finances' },
    { icon: Share2, label: t('social'), href: '/seller/social' },
    { icon: Settings, label: t('storeSettings'), href: '/seller/settings' },
  ];

  return (
    <div className="w-full md:w-64 flex flex-col gap-2 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 h-fit">
      <div className="mb-4 px-2">
        <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('sellerPanel')}</h2>
      </div>

      <div className="mb-6">
        <Link href={`/${locale}/seller/products/new`}>
          <Button variant="default" className="w-full flex items-center justify-center gap-2">
            <PlusCircle size={18} />
            {t('newProduct')}
          </Button>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {sellerItems.map((item) => {
          const href = `/${locale}${item.href}`;
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400 dark:text-slate-500")} />
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </nav>
    </div>
  );
}
