"use client";

import React, { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';
import { useFeaturedStores } from '@/hooks/useFeaturedStores';

export default function FeaturedStoresSection() {
  const locale = useLocale();
  const t = useTranslations('home');
  const { data: featuredStoresData = [], isLoading: storesLoading } = useFeaturedStores(4);

  const featuredStores = useMemo(() => {
    return (featuredStoresData || []).map((store: any) => ({
      id: store.id,
      name: store.name,
      badge: store.name.slice(0, 2).toUpperCase(),
      color: 'bg-primary/10 text-primary',
      rating: `${(store.rating || 0).toFixed(1)} (${store.salesCount || 0} vendas)`,
      slug: store.slug,
      isVerified: store.isVerified,
    }));
  }, [featuredStoresData]);

  return (
    <section className="rounded-3xl bg-gray-50 dark:bg-surface-dark p-8 md:p-10 border border-gray-100 dark:border-[#2a3b47]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('stores.featuredTitle')}</h2>
          <p className="text-text-sub mt-2 text-sm">{t('stores.description')}</p>
        </div>
        <motion.a
          href={`/${locale}/marketplace`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-[#3c4e5c] text-text-main dark:text-black text-sm font-bold hover:bg-white dark:hover:bg-gray-800 hover:shadow transition-all"
        >
          {t('stores.viewAll')}
        </motion.a>
      </div>
      {storesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStores.map((store, idx) => (
            <motion.a
              key={store.id}
              href={`/${locale}/store/${store.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-[#101a22] shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-transparent"
            >
              <div className={`size-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${store.color}`}>{store.badge}</div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">{store.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium text-text-sub">{store.rating}</span>
                  {store.isVerified && <CheckCircle className="w-4 h-4 text-primary ml-1" />}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}