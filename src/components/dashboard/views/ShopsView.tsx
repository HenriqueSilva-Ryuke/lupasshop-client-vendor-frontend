'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import ShopsList from '@/components/dashboard/ShopsList';
import AddButton, { AddButtonMobile } from '@/components/dashboard/AddButton';

interface Shop {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
}

export default function ShopsView() {
  const t = useTranslations('dashboard');
  const [shops, setShops] = useState<Shop[]>([
    { id: '1', name: 'Loja A', email: 'loja@a.com', phone: '244123456', status: 'active' },
    { id: '2', name: 'Loja B', email: 'loja@b.com', phone: '244654321', status: 'active' },
  ]);
  const [isLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleAdd = () => {
    setFormData({ name: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (formData.name && formData.email && formData.phone) {
      const newShop: Shop = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
      };
      setShops([...shops, newShop]);
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setShops(shops.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.shops')}</h1>
          <p className="text-gray-600 mt-1">{t('shops.manage')}</p>
        </div>
        <AddButton label={t('common.add')} onClick={handleAdd} icon="add" />
      </motion.div>
      <AddButtonMobile onClick={handleAdd} icon="add" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShopsList
          shops={shops}
          isLoading={isLoading}
          onEdit={(shop) => {
            setFormData(shop);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('shops.newShop')}
        size="md"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t('common.save')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
