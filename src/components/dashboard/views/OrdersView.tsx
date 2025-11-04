'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import OrdersList from '@/components/dashboard/OrdersList';

interface Order {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export default function OrdersView() {
  const t = useTranslations('dashboard');
  const [orders] = useState<Order[]>([
    { id: '1', number: '001', customer: 'João Silva', amount: 450.50, status: 'delivered', date: '2024-11-01' },
    { id: '2', number: '002', customer: 'Maria Santos', amount: 1250, status: 'shipped', date: '2024-11-02' },
    { id: '3', number: '003', customer: 'Pedro Costa', amount: 890, status: 'confirmed', date: '2024-11-03' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.orders')}</h1>
        <p className="text-gray-600 mt-1">{t('orders.manage')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <OrdersList
          orders={orders}
          isLoading={false}
          onViewDetails={(order) => {
            setSelectedOrder(order);
            setIsModalOpen(true);
          }}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOrder ? `${t('orders.orderNumber')}${selectedOrder?.number}` : t('orders.orderDetails')}
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Cliente</label><p>{selectedOrder.customer}</p></div>
            <div><label className="text-sm font-medium">Valor</label><p>AOA {selectedOrder.amount.toFixed(2)}</p></div>
            <div><label className="text-sm font-medium">Data</label><p>{selectedOrder.date}</p></div>
            <div><label className="text-sm font-medium">Status</label><p className="capitalize">{selectedOrder.status}</p></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
