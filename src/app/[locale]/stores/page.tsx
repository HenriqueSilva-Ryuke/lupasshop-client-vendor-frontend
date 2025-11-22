'use server';

import React from 'react';
import { getShopCategories, getShopsList } from '@/lib/cached-stores';
import StoresShell from '@/components/stores/StoresShell';
import JsonLd from '@/components/JsonLd';
import { generatePageMetadata } from '@/lib/page-seo';

export async function generateMetadata({ params, searchParams }: any) {
  const locale = params?.locale || 'en';
  const title = 'Stores - LupaShop';
  return generatePageMetadata({ page: 'stores', locale, customTitle: title });
}

export default async function StoresPage({ params, searchParams }: any) {
  const page = Number(searchParams?.page ?? '1');
  const q = (searchParams?.q as string) || undefined;
  const category = (searchParams?.category as string) || undefined;
  const locale = params.locale;

  const [categories, shops] = await Promise.all([
    getShopCategories(),
    getShopsList({ page, category, q })
  ]);

  const metaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'LupaShop Stores',
    'itemListElement': shops.data.map((s: any, i: number) => ({ '@type': 'ListItem', 'position': i + 1, 'url': `${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/store/${s.slug}` }))
  };

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Stores</h1>
          <div className="text-sm text-gray-600">{shops?.total ?? 0} results</div>
        </div>

        <StoresShell initialData={{ shops }} categories={categories} />

        <JsonLd data={metaData} />
      </div>
    </main>
  );
}
