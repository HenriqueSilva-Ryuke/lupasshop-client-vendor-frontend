'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Skeleton from '@/components/ui/Skeleton';

interface Order {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
  onViewDetails: (order: Order) => void;
}

const statusIcons = {
  pending: { icon: 'schedule', color: 'text-yellow-600' },
  confirmed: { icon: 'check_circle', color: 'text-blue-600' },
  shipped: { icon: 'local_shipping', color: 'text-purple-600' },
  delivered: { icon: 'done_all', color: 'text-green-600' },
};

export default function OrdersList({
  orders,
  isLoading,
  onViewDetails,
}: OrdersListProps) {
  const t = useTranslations('dashboard');
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} type="card" height="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onViewDetails(order)}
          className="p-4 border border-border rounded-lg hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{t('orders.orderNumber')}{order.number}</h3>
              <p className="text-sm text-muted-foreground">{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">AOA {order.amount.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`material-icons text-sm ${statusIcons[order.status].color}`}>
                  {statusIcons[order.status].icon}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
