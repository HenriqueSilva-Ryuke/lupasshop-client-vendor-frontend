'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export interface RecentOrderItem {
  id: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  date: string;
  customer?: {
    name: string;
    email: string;
  };
}

export default function RecentOrdersTable({ orders, isLoading }: { orders: RecentOrderItem[]; isLoading: boolean }) {
  const t = useTranslations('dashboard');

  const statusConfig = {
    PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    PAID: { label: 'Paid', color: 'bg-primary100 text-blue-800' },
    SHIPPED: { label: 'Shipped', color: 'bg-primary100 text-primary800' },
    DELIVERED: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  } as const;

  const statusIcons = {
    PENDING: 'schedule',
    PAID: 'check_circle',
    SHIPPED: 'local_shipping',
    DELIVERED: 'done_all',
    CANCELLED: 'cancel',
  } as const;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          {t('recentOrders.title')}
        </h3>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  {t('recentOrders.orderNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  {t('recentOrders.customer')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground">
                  {t('recentOrders.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  {t('recentOrders.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
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
                  className="border-b border-border hover:bg-muted transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">
                      #{order.id.slice(0, 8)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {order.customer?.name || '—'}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">
                    AOA {order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`material-icons text-sm ${statusConfig[order.status].color}`}>
                        {statusIcons[order.status]}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 bg-muted border-t border-border">
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
