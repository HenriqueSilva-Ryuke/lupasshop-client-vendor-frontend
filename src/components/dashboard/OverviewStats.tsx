'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { DollarSign, ShoppingBag, Package, Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function OverviewStats() {
    const t = useTranslations('dashboard.stats');

    const stats = [
        {
            label: t('totalSales'),
            value: '2,450,000 AOA',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            label: t('totalOrders'),
            value: '1,250',
            change: '+5.2%',
            trend: 'up',
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            label: t('totalProducts'),
            value: '45',
            change: '0%',
            trend: 'neutral',
            icon: Package,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
        {
            label: t('averageRating'),
            value: '4.8',
            change: '-0.1%',
            trend: 'down',
            icon: Star,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-card p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                            }`}>
                            {stat.trend === 'up' ? <TrendingUp size={16} /> : stat.trend === 'down' ? <TrendingDown size={16} /> : null}
                            {stat.change}
                        </div>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
