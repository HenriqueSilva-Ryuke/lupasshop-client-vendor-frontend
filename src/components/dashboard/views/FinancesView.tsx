'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function FinancesView() {
  const t = useTranslations('dashboard.finances');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('manage')}</h1>
        <p className="text-gray-500">Track your earnings and payouts</p>
      </div>

      <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
        <p className="text-gray-500">Finances view coming soon...</p>
      </div>
    </div>
  );
}
