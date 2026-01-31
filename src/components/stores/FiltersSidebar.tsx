'use client';

import React from 'react';
import StoreFilterBar from './StoreFilterBar';

interface FiltersSidebarProps {
  categories: { id: string; name: string }[];
  defaultFilters?: any;
}

export default function FiltersSidebar({ categories, defaultFilters }: FiltersSidebarProps) {
  return (
    <aside className="hidden lg:block w-96">
      <div className="sticky top-24 space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-base font-semibold mb-3">Filters</h4>
          <StoreFilterBar categories={categories} defaultFilters={defaultFilters} />
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-base font-semibold mb-3">More Filters</h4>
          <p className="text-sm text-muted-foreground">Price, Rating, Open now (placeholders for now)</p>
        </div>
      </div>
    </aside>
  );
}
