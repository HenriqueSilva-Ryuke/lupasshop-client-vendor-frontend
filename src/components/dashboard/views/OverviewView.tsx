'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client/react';
import StatCard from '@/components/dashboard/StatCard';
import RecentOrdersTable, { type RecentOrderItem } from '@/components/dashboard/RecentOrdersTable';
import { useClientAuth } from '@/hooks/useClientAuth';
import { GET_SELLER_DASHBOARD } from '@/graphql/queries';

export default function OverviewView() {
  const t = useTranslations('dashboard');
  const { user } = useClientAuth();

  const { data, loading } = useQuery(GET_SELLER_DASHBOARD, {
    variables: { days: 30, recentLimit: 6, topLimit: 5 },
    fetchPolicy: 'cache-and-network',
  });

  const dashboard = data?.getSellerDashboard;
  const stats = dashboard?.stats || {
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    activeProducts: 0,
    averageRating: 0,
  };

  const recentOrders: RecentOrderItem[] = (dashboard?.recentOrders || []).map((order: any) => ({
    id: order.id,
    amount: order.totalAmount,
    status: order.status,
    date: order.createdAt,
    customer: order.user ? { name: order.user.fullName, email: order.user.email } : undefined,
  }));

  const statItems = [
    {
      icon: 'trending_up',
      label: t('stats.totalSales'),
      value: `AOA ${stats.totalSales.toLocaleString()}`,
      change: `${stats.totalOrders} pedidos`,
      color: 'bg-blue-500',
      isPositive: true,
    },
    {
      icon: 'shopping_cart',
      label: t('stats.totalOrders'),
      value: stats.totalOrders.toString(),
      change: `${stats.activeProducts} ativos`,
      color: 'bg-orange-500',
      isPositive: true,
    },
    {
      icon: 'inventory_2',
      label: t('stats.totalProducts'),
      value: stats.totalProducts.toString(),
      change: `${stats.activeProducts} ativos`,
      color: 'bg-green-500',
      isPositive: true,
    },
    {
      icon: 'star',
      label: t('stats.averageRating'),
      value: stats.averageRating.toFixed(1),
      change: t('stats.averageRating'),
      color: 'bg-yellow-500',
      isPositive: true,
    },
  ];

  const topProducts = dashboard?.topProducts || [];
  const salesByDay = dashboard?.salesByDay || [];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          {t('welcome', { name: user?.fullName || 'Seller' })}
        </h1>
        <p className="text-gray-600 mt-2">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} isLoading={loading} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('salesChart.title')}
          </h3>
          {salesByDay.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-400">
              {t('salesChart.empty') || 'Sem dados no período selecionado'}
            </div>
          ) : (
            <div className="space-y-3">
              {salesByDay.slice(-7).map((day: any) => (
                <div key={day.date} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{new Date(day.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-gray-900">AOA {day.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('topProducts.title')}
          </h3>
          {topProducts.length === 0 ? (
            <div className="text-sm text-gray-500">Sem produtos no período</div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Top {index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RecentOrdersTable orders={recentOrders} isLoading={loading} />
      </motion.div>
    </div>
  );
}
