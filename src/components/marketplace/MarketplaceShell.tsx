'use client';

import React, { useState, useEffect } from 'react';
import { Category, MarketplaceStore, MarketplaceProduct } from '@/types/marketplace';
import MarketplaceLayout from './MarketplaceLayout';
import CategoryWidget from './widgets/CategoryWidget';
import PromotedStoreWidget from './widgets/PromotedStoreWidget';
import TrendingProductsWidget from './widgets/TrendingProductsWidget';
import FilterWidget from './widgets/FilterWidget';
import StoreCard from './StoreCard';
import ProductCard from './ProductCard';
import { Search, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface MarketplaceShellProps {
    categories: Category[];
    stores: MarketplaceStore[];
    products: MarketplaceProduct[];
}

export default function MarketplaceShell({ categories, stores, products }: MarketplaceShellProps) {
    const t = useTranslations('marketplace');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // State
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(searchParams.get('category') || undefined);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sort, setSort] = useState(searchParams.get('sort') || 'relevance');

    // Filter State
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 1000000 });
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

    // Sync URL with state - REMOVED for client-side only filtering
    // Initial state is still derived from URL in useState initialization above

    /* 
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectedCategory) params.set('category', selectedCategory);
        else params.delete('category');

        if (searchQuery) params.set('q', searchQuery);
        else params.delete('q');

        if (sort && sort !== 'relevance') params.set('sort', sort);
        else params.delete('sort');

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [selectedCategory, searchQuery, sort, router, pathname, searchParams]);
    */

    // Filter logic
    const filteredStores = stores.filter(store => {
        const matchesCategory = selectedCategory ? store.categories.includes(selectedCategory) : true;
        const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = selectedRatings.length === 0 || selectedRatings.some(r => Math.floor(store.rating) >= r);
        // Note: Price filtering would typically apply to products, but for stores we might filter by average price if available.
        // For this mock, we'll assume it applies to products within the store, but since we list stores, we'll skip strict price filtering on stores for now.

        return matchesCategory && matchesSearch && matchesRating;
    });

    // Sorting logic
    const sortedStores = [...filteredStores].sort((a, b) => {
        switch (sort) {
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return 0; // Mock: assume original order is newest
            case 'trending':
                return (b.reviewCount || 0) - (a.reviewCount || 0);
            default:
                return 0;
        }
    });

    const promotedStores = stores.filter(s => s.isPromoted);
    const trendingProducts = products.filter(p => p.isTrending);

    return (
        <MarketplaceLayout
            leftSidebar={
                <div className="space-y-6">
                    <CategoryWidget
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={(slug) => setSelectedCategory(slug === selectedCategory ? undefined : slug)}
                    />

                    <FilterWidget
                        minPrice={priceRange.min}
                        maxPrice={priceRange.max}
                        onPriceChange={(min, max) => setPriceRange({ min, max })}
                        selectedRatings={selectedRatings}
                        onRatingChange={(rating) => {
                            setSelectedRatings(prev =>
                                prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
                            );
                        }}
                    />
                </div>
            }
            centerContent={
                <div className="space-y-6">
                    {/* Search Bar & Controls */}
                    <div className="flex flex-col gap-4 pt-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 px-2">
                                <span className="text-sm text-gray-500 font-medium hidden sm:inline">{t('sort.label')}:</span>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="text-sm font-medium text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer"
                                >
                                    <option value="relevance">{t('sort.relevance')}</option>
                                    <option value="rating">{t('sort.rating')}</option>
                                    <option value="newest">{t('sort.newest')}</option>
                                    <option value="trending">{t('sort.trending')}</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                                    title={t('view.grid')}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                                    title={t('view.list')}
                                >
                                    <ListIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            {sort === 'trending'
                                ? t('trendingNow')
                                : selectedCategory
                                    ? `${categories.find(c => c.slug === selectedCategory)?.name} ${t('title')}`
                                    : t('allStores')}
                        </h2>
                        <span className="text-sm text-white/80 font-medium">
                            {sort === 'trending' ? trendingProducts.length : sortedStores.length} {t('results')}
                        </span>
                    </div>

                    {/* Grid/List */}
                    {sort === 'trending' ? (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                            {trendingProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : sortedStores.length > 0 ? (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                            {sortedStores.map(store => (
                                <StoreCard key={store.id} store={store} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{t('noStoresFound')}</h3>
                            <p className="text-gray-500 mt-1">{t('tryAdjusting')}</p>
                            <button
                                onClick={() => { setSelectedCategory(undefined); setSearchQuery(''); setSelectedRatings([]); }}
                                className="mt-4 text-primary font-medium hover:underline"
                            >
                                {t('clearFilters')}
                            </button>
                        </div>
                    )}
                </div>
            }
            rightSidebar={
                <div className="space-y-6">
                    {promotedStores.map(store => (
                        <PromotedStoreWidget key={store.id} store={store} />
                    ))}
                    <TrendingProductsWidget
                        products={trendingProducts}
                        onViewTrending={() => setSort('trending')}
                    />
                </div>
            }
        />
    );
}