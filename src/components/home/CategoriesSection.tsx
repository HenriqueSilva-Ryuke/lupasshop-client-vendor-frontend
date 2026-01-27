"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useCategories } from '@/hooks/useCategories';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CategoriesSection() {
  const locale = useLocale();
  const t = useTranslations('home');
  const { data: categoriesData = [], isLoading: categoriesLoading } = useCategories();

  const categories = useMemo(() => {
    return (categoriesData || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  }, [categoriesData]);

  return (
    <section className="relative py-20 overflow-hidden bg-white bg-[#050505]">
      {/* Grid Pattern de Pontinhos - Identico ao Hero para continuidade */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        {/* Header com a mesma tipografia disruptiva do Hero */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b-2 border-zinc-900 border-white pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-3 block">
              Exploração / 02
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-[0.8]">
              {t('categories.title')}
            </h2>
          </motion.div>
          
          <Button 
            variant="inset" // Usando o efeito que segue o mouse
            size="lg"
            asChild
            className="hidden md:flex border-2"
          >
            <Link href={`/${locale}/marketplace`} className="flex items-center gap-3">
              {t('categories.viewAll')} <LayoutGrid className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-zinc-100 bg-zinc-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="inset" // Mudado para Inset para ser mais chamativo
                  className="w-full h-32 flex flex-col items-start justify-between p-6 group relative overflow-hidden border-2 rounded-none md:rounded-lg"
                  asChild
                >
                  <Link href={`/${locale}/marketplace?category=${cat.slug}`}>
                    <div className="w-full flex justify-between items-start">
                      <span className="text-[10px] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                        ID:0{idx + 1}
                      </span>
                      <ArrowUpRight className="w-4 h-4 translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>

                    <span className="text-lg font-black uppercase tracking-tighter text-left leading-none max-w-[80%]">
                      {cat.name}
                    </span>
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All - Botão Full Width técnico */}
        <div className="mt-8 md:hidden">
          <Button variant="inset" size="xl" className="w-full border-2" asChild>
            <Link href={`/${locale}/marketplace`}>{t('categories.viewAll')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}