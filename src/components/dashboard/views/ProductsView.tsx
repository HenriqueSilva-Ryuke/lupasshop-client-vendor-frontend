'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import ProductsList from '@/components/dashboard/ProductsList';
import AddButton, { AddButtonMobile } from '@/components/dashboard/AddButton';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

export default function ProductsView() {
  const t = useTranslations('dashboard');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Produto A', price: 50, stock: 100, category: 'Eletrônicos', status: 'active' },
    { id: '2', name: 'Produto B', price: 150, stock: 50, category: 'Moda', status: 'active' },
  ]);
  const [isLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setFormData({ name: '', price: '', stock: '', category: '' });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (formData.name && formData.price && formData.stock) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category || 'Geral',
        status: 'active',
      };
      setProducts([...products, newProduct]);
      setIsModalOpen(false);
      setFormData({ name: '', price: '', stock: '', category: '' });
    }
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.products')}</h1>
          <p className="text-gray-600 mt-1">{t('products.manage')}</p>
        </div>
        <AddButton label={t('common.add')} onClick={handleAdd} icon="add" />
      </motion.div>
      <AddButtonMobile onClick={handleAdd} icon="add" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <input
          type="text"
          placeholder={t('search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ProductsList
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={(p) => {
            setFormData({
              name: p.name,
              price: p.price.toString(),
              stock: p.stock.toString(),
              category: p.category,
            });
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('products.newProduct')}
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
            type="text"
            placeholder="Categoria"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Preço"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t('common.save')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
