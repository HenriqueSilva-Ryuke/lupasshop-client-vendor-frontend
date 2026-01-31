import React from 'react';
import { SellerSidebar } from '@/components/SellerSidebar';
import { Toaster } from 'sonner';

export default function SellerLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <div className="min-h-screen flex flex-col md:flex-row">
 <aside className="md:w-64 shrink-0 bg-gray-900">
 <SellerSidebar />
 </aside>

 <main className="flex-1 py-8 px-4 md:px-8 overflow-y-auto">
 <div className="max-w-7xl mx-auto">
 {children}
 </div>
 </main>
 <Toaster position="top-right" />
 </div>
 );
}
