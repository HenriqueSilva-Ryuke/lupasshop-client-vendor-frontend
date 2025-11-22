'use client';

import React from 'react';
import StoreCard from './StoreCard';

interface StoresGridProps {
  stores: any[];
}

export default function StoresGrid({ stores }: StoresGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((s) => (
        <StoreCard key={s.id} {...s} />
      ))}
    </div>
  );
}
