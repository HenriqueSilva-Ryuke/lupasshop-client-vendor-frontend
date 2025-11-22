'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

interface StoreFilterBarProps {
  categories: { id: string; name: string }[];
  defaultFilters?: any;
}

export default function StoreFilterBar({ categories, defaultFilters }: StoreFilterBarProps) {
  const t = useTranslations('stores');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState<string>(searchParams?.get('q') || '');
  const [category, setCategory] = useState<string | undefined>(searchParams?.get('category') || defaultFilters?.category);
  const [sort, setSort] = useState<string | undefined>(searchParams?.get('sort') || defaultFilters?.sort);
  const locale = useLocale();

  useEffect(() => {
    setQ(searchParams?.get('q') || '');
    setCategory(searchParams?.get('category') || defaultFilters?.category || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  // Debounced router update for search (simple custom debounce)
  const timer = useRef<number | null>(null);
  const updateSearch = (params: URLSearchParams) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const url = `/${locale}/stores?${params.toString()}`;
      router.push(url);
    }, 300);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
    updateSearch(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, category, sort]);

  const clear = () => {
    setQ('');
    setCategory('');
    router.push(`/${locale}/stores`);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="flex-1 border rounded px-3 py-2"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
          <option value="">{t('filterAll')}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-3 py-2">
          <option value="">{t('sortRelevance')}</option>
          <option value="rating">{t('sortTopRated')}</option>
          <option value="newest">{t('sortNewest')}</option>
        </select>

        <button onClick={clear} className="px-3 py-2 border rounded">{t('clear')}</button>
      </div>
    </div>
  );
}
