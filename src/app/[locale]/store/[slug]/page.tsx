'use cache';

import React from 'react';
import { getShopById, getShopBySlug } from '@/lib/cached-stores';

export default async function StorePage({ params }: any) {
  const { slug } = params;
  // Find store by slug
  const shop = (await getShopBySlug(slug)) || null;

  if (!shop) {
    return <div>Store not found</div>;
  }

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="flex items-center space-x-4 mb-8">
          {shop.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shop.logo} alt={`${shop.name} logo`} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-200" />
          )}

          <div>
            <h1 className="text-2xl font-semibold">{shop.name}</h1>
            <p className="text-sm text-gray-600">{shop.description}</p>
          </div>
        </header>

        {/* TODO: render products list and filters */}
        <div className="text-gray-600">Products will be listed here (mock for now).</div>
      </div>
    </main>
  );
}
