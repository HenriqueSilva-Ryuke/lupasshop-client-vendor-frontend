"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Bolt, Heart, ShoppingCart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';

export default function DealsSection() {
  const locale = useLocale();
  const t = useTranslations('home');
  const router = useRouter();
  const { data: featuredProductsData = [], isLoading: productsLoading } = useFeaturedProducts(5);

  const deals = useMemo(() => {
    return (featuredProductsData || []).slice(0, 5).map((product: any) => ({
      id: product.id,
      store: product.store?.name || 'Unknown Store',
      title: product.name,
      price: `R$ ${product.price?.toFixed(2) || '0.00'}`,
      oldPrice: product.originalPrice ? `R$ ${product.originalPrice.toFixed(2)}` : null,
      badge: product.discount ? `-${product.discount}%` : null,
      image: product.images?.[0] || 'https://via.placeholder.com/400',
      slug: product.slug,
    }));
  }, [featuredProductsData]);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-6 px-1">
        <Bolt className="text-primary w-7 h-7" />
        <h2 className="text-2xl font-bold tracking-tight">{t('deals.sectionTitle')}</h2>
      </div>
      {productsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {deals.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-[#2a3b47] overflow-hidden group hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
              onClick={() => router.push(`/${locale}/product/${deal.slug}`)}
            >
              <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover transform group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${deal.image})` }}
                />
                {deal.badge && (
                  <div className="absolute top-3 left-3 bg-red-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow">
                    {deal.badge}
                  </div>
                )}
                <Button
                  variant="icon"
                  className="absolute top-3 right-3 size-9 bg-white dark:bg-surface-dark rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300 z-10"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{deal.store}</p>
                <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">{deal.title}</h3>
                <div className="mt-auto pt-2">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-lg font-bold">{deal.price}</span>
                    {deal.oldPrice && <span className="text-xs text-text-sub line-through mb-1">{deal.oldPrice}</span>}
                  </div>
                  <Button
                    variant="default"
                    className="w-full h-10 rounded-lg bg-primary hover:bg-primary-dark text-black text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('deals.addButton')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}