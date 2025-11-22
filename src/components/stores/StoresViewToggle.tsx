'use client';

import React, { useState, useEffect } from 'react';

interface StoresViewToggleProps {
  defaultView?: 'grid' | 'list';
  onChange?: (view: 'grid' | 'list') => void;
}

export default function StoresViewToggle({ defaultView = 'grid', onChange }: StoresViewToggleProps) {
  const [view, setView] = useState<'grid' | 'list'>(defaultView);

  useEffect(() => {
    const stored = localStorage.getItem('stores-view');
    if (stored === 'list' || stored === 'grid') setView(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('stores-view', view);
    onChange?.(view);
  }, [view, onChange]);

  return (
    <div className="inline-flex items-center border rounded overflow-hidden">
      <button onClick={() => setView('grid')} className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100' : ''}`}>Grid</button>
      <button onClick={() => setView('list')} className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100' : ''}`}>List</button>
    </div>
  );
}
