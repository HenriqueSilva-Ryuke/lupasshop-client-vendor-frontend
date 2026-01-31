'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useStores } from '@/hooks/useStores';
import { useCategories } from '@/hooks/useCategories';
import { useLocale, useTranslations } from 'next-intl';
import type { Product, Store, Category } from '@/graphql/types';

export default function MarketplaceProductListing() {
  const locale = useLocale();
  const t = useTranslations('marketplace');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  // Fetch data from backend
  const { data: products = [], isLoading: productsLoading } = useProducts({
    limit,
    offset,
    categoryId: selectedCategories[0] || undefined,
  }) as { data: Product[], isLoading: boolean };

  const { data: stores = [] } = useStores({ limit: 10 }) as { data: Store[] };
  const { data: categories = [] } = useCategories('PRODUCT', 20) as { data: Category[] };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      return (
        <Star
          key={i}
          className={`w-[14px] h-[14px] ${
            filled ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'
          }`}
        />
      );
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores(prev =>
      prev.includes(storeId) ? prev.filter(id => id !== storeId) : [...prev, storeId]
    );
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background-light bg-background-dark">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm text-muted-foreground text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {t('breadcrumb.home')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground text-black font-medium">{t('breadcrumb.marketplace')}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="hidden lg:block space-y-1">
              <h3 className="text-lg font-bold text-foreground text-black mb-4">{t('filter.title')}</h3>

              {/* Category Filter */}
              <details className="group open:pb-4 border-b border-gray-100 border-border" open>
                <summary className="flex cursor-pointer items-center justify-between py-3 list-none">
                  <span className="text-sm font-bold text-foreground text-black">{t('filter.category')}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="space-y-2 pt-1 pb-2 pl-1">
                  {categories.slice(0, 8).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-card bg-[#2c3640] border-gray-600"
                      />
                      <span className="text-sm text-muted-foreground text-muted-foreground">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </details>

              {/* Store Filter */}
              <details className="group open:pb-4 border-b border-gray-100 border-border" open>
                <summary className="flex cursor-pointer items-center justify-between py-3 list-none">
                  <span className="text-sm font-bold text-foreground text-black">{t('filter.store')}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="space-y-2 pt-1 pb-2 pl-1">
                  {stores.slice(0, 6).map((store) => (
                    <label key={store.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStores.includes(store.id)}
                        onChange={() => handleStoreToggle(store.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-card bg-[#2c3640] border-gray-600"
                      />
                      <span className="text-sm text-muted-foreground text-muted-foreground">{store.name}</span>
                      {store.isVerified && <span className="text-blue-500 text-xs">✓</span>}
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </aside>

          {/* Main Products Area */}
          <main className="flex-1 min-w-0">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-card bg-[#1e2832] p-4 rounded-xl border border-border border-[#2e3a45] shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-foreground text-black">{t('products.title')}</h1>
                <p className="text-sm text-muted-foreground mt-1">{t('products.showing', { count: products.length })}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap hidden sm:block">{t('sorting.sortBy')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-muted bg-[#2c3640] border border-border border-gray-600 text-foreground text-black text-sm font-medium rounded-lg h-9 pl-4 pr-10 focus:ring-2 focus:ring-primary cursor-pointer focus:outline-none"
                >
                  <option value="relevance">{t('sort.relevance')}</option>
                  <option value="price-asc">{t('sorting.priceLow')}</option>
                  <option value="price-desc">{t('sorting.priceHigh')}</option>
                  <option value="rating">{t('sort.rating')}</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card bg-[#1e2832] rounded-xl border border-border border-[#2e3a45] overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200 bg-gray-800"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 bg-gray-800 rounded"></div>
                      <div className="h-4 bg-gray-200 bg-gray-800 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('products.noProducts')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/product/${product.slug}`}
                    className="group flex flex-col bg-card bg-[#1e2832] rounded-xl border border-border border-[#2e3a45] overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-card bg-[#121212] overflow-hidden p-4 border-b border-gray-50 border-border">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 p-2 rounded-full bg-card/90 bg-black/50 hover:bg-card text-muted-foreground hover:text-red-500 shadow-sm transition-colors backdrop-blur-sm border border-gray-100 border-transparent"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      {product.isNew && (
                        <span className="absolute top-3 left-3 text-black text-[10px] font-bold px-2 py-1 rounded bg-green-600">
                          {t('products.new')}
                        </span>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-3 left-3 text-black text-[10px] font-bold px-2 py-1 rounded bg-red-600">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-foreground text-black line-clamp-2 min-h-[40px] mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-yellow-400">{renderStars(product.rating || 0)}</div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount || 0} {t('products.reviews')})</span>
                      </div>

                      <div className="mt-auto">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-xs text-muted-foreground line-through">R$ {product.originalPrice.toFixed(2)}</p>
                        )}
                        <div className="flex items-baseline gap-2 mb-3">
                          <p className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                        </div>

                        <button 
                          onClick={(e) => e.preventDefault()}
                          className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-primary text-black font-bold text-sm hover:bg-primary-light transition-all shadow-sm"
                          disabled={product.stockQuantity === 0}
                        >
                          {product.stockQuantity === 0 ? t('products.outOfStock') : t('products.addToCart')}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:bg-card/5 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                    currentPage === 1
                      ? 'bg-primary text-black shadow-sm'
                      : 'text-foreground text-black hover:bg-muted hover:bg-card/5'
                  }`}
                >
                  1
                </button>

                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:bg-card/5 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
