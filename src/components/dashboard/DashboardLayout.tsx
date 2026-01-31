'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
    Menu,
    X,
    LogOut,
    Store,
    Bell,
    User,
    DollarSign,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
    currentView,
    onViewChange
}: {
    children: React.ReactNode;
    currentView: string;
    onViewChange: (view: string) => void;
}) {
    const t = useTranslations('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { id: 'overview', label: t('nav.overview'), icon: LayoutDashboard },
        { id: 'products', label: t('nav.products'), icon: Package },
        { id: 'orders', label: t('nav.orders'), icon: ShoppingBag },
        { id: 'finances', label: t('nav.finances'), icon: DollarSign },
        { id: 'reviews', label: t('nav.reviews'), icon: Star },
        { id: 'settings', label: t('nav.settings'), icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-muted flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Store className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-bold text-xl text-foreground">LupaShop</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const active = currentView === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onViewChange(item.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
                                        ? 'bg-primary text-black shadow-lg shadow-primary/25'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    <item.icon size={20} className={active ? 'text-black' : 'text-muted-foreground group-hover:text-muted-foreground'} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl transition-colors">
                            <LogOut size={20} />
                            <span className="font-medium">{t('common.logout')}</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive/100 rounded-full border-2 border-border"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-foreground">Store Owner</p>
                                <p className="text-xs text-muted-foreground">store@lupashop.com</p>
                            </div>
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center border-2 border-border shadow-sm">
                                <User size={20} className="text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
