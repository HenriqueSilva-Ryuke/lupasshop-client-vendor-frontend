'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Skeleton from '@/components/ui/Skeleton';

interface Review {
  id: string;
  author: string;
  product: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function ReviewsList({
  reviews,
  isLoading,
  onApprove,
  onReject,
}: ReviewsListProps) {
  const t = useTranslations('dashboard');
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} type="card" height="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{review.author}</h3>
              <p className="text-sm text-muted-foreground">{review.product}</p>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="material-icons text-sm text-yellow-500">star</span>
              ))}
            </div>
          </div>

          <p className="text-foreground text-sm mb-3">{review.comment}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{review.date}</span>
              <span className={`px-2 py-1 rounded ${
                review.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : review.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {review.status}
              </span>
            </div>

            {review.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => onApprove?.(review.id)}
                  className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                >
                  {t('reviews.approve')}
                </button>
                <button
                  onClick={() => onReject?.(review.id)}
                  className="px-3 py-1 text-xs bg-destructive/10 text-destructive rounded hover:bg-red-100 transition-colors"
                >
                  {t('reviews.reject')}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
