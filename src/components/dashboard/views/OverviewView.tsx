'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import StatCard from '@/components/dashboard/StatCard';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import { useAuthStore } from '@/stores/authStore';
import { fetchDashboardStats } from '@/lib/dashboard';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  activeProducts: number;
}

export default function OverviewView() {
  const t = useTranslations('dashboard');
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    activeProducts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statItems = [
    {
      icon: 'trending_up',
      label: t('stats.totalSales'),
      value: `AOA ${stats.totalSales.toLocaleString()}`,
      change: '+12.5%',
      color: 'bg-blue-500',
      isPositive: true,
    },
    {
      icon: 'shopping_cart',
      label: t('stats.totalOrders'),
      value: stats.totalOrders.toString(),
      change: '+8 today',
      color: 'bg-orange-500',
      isPositive: true,
    },
    {
      icon: 'inventory_2',
      label: t('stats.totalProducts'),
      value: stats.totalProducts.toString(),
      change: `${stats.activeProducts} active`,
      color: 'bg-green-500',
      isPositive: true,
    },
    {
      icon: 'star',
      label: t('stats.averageRating'),
      value: '4.8',
      change: 'from 120 reviews',
      color: 'bg-yellow-500',
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          {t('welcome', { name: user?.name || 'Seller' })}
        </h1>
        <p className="text-gray-600 mt-2">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} isLoading={isLoading} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('salesChart.title')}
          </h3>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <span className="material-icons text-6xl opacity-30">trending_up</span>
              <p className="mt-2">Gráficos de vendas</p>
              <p className="text-sm text-gray-400">Integrado com dados do backend</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('topProducts.title')}
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Produto #{i}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 100)} vendas
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  Top {i}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RecentOrdersTable />
      </motion.div>
    </div>
  );
}
