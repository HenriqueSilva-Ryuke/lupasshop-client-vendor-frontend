'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Skeleton from '@/components/ui/Skeleton';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsList({
  products,
  isLoading,
  onEdit,
  onDelete,
}: ProductsListProps) {
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted border-b">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-foreground">{t('products.name')}</th>
            <th className="px-6 py-3 text-left font-medium text-foreground">{t('products.category')}</th>
            <th className="px-6 py-3 text-left font-medium text-foreground">{t('products.price')}</th>
            <th className="px-6 py-3 text-left font-medium text-foreground">{t('products.stock')}</th>
            <th className="px-6 py-3 text-left font-medium text-foreground">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <motion.tr
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-muted transition-colors"
            >
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4 font-semibold">AOA {product.price.toFixed(2)}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span className="material-icons text-sm">edit</span>
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-destructive hover:text-red-700 transition-colors"
                >
                  <span className="material-icons text-sm">delete</span>
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
