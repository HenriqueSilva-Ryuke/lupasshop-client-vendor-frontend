'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Skeleton from '@/components/ui/Skeleton';

interface Shop {
 id: string;
 name: string;
 email: string;
 phone: string;
 status: 'active' | 'inactive' | 'pending';
}

interface ShopsListProps {
 shops: Shop[];
 isLoading: boolean;
 onEdit: (shop: Shop) => void;
 onDelete: (id: string) => void;
}

const statusColors = {
 active: 'bg-green-100 text-green-700',
 inactive: 'bg-muted text-foreground',
 pending: 'bg-yellow-100 text-yellow-700',
};

export default function ShopsList({
 shops,
 isLoading,
 onEdit,
 onDelete,
}: ShopsListProps) {
 const t = useTranslations('dashboard');
 if (isLoading) {
 return (
 <div className="space-y-3">
 {Array.from({ length: 3 }).map((_, i) => (
 <Skeleton key={i} type="card" height="h-20" />
 ))}
 </div>
 );
 }

 return (
 <div className="space-y-3">
 {shops.map((shop) => (
 <motion.div
 key={shop.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
 >
 <div className="flex items-start justify-between">
 <div className="flex-1">
 <h3 className="font-semibold text-foreground">{shop.name}</h3>
 <p className="text-sm text-muted-foreground">{shop.email}</p>
 <p className="text-sm text-muted-foreground">{shop.phone}</p>
 </div>
 <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[shop.status]}`}>
 {shop.status}
 </span>
 </div>
 <div className="mt-4 flex gap-2">
 <button
 onClick={() => onEdit(shop)}
 className="px-3 py-1 text-sm bg-primary50 text-primary rounded hover:bg-primary100 transition-colors"
 >
 {t('common.edit')}
 </button>
 <button
 onClick={() => onDelete(shop.id)}
 className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-red-100 transition-colors"
 >
 {t('common.delete')}
 </button>
 </div>
 </motion.div>
 ))}
 </div>
 );
}
