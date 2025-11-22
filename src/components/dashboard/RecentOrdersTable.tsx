'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { fetchRecentOrders } from '@/lib/dashboard';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export default function RecentOrdersTable() {
  const t = useTranslations('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchRecentOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load recent orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  };

  const statusIcons = {
    pending: 'schedule',
    confirmed: 'check_circle',
    shipped: 'local_shipping',
    delivered: 'done_all',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('recentOrders.title')}
        </h3>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  {t('recentOrders.orderNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  {t('recentOrders.customer')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                  {t('recentOrders.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  {t('recentOrders.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                  {t('recentOrders.date')}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    AOA {order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`material-icons text-sm ${
                        statusConfig[order.status].color
                      }`}>
                        {statusIcons[order.status]}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusConfig[order.status].color
                      }`}>
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-primary font-semibold text-sm hover:underline"
        >
          {t('recentOrders.viewAll')} →
        </motion.button>
      </div>
    </div>
  );
}
