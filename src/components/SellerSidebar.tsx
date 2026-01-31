'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { LayoutDashboard, Package, ShoppingCart, Settings, Users, LogOut, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './ui/Button';

const sellerItems = [
 {
 icon: LayoutDashboard,
 label: 'Visão Geral',
 href: '/seller/dashboard',
 },
 {
 icon: Package,
 label: 'Meus Produtos',
 href: '/seller/products',
 },
 {
 icon: ShoppingCart,
 label: 'Pedidos',
 href: '/seller/orders',
 },
 {
 icon: Settings,
 label: 'Configurações da Loja',
 href: '/seller/settings',
 },
];

export function SellerSidebar() {
 const pathname = usePathname();
 const locale = useLocale();

 return (
 <div className="w-full md:w-64 flex flex-col gap-2 bg-card text-card-foreground border-r border-border h-screen sticky top-0 md:h-auto md:min-h-screen p-4">

 <div className="mb-8 px-2 pt-4">
 <h2 className="text-xl font-black tracking-tight text-foreground">Lupa<span className="text-primary">Seller</span></h2>
 <p className="text-xs text-muted-foreground mt-1">Painel do Parceiro</p>
 </div>

 <div className="px-2 mb-6">
 <Link href={`/${locale}/seller/products/new`}>
 <Button className="w-full justify-start gap-2">
 <PlusCircle className="w-4 h-4" />
 Novo Produto
 </Button>
 </Link>
 </div>

 <nav className="flex flex-col gap-1 flex-1">
 {sellerItems.map((item) => {
 const href = `/${locale}${item.href}`;
 const isActive = pathname.startsWith(href);

 return (
 <Link
 key={item.href}
 href={href}
 className={cn(
 "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
 isActive
 ? "bg-primary/10 text-primary font-semibold"
 : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
 )}
 >
 <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
 {item.label}
 </Link>
 );
 })}
 </nav>

 <div className="mt-auto border-t border-border pt-4">
 <button
 className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
 onClick={() => console.log('Logout')}
 >
 <LogOut className="w-4 h-4" />
 Sair da Loja
 </button>
 </div>
 </div>
 );
}
