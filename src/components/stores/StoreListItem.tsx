'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface StoreListItemProps {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  rating?: number;
  productCount?: number;
  description?: string;
}

export default function StoreListItem({ id, name, slug, logo, rating, productCount, description }: StoreListItemProps) {
  const locale = useLocale();
  const t = useTranslations('stores');
  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm space-x-4">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={`${name} logo`} className="h-16 w-16 rounded-full object-cover" />
      ) : (
        <div className="h-16 w-16 rounded-full bg-gray-200" />
      )}

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{productCount ?? 0} products</p>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      <div className="text-right">
        <div className="text-sm text-yellow-500">{rating ? rating.toFixed(1) : '—'}</div>
        <Link className="text-primary text-sm font-semibold mt-2 inline-block" href={`/${locale}/store/${slug}`}>{t('viewStore') || 'Visit Store'}</Link>
      </div>
    </div>
  );
}
