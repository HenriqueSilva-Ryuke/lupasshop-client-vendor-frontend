'use client';

import React from 'react';
import StoreListItem from './StoreListItem';

interface StoresListProps {
  stores: any[];
}

export default function StoresList({ stores }: StoresListProps) {
  return (
    <div className="space-y-4">
      {stores.map((s) => (
        <StoreListItem key={s.id} {...s} />
      ))}
    </div>
  );
}
