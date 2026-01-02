'use client';

import Marketplace from '@/components/Marketplace';

// Prevent static optimization for pages using client stores
export const dynamic = 'force-dynamic';

export default function RootPage() {
  return <Marketplace />;
}
