'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ReviewsView() {
  const t = useTranslations('dashboard.reviews');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('manage')}</h1>
        <p className="text-gray-500">Monitor and respond to customer reviews</p>
      </div>

      <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
        <p className="text-gray-500">Reviews view coming soon...</p>
      </div>
    </div>
  );
}
