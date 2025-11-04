'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import ReviewsList from '@/components/dashboard/ReviewsList';

interface Review {
  id: string;
  author: string;
  product: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

export default function ReviewsView() {
  const t = useTranslations('dashboard');
  const [reviews, setReviews] = React.useState<Review[]>([
    { id: '1', author: 'João', product: 'Produto A', rating: 5, comment: 'Excelente!', status: 'approved', date: '2024-11-01' },
    { id: '2', author: 'Maria', product: 'Produto B', rating: 4, comment: 'Bom produto', status: 'pending', date: '2024-11-02' },
  ]);

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.reviews')}</h1>
        <p className="text-gray-600 mt-1">{t('reviews.manage')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">{t('reviews.total')}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">{t('reviews.approved')}</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.approved}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">{t('reviews.pending')}</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <ReviewsList
          reviews={reviews}
          isLoading={false}
          onApprove={(id) => setReviews(reviews.map(r => r.id === id ? {...r, status: 'approved' as const} : r))}
          onReject={(id) => setReviews(reviews.map(r => r.id === id ? {...r, status: 'rejected' as const} : r))}
        />
      </motion.div>
    </div>
  );
}
