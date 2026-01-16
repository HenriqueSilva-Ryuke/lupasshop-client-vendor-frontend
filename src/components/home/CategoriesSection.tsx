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
    <section className="mb-20 px-4">
      {/* Header com estilo técnico */}
      <div className="flex items-end justify-between mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
            Navigation System
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase dark:text-white">
            {t('categories.title')}
          </h2>
        </div>
        
        {/* Usando seu botão UI para o "Ver Tudo" */}
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="hidden md:flex"
        >
          <Link href={`/${locale}/marketplace`} className="flex items-center gap-2">
            {t('categories.viewAll')} <LayoutGrid className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {categoriesLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse border border-zinc-200 dark:border-zinc-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Usando o seu componente Button. 
                  A classe "w-full h-24" garante que ele tenha o aspecto de card técnico.
                  O preenchimento inset que você definiu no componente UI 
                  fará o background subir ao passar o mouse.
              */}
              <Button
                variant="outline"
                className="w-full h-24 flex flex-col items-start justify-between p-4 group relative overflow-hidden"
                asChild
              >
                <Link href={`/${locale}/marketplace?category=${cat.slug}`}>
                  {/* Ícone de detalhe no canto superior (estilo técnico) */}
                  <div className="w-full flex justify-between items-start">
                    <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 transition-opacity">
                      0{idx + 1}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </div>

                  {/* Nome da Categoria */}
                  <span className="text-sm font-black uppercase tracking-tighter text-left leading-none">
                    {cat.name}
                  </span>
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mobile View All Button */}
      <div className="mt-8 md:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/${locale}/marketplace`}>{t('categories.viewAll')}</Link>
        </Button>
      </div>
    </section>
  );
}