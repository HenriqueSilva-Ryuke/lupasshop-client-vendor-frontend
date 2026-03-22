'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, ChevronRight, ChevronLeft, Star, Search } from 'lucide-react';
import { useMarketplaceData } from 'lupa-api-client/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocale, useTranslations } from 'next-intl';
import type { Product, Store, Category } from '@/graphql/types';
import { SkeletonProductCard } from '@/components/ui/SkeletonLoaders';
import { EmptySearchResults } from '@/components/ui/EmptyStates';
import { useToast } from '@/components/ui/Toast';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { useCartStore } from '@/stores/cartStore';

export default function MarketplaceProductListing() {
    const locale = useLocale();
    const t = useTranslations('marketplace');
 const toast = useToast();
 const { addItem } = useCartStore();
 const [currentPage, setCurrentPage] = useState(1);
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 const [sortBy, setSortBy] = useState('relevance');
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
 const [selectedStores, setSelectedStores] = useState<string[]>([]);
 const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
 const [loadingCartItems, setLoadingCartItems] = useState<Set<string>>(new Set());
 const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
    const limit = 12;
    const offset = (currentPage - 1) * limit;
    const debouncedSearchQuery = useDebounce(searchQuery, 800);
    
    // Fetch data from backend using unified endpoint
    const { data: marketplaceData, isLoading: productsLoading } = useMarketplaceData({
        limit,
        offset,
        ...(selectedCategories[0] && { categoryId: selectedCategories[0] }),
        ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
        categoryLimit: 20,
        storeLimit: 10,
    });

    const allProducts = marketplaceData?.products ?? [];
    const stores = marketplaceData?.stores ?? [];
    const categories = marketplaceData?.categories ?? [];

    const products = allProducts.filter((p: Product) => {
        if (availabilityFilter === 'in_stock') return (p.stockQuantity ?? 0) > 0;
        if (availabilityFilter === 'out_of_stock') return (p.stockQuantity ?? 0) === 0;
        return true;
    });

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => {
            const filled = i < Math.floor(rating);
            return (
                <Star
                    key={i}
                    className={`w-[14px] h-[14px] ${filled ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'
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

 const handleWishlistToggle = (productId: string, productName: string) => {
 const isInWishlist = wishlistItems.has(productId);

 if (isInWishlist) {
 // Remove from wishlist
 setWishlistItems(prev => {
 const next = new Set(prev);
 next.delete(productId);
 return next;
 });

 toast.undo(
 `${productName} removido dos favoritos`,
 () => {
 // Undo: add back to wishlist
 setWishlistItems(prev => new Set(prev).add(productId));
 },
 { duration: 7000 }
 );
 } else {
 // Add to wishlist
 setWishlistItems(prev => new Set(prev).add(productId));
 toast.success(`${productName} adicionado aos favoritos ❤️`);
 }
 };

 const handleAddToCart = (product: Product) => {
 setLoadingCartItems(prev => new Set(prev).add(product.id));

 // Simulate API call
 setTimeout(() => {
 addItem({
 productId: product.id,
 storeId: product.store?.id || product.storeId || 'unknown',
 storeName: 'Store',
 name: product.name,
 price: product.price,
 quantity: 1,
 image: product.images[0] || '',
 stockQuantity: product.stockQuantity || 0,
 });

 setLoadingCartItems(prev => {
 const next = new Set(prev);
 next.delete(product.id);
 return next;
 });

 toast.success(`${product.name} adicionado ao carrinho 🛍️`);
 }, 500);
 };

    return (
        <div className="min-h-screen pt-20 bg-background-light bg-background-dark">
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
                            <details className="group open:pb-4 border-b border-border" open>
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
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-card bg-[#2c3640]"
                                            />
                                            <span className="text-sm text-muted-foreground text-muted-foreground">{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </details>

                            {/* Store Filter */}
                            <details className="group open:pb-4 border-b border-border" open>
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
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-card bg-[#2c3640]"
                                            />
                                            <span className="text-sm text-muted-foreground text-muted-foreground">{store.name}</span>
                                            {store.isVerified && <span className="text-primary text-xs">✓</span>}
                                        </label>
                                    ))}
                                </div>
                            </details>

                            {/* Availability Filter */}
                            <details className="group open:pb-4 border-b border-border" open>
                                <summary className="flex cursor-pointer items-center justify-between py-3 list-none">
                                    <span className="text-sm font-bold text-foreground text-black">Disponibilidade</span>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                                </summary>
                                <div className="space-y-2 pt-1 pb-2 pl-1">
                                    {([
                                        { value: 'all', label: 'Todos' },
                                        { value: 'in_stock', label: 'Em stock' },
                                        { value: 'out_of_stock', label: 'Esgotado' },
                                    ] as const).map(opt => (
                                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="availability"
                                                value={opt.value}
                                                checked={availabilityFilter === opt.value}
                                                onChange={() => { setAvailabilityFilter(opt.value); setCurrentPage(1); }}
                                                className="w-4 h-4 border-border text-primary focus:ring-primary bg-card"
                                            />
                                            <span className="text-sm text-muted-foreground">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </details>
                        </div>
                    </aside>

                    {/* Main Products Area */}
                    <main className="flex-1 min-w-0">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder={t('searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-card rounded-lg border border-border shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-foreground placeholder-muted-foreground"
                                />
                            </div>
                        </div>

                        {/* Categorias Section */}
                        {categories.filter(c => c.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-foreground text-black mb-4">Categorias</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.filter(c => c.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).slice(0, 3).map((cat) => (
                                        <div key={cat.id} className="bg-card bg-[#1e2832] p-4 rounded-xl border border-border border-[#2e3a45] shadow-sm flex items-center justify-between cursor-pointer hover:border-primary transition-colors" onClick={() => handleCategoryToggle(cat.id)}>
                                            <span className="font-semibold text-foreground text-black">{cat.name}</span>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lojas Section */}
                        {stores.filter(s => s.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-foreground text-black mb-4">Lojas</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {stores.filter(s => s.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).slice(0, 3).map((store) => (
                                        <Link key={store.id} href={`/${locale}/store/${(store as any).slug || store.id}`} className="bg-card bg-[#1e2832] p-4 rounded-xl border border-border border-[#2e3a45] shadow-sm flex flex-col gap-2 hover:border-primary transition-colors">
                                            <div className="flex items-center gap-3">
                                                {store.logoUrl ? (
                                                    <Image src={store.logoUrl} alt={store.name} width={40} height={40} className="rounded-full object-cover bg-muted" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-bold">
                                                        {store.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-semibold text-foreground text-black flex items-center gap-1">
                                                        {store.name}
                                                        {store.isVerified && <span className="text-primary text-xs">✓</span>}
                                                    </h3>
                                                    {store.rating && (
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <div className="flex text-yellow-400">{renderStars(store.rating || 0)}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

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
                                    className="appearance-none bg-muted bg-[#2c3640] border border-border text-foreground text-black text-sm font-medium rounded-lg h-9 pl-4 pr-10 focus:ring-2 focus:ring-primary cursor-pointer focus:outline-none"
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
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <SkeletonProductCard key={i} />
                                ))}
                            </div>
                        ) : products.length === 0 && (selectedCategories.length > 0 || selectedStores.length > 0) ? (
                            <EmptySearchResults query="" />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/${locale}/product/${product.slug}`}
                                        className="group flex flex-col bg-card bg-[#1e2832] rounded-xl border border-border border-[#2e3a45] overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                                    >
                                        <div className="relative aspect-square bg-card bg-[#121212] overflow-hidden p-4 border-b border-border">
                                            {product.images[0] && (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                                                />
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleWishlistToggle(product.id, product.name);
                                                }}
                                                className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all backdrop-blur-sm border ${
                                                    wishlistItems.has(product.id)
                                                        ? 'bg-red-500/90 text-white border-red-500'
                                                        : 'bg-card/90 bg-black/50 hover:bg-card text-muted-foreground hover:text-red-500 border-transparent'
                                                }`}
                                            >
                                                <Heart className={`w-5 h-5 ${wishlistItems.has(product.id) ? 'fill-current' : ''}`} />
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
                                                    <p className="text-xs text-muted-foreground line-through">AOA {product.originalPrice.toFixed(2)}</p>
                                                )}
                                                <div className="flex items-baseline gap-2 mb-3">
                                                    <p className="text-xl font-bold text-primary">AOA {product.price.toFixed(2)}</p>
                                                </div>

                                                <LoadingButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToCart(product);
                                                    }}
                                                    loading={loadingCartItems.has(product.id)}
                                                    disabled={product.stockQuantity === 0}
                                                    variant="default"
                                                    size="sm"
                                                    leftIcon={<ShoppingCart className="h-4 w-4" />}
                                                    className="w-full"
                                                >
                                                    {product.stockQuantity === 0 ? t('products.outOfStock') : t('products.addToCart')}
                                                </LoadingButton>
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
                                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${currentPage === 1
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-white hover:bg-muted hover:bg-card/5'
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
