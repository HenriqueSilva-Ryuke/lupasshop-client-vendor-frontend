'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { User, ShoppingBag, MapPin, Heart, CreditCard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserSidebar() {
 const pathname = usePathname();
 const locale = useLocale();
 const t = useTranslations('user');

 const sidebarItems = [
 {
 icon: User,
 label: t('myProfile'),
 href: '/user/profile',
 },
 {
 icon: ShoppingBag,
 label: t('myOrders'),
 href: '/user/orders',
 },
 {
 icon: MapPin,
 label: t('addresses'),
 href: '/user/addresses',
 },
 {
 icon: Heart,
 label: t('wishlist'),
 href: '/user/wishlist',
 },
 {
 icon: CreditCard,
 label: t('cardsPayments'),
 href: '/user/finances',
 },
 ];

 return (
 <div className="w-full md:w-64 flex flex-col gap-2 bg-card rounded-xl shadow-sm border p-4 h-fit">

 <div className="mb-4 px-2">
 <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('myAccount')}</h2>
 </div>

 <nav className="flex flex-col gap-1">
 {sidebarItems.map((item) => {
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
 : "text-muted-foreground hover:bg-muted hover:text-black"
 )}
 >
 <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
 {item.label}
 </Link>
 );
 })}

 <div className="my-2 border-t" />

 <button
 className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
 onClick={() => console.log('Logout')}
 >
 <LogOut className="w-4 h-4" />
 {t('logout')}
 </button>
 </nav>
 </div>
 );
}
