"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Star, Verified, ArrowUpRight, Store } from 'lucide-react';
import { useFeaturedStores } from '@/hooks/useFeaturedStores';
import Button from '../ui/Button';

export default function FeaturedStoresSection() {
  const locale = useLocale();
  const t = useTranslations('home');
  const { data: featuredStoresData = [], isLoading: storesLoading } = useFeaturedStores(4);

  const featuredStores = useMemo(() => {
    return (featuredStoresData || []).map((store: any) => ({
      id: store.id,
      name: store.name,
      badge: store.name.slice(0, 2).toUpperCase(),
      rating: (store.rating || 0).toFixed(1),
      sales: store.salesCount || 0,
      slug: store.slug,
      isVerified: store.isVerified,
    }));
  }, [featuredStoresData]);

  return (
    <section className="relative py-24 bg-card ">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Alinhado ao Hero */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 border-b-2 border-border pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-primary" />
              <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                Partner Ecosystem
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] mb-6">
              {t('stores.featuredTitle')}
            </h2>
            <p className="text-zinc-500 font-medium text-lg max-w-md leading-tight">
              {t('stores.description')}
            </p>
          </motion.div>

          <Button variant="inset" size="lg" asChild className="border-border">
            <Link href={`/${locale}/marketplace`}>
              {t('stores.viewAll')}
            </Link>
          </Button>
        </div>

        {storesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-border">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-card animate-pulse" />
            ))} 
          </div>
        ) : (
          /* Grid com bordas compartilhadas (estilo industrial) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
            {featuredStores.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card p-8 border-r border-b border-border hover:z-10 transition-all"
              >
                {/* Efeito Inset Background sutil no card inteiro */}
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                <Link href={`/${locale}/store/${store.slug}`} className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    {/* Avatar Quadrado Técnico */}
                    <div className="size-16 border-2 border-border flex items-center justify-center text-xl font-black bg-card group-hover:bg-primary group-hover:text-card-foreground group-hover:border-primary transition-all duration-300">
                      {store.badge}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-xl uppercase tracking-tighter">
                        {store.name}
                      </h3>
                      {store.isVerified && (
                        <Verified className="w-4 h-4 text-primary fill-primary/10" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs font-black">{store.rating}</span>
                      </div>
                      <div className="h-3 w-px bg-zinc-200" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {store.sales} Vendas
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}