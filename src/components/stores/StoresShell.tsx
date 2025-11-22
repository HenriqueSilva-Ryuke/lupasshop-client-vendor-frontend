"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useShopsQuery } from '@/hooks/queries';
import StoresGrid from './StoresGrid';
import StoresList from './StoresList';
import StoresViewToggle from './StoresViewToggle';
import StoreFilterBar from './StoreFilterBar';
import FiltersSidebar from './FiltersSidebar';
import SuggestionsSidebar from './SuggestionsSidebar';

interface StoresShellProps {
  initialData: any;
  categories: any[];
}

export default function StoresShell({ initialData, categories, suggestions }: StoresShellProps & { suggestions?: any[] }) {
  const t = useTranslations('stores');
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stores-view');
      if (stored) return stored as any;
    }
    return 'grid';
  });

  const router = useRouter();
  const page = Number(searchParams.get('page') || '1');
  const locale = useLocale();
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;

  const { data } = useShopsQuery({ page, limit: 12, q, category });
  const resAny = data as any;
  const shops = (resAny?.shops?.data as any[] | undefined) ?? (initialData?.shops?.data as any[] | undefined) ?? [];
  const currentPage = (resAny?.shops?.page as number | undefined) ?? (initialData?.shops?.page as number | undefined) ?? 1;
  const total = (resAny?.shops?.total as number | undefined) ?? (initialData?.shops?.total as number | undefined) ?? 0;
  const limit = (resAny?.shops?.limit as number | undefined) ?? (initialData?.shops?.limit as number | undefined) ?? 12;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Reset view based on localStorage
  useEffect(() => {
    const stored = localStorage.getItem('stores-view');
    if (stored === 'grid' || stored === 'list') setView(stored as any);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left: Filter Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <FiltersSidebar categories={categories} defaultFilters={{ category }} />
      </div>

      {/* Center Content */}
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center justify-between mb-4">
          {/* Mobile: Filter bar + toggle */}
          <div className="lg:hidden w-full">
            <StoreFilterBar categories={categories} defaultFilters={{ category }} />
          </div>
          <div className="flex items-center gap-4">
            <StoresViewToggle defaultView={view} onChange={setView} />
          </div>
        </div>

        {shops.length === 0 ? (
          <div className="text-gray-600">{t ? t('noStoresFound') : 'No stores found'}</div>
        ) : (
          view === 'grid' ? <StoresGrid stores={shops} /> : <StoresList stores={shops} />
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={() => router.push(`/${locale}/stores?page=${Math.max(1, (currentPage || 1) - 1)}`)}
            className="px-3 py-2 border rounded"
            disabled={currentPage <= 1}
          >
            Prev
          </button>
          <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
          <button
            onClick={() => router.push(`/${locale}/stores?page=${(currentPage ?? 1) + 1}`)}
            className="px-3 py-2 border rounded"
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: Suggestions */}
      <div className="col-span-12 lg:col-span-2">
        <SuggestionsSidebar suggestions={suggestions || []} />
      </div>
    </div>
  );
}
