'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { User, ShoppingBag, MapPin, Heart, CreditCard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    {
        icon: User,
        label: 'Meu Perfil',
        href: '/user/profile',
    },
    {
        icon: ShoppingBag,
        label: 'Meus Pedidos',
        href: '/user/orders',
    },
    {
        icon: MapPin,
        label: 'Endereços',
        href: '/user/addresses',
    },
    {
        icon: Heart,
        label: 'Lista de Desejos',
        href: '/user/wishlist',
    },
    {
        icon: CreditCard,
        label: 'Cartões e Pagamentos',
        href: '/user/finances',
    },
];

export function UserSidebar() {
    const pathname = usePathname();
    const locale = useLocale();

    return (
        <div className="w-full md:w-64 flex flex-col gap-2 bg-card rounded-xl shadow-sm border border-gray-100 p-4 h-fit">

            <div className="mb-4 px-2">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Minha Conta</h2>
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

                <div className="my-2 border-t border-gray-100" />

                <button
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    onClick={() => console.log('Logout')}
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </nav>
        </div>
    );
}
