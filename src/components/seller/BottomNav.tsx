'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useNavigation } from '@/hooks/useNavigation';

export function BottomNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const { sellerNavigation } = useNavigation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card border-border bg-card-dark">
        <div className="flex flex-col justify-between h-full p-4">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2">
              <div className="size-10 bg-primary text-card-foreground rounded-full flex items-center justify-center ring-2 ring-primary-light/20 ring-gray-700">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold leading-normal text-primary text-card-foreground">LupaShop</h1>
                <p className="text-sm font-normal text-text-sub-light text-text-sub-dark">Painel do Parceiro</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {sellerNavigation.map((item) => {
                const isActive = pathname === `/${locale}${item.href}`;
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-card-foreground shadow-md shadow-primary/20'
                        : 'hover:bg-muted hover:bg-gray-700/50 text-text-main-light text-text-main-dark'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[20px] ${
                      isActive ? '' : 'text-muted-foreground group-hover:text-primary text-muted-foreground'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium leading-normal">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive/100 text-[10px] font-bold text-card-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-col gap-2 border-t border-border border-border pt-4">
            <Link
              href={`/${locale}/seller/help`}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted hover:bg-gray-700/50 text-text-sub-light text-text-sub-dark transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="text-sm font-medium leading-normal">Ajuda & Suporte</span>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = `/${locale}`;
              }}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 hover:bg-red-900/10 text-destructive text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="text-sm font-medium leading-normal">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Pill Style */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
        <div className="bg-card bg-card-dark rounded-full shadow-2xl border border-border border-border px-2 py-2">
          <nav className="flex items-center justify-around gap-1">
            {sellerNavigation.map((item) => {
              const isActive = pathname === `/${locale}${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-primary text-card-foreground shadow-lg shadow-primary/30'
                      : 'text-muted-foreground text-muted-foreground hover:bg-muted hover:bg-gray-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive/100 text-[9px] font-bold text-card-foreground ring-2 ring-white ring-card-dark">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
