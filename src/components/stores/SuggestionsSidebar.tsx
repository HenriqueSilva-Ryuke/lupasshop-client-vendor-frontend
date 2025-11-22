'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface SuggestionsSidebarProps {
  suggestions: any[];
}

export default function SuggestionsSidebar({ suggestions = [] }: SuggestionsSidebarProps) {
  const locale = useLocale();
  return (
    <aside className="hidden lg:block w-80">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-base font-semibold mb-3">Suggestions</h4>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div key={s.id} className="flex items-center space-x-4">
                {s.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logo} alt={`${s.name} logo`} className="h-12 w-12 rounded object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded bg-gray-200" />
                )}
                <div className="flex-1">
                  <Link href={`/${locale}/store/${s.slug}`} className="text-sm font-semibold text-gray-900">{s.name}</Link>
                  <div className="text-xs text-gray-500">{s.productCount} products</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-semibold mb-2">Top categories</h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 border rounded">Electronics</span>
            <span className="text-xs px-2 py-1 border rounded">Fashion</span>
            <span className="text-xs px-2 py-1 border rounded">Home</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
