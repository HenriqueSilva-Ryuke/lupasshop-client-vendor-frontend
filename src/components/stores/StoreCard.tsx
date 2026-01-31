"use client";

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface StoreCardProps {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  featuredImage?: string;
  rating?: number;
  productCount?: number;
  categories?: string[];
  description?: string;
}

export default function StoreCard({ id, name, slug, logo, featuredImage, rating, productCount, categories, description }: StoreCardProps) {
  const locale = useLocale();
  const t = useTranslations('stores');
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="h-64 w-full bg-muted overflow-hidden">
        {featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={featuredImage} alt={`${name} hero`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>

          <div className="px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={`${name} logo`} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full" />
            )}
              <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <div className="text-xs text-muted-foreground">{productCount ?? 0} products</div>
            </div>
          </div>
          <div className="text-sm text-yellow-500">{rating ? rating.toFixed(1) : '—'}</div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{description}</p>

        <div className="mt-5 flex justify-between items-center">
          <Link className="text-primary font-semibold text-sm" href={`/${locale}/store/${slug}`}>{t('viewStore') || 'Visit Store'}</Link>
          <button className="bg-primary text-black px-3 py-1 rounded text-sm">View Products</button>
        </div>
      </div>
    </div>
  );
}
