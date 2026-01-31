"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, ShoppingCart, Store, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useHomeStore } from '@/stores/homeStore';

export default function HeroSearch() {
  const locale = useLocale();
  const t = useTranslations('home');
  const router = useRouter();
  
  const words = ["Gadgets", "Moda", "Móveis", "Tech", "Livros", "Presentes"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const { searchQuery, setSearchQuery } = useHomeStore();
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data: searchResults, isLoading: searchLoading } = useGlobalSearch(debouncedQuery, 5);

  const hasSearch = debouncedQuery.length >= 2;


  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-background">
      
      {/* Background: Grid Pattern de Pontinhos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 [background-image:radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-5 animate-grid-fade" />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        {/* H1 Disruptivo com troca de palavras */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-8">
          ENCONTRE OS MELHORES <br />
          <span className="relative inline-block text-primary">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="inline-block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <div className="relative max-w-2xl mx-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); router.push(`/${locale}/marketplace?search=${searchQuery}`); }}
            className="group flex flex-col md:flex-row items-center gap-3"
          >
            {/* Input Menor e Minimalista */}
            <div className="relative flex-1 w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você procura hoje?"
                className="w-full h-12 pl-12 pr-4 bg-card border-2 border-border rounded-lg text-foreground text-sm focus:border-primary focus:ring-0 transition-all outline-none"
              />
            </div>

            {/* Outline Button Chamativo */}
            <Button
              type="submit"
              className="w-full md:w-auto h-12 px-8 font-black text-sm uppercase tracking-widest"
            >
              Buscar <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Dropdown de Resultados Customizado */}
          <AnimatePresence>
            {hasSearch && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute w-full mt-2 text-left bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden"
              >
                <div className="max-h-[400px] overflow-y-auto">
                  {searchLoading && <div className="p-4 text-xs text-muted-foreground animate-pulse">Buscando...</div>}
                  
                  {/* Categorias Rápidas */}
                  <div className="p-2 border-b border-zinc-100 border-zinc-800 flex gap-2 overflow-x-auto no-scrollbar">
                    {searchResults?.categories?.map((c: any) => (
                      <button 
                        key={c.id}
                        className="whitespace-nowrap px-3 py-1 rounded-md border border-border text-[10px] font-bold uppercase hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>

                  {/* Resultados de Produtos */}
                  <div className="p-2">
                    {searchResults?.products?.map((p: any) => (
                      <button 
                        key={p.id}
                        onClick={() => router.push(`/${locale}/product/${p.slug}`)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-zinc-50 hover:bg-zinc-800 rounded-md transition-colors group/item"
                      >
                        <div className="w-8 h-8 bg-zinc-100 bg-zinc-700 rounded overflow-hidden">
                          {p.images?.[0] && <img src={p.images[0]} className="w-full h-full object-cover" />}
                        </div>
                        <span className="text-sm font-medium text-zinc-700 text-zinc-300 group-hover/item:text-primary">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Badges de Destaque / Social Proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 font-bold text-xs"><ShoppingCart className="w-4 h-4"/> +10k Produtos</div>
           <div className="flex items-center gap-2 font-bold text-xs"><Store className="w-4 h-4"/> 500+ Lojas</div>
           <div className="flex items-center gap-2 font-bold text-xs"><Tag className="w-4 h-4"/> Promoções Diárias</div>
        </div>
      </div>
    </section>
  );
}