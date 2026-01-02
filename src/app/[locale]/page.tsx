"use client";

import type React from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'motion/react';
import {
  Search,
  ArrowRight,
  Bolt,
  Heart,
  ShoppingCart,
  Star,
  Image as ImageIcon,
  Store,
  CheckCircle,
  Tag,
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useCategories } from '@/hooks/useCategories';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { useFeaturedStores } from '@/hooks/useFeaturedStores';

export default function Home() {
  const locale = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data: searchResults, isLoading: searchLoading } = useGlobalSearch(debouncedQuery, 6);

  // Fetch API data
  const { data: categoriesData = [], isLoading: categoriesLoading } = useCategories();
  const { data: featuredProductsData = [], isLoading: productsLoading } = useFeaturedProducts(5);
  const { data: featuredStoresData = [], isLoading: storesLoading } = useFeaturedStores(4);

  const hasSearch = debouncedQuery.length >= 2;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/${locale}/marketplace?search=${encodeURIComponent(query)}`);
  };

  const highlightedProducts = useMemo(() => searchResults?.products ?? [], [searchResults]);
  const highlightedStores = useMemo(() => searchResults?.stores ?? [], [searchResults]);
  const highlightedCategories = useMemo(() => searchResults?.categories ?? [], [searchResults]);

  // Transform API categories to component format
  const categories = useMemo(() => {
    return (categoriesData || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  }, [categoriesData]);

  // Transform API products to component format
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

  // Transform API stores to component format
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
    <PageTransition>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-black">
        <Navbar />

        <main className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 xl:px-28 pb-20">
          {/* Busca hero */}
          <section className="pt-10 md:pt-14 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-surface-light dark:bg-surface-dark p-3 md:p-4 rounded-xl shadow-lg border border-gray-100 dark:border-[#2a3b47]"
            >
              <form className="flex items-center h-14 md:h-16 w-full gap-2" onSubmit={handleSearch}>
                <div className="pl-4 pr-2 flex items-center justify-center text-primary-light">
                  <Search className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="O que você está procurando hoje?"
                  className="flex-1 h-full bg-transparent border-none text-text-main dark:text-black placeholder:text-text-sub focus:ring-0 text-base md:text-lg px-2"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="h-10 md:h-11 px-6 md:px-8 mr-2 bg-primary text-black rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors shadow-md flex items-center gap-2"
                >
                  Buscar
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              {hasSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-2xl border border-gray-100 dark:border-[#2a3b47] bg-white/80 dark:bg-surface-dark/95 backdrop-blur-xl shadow-xl divide-y divide-gray-100/60 dark:divide-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-4 md:p-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <ShoppingCart className="w-4 h-4" /> Produtos
                      </div>
                      {searchLoading && <p className="text-sm text-gray-500">Buscando...</p>}
                      {!searchLoading && highlightedProducts.length === 0 && (
                        <p className="text-sm text-gray-500">Nada encontrado.</p>
                      )}
                      <div className="space-y-2">
                        {highlightedProducts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => router.push(`/${locale}/product/${p.slug}`)}
                            className="w-full text-left p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                                {p.images?.[0] ? (
                                  <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${p.images[0]})` }}
                                  />
                                ) : (
                                  <ImageIcon className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground dark:text-black line-clamp-1">{p.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{p.storeId}</p>
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{p.rating?.toFixed(1) ?? '—'}</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 md:p-5 space-y-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <Store className="w-4 h-4" /> Lojas
                      </div>
                      {!searchLoading && highlightedStores.length === 0 && (
                        <p className="text-sm text-gray-500">Nenhuma loja encontrada.</p>
                      )}
                      <div className="space-y-2">
                        {highlightedStores.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => router.push(`/${locale}/store/${s.slug}`)}
                            className="w-full text-left p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                {s.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground dark:text-black line-clamp-1">
                                  {s.name}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Star className="w-4 h-4 fill-current text-yellow-500" /> {s.rating?.toFixed(1) ?? '—'}
                                  {s.isVerified && <CheckCircle className="w-4 h-4 text-primary" />}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 md:p-5 space-y-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <Tag className="w-4 h-4" /> Categorias
                      </div>
                      {!searchLoading && highlightedCategories.length === 0 && (
                        <p className="text-sm text-gray-500">Nenhuma categoria encontrada.</p>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {highlightedCategories.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => router.push(`/${locale}/marketplace?category=${c.slug}`)}
                            className="w-full text-left p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
                          >
                            <span className="text-sm font-semibold text-foreground dark:text-black line-clamp-1">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Cards promocionais */}
          <section className="my-12">
            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deals.slice(0, 3).map((deal, idx) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ translateY: -6, scale: 1.01 }}
                    className="group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 border border-gray-100 dark:border-[#2a3b47] hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/${locale}/product/${deal.slug}`)}
                  >
                    <div
                      className="w-full aspect-[16/10] rounded-xl bg-cover bg-center overflow-hidden relative"
                      style={{ backgroundImage: `url(${deal.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      {deal.badge && (
                        <span className="absolute top-4 right-4 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg bg-red-500">
                          {deal.badge}
                        </span>
                      )}
                    </div>
                    <div className="px-1 mt-1">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{deal.title}</h3>
                      <p className="text-text-sub text-sm mt-2 font-medium">{deal.store}</p>
                      <span className="inline-flex items-center text-primary font-bold text-sm mt-3 group-hover:underline gap-1">
                        Ver produto
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Categorias populares */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="text-2xl font-bold tracking-tight">Categorias Populares</h2>
              <Link href={`/${locale}/marketplace`} className="text-primary text-sm font-semibold hover:text-primary-dark hover:underline">Ver todas</Link>
            </div>
            {categoriesLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((cat, idx) => (
                  <motion.a
                    key={cat.id}
                    href={`/${locale}/marketplace?category=${cat.slug}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 dark:border-[#2a3b47] bg-white dark:bg-surface-dark p-8 hover:border-primary/50 dark:hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-text-sub dark:text-gray-400 group-hover:text-primary bg-gray-50 dark:bg-gray-800 p-4 rounded-full group-hover:bg-primary/10 transition-all duration-300 text-2xl">
                      📦
                    </div>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors text-text-main dark:text-black text-center">{cat.name}</span>
                  </motion.a>
                ))}
              </div>
            )}
          </section>

          {/* Ofertas do dia */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6 px-1">
              <Bolt className="text-primary w-7 h-7" />
              <h2 className="text-2xl font-bold tracking-tight">Ofertas do Dia</h2>
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="absolute top-3 right-3 size-9 bg-white dark:bg-surface-dark rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{deal.store}</p>
                      <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">{deal.title}</h3>
                      <div className="mt-auto pt-2">
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-lg font-bold">{deal.price}</span>
                          {deal.oldPrice && <span className="text-xs text-text-sub line-through mb-1">{deal.oldPrice}</span>}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full h-10 rounded-lg bg-primary hover:bg-primary-dark text-black text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Adicionar
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Lojas em destaque */}
          <section className="rounded-3xl bg-gray-50 dark:bg-surface-dark p-8 md:p-10 border border-gray-100 dark:border-[#2a3b47]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Lojas em Destaque</h2>
                <p className="text-text-sub mt-2 text-sm">Compre diretamente das melhores lojas independentes.</p>
              </div>
              <motion.a
                href={`/${locale}/marketplace`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-[#3c4e5c] text-text-main dark:text-black text-sm font-bold hover:bg-white dark:hover:bg-gray-800 hover:shadow transition-all"
              >
                Ver todas as lojas
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
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}