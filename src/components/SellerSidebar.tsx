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
        <div className="w-full md:w-64 flex flex-col gap-2 bg-gray-900 text-white shadow-xl h-screen sticky top-0 md:h-auto md:min-h-screen p-4">

            <div className="mb-8 px-2 pt-4">
                <h2 className="text-xl font-black text-white tracking-tight">Lupa<span className="text-primary">Seller</span></h2>
                <p className="text-xs text-gray-400 mt-1">Painel do Parceiro</p>
            </div>

            <div className="px-2 mb-6">
                <Link href={`/${locale}/seller/products/new`}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white border-none justify-start gap-2">
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
                                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/5"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-500")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-gray-800 pt-4">
                <button
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                    onClick={() => console.log('Logout')}
                >
                    <LogOut className="w-4 h-4" />
                    Sair da Loja
                </button>
            </div>
        </div>
    );
}
