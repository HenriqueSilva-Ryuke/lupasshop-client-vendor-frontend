'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Bell, X, Store, Package, Tag } from 'lucide-react';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useDebounce } from '@/hooks/useDebounce';

export default function NavbarWithSearch() {
  const t = useTranslations('navbar');
  const tm = useTranslations('marketplace');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { data: searchResults, isLoading } = useGlobalSearch(debouncedSearchQuery, 5);

  const isMarketplacePage = pathname.includes('/marketplace');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchMode && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchMode]);

  useEffect(() => {
    if (!isMarketplacePage) {
      setIsSearchMode(false);
      setSearchQuery('');
    }
  }, [isMarketplacePage]);

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const isActiveLink = (href: string) => {
    const hrefWithoutLocale = href.replace(`/${locale}`, '') || '/';
    return pathWithoutLocale === hrefWithoutLocale;
  };

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/marketplace`, label: 'Marketplace' },
    { href: `/${locale}/about`, label: t('about') }
  ];

  const handleSearchClick = () => {
    setIsSearchMode(true);
  };

  const handleCloseSearch = () => {
    setIsSearchMode(false);
    setSearchQuery('');
  };

  const handleResultClick = (type: 'product' | 'store', slug: string) => {
    setIsSearchMode(false);
    setSearchQuery('');
    router.push(`/${locale}/${type === 'product' ? 'product' : 'store'}/${slug}`);
  };

  return (
    <>
      <motion.nav
        className={`sticky top-4 z-50 transition-all duration-500 w-fit mx-auto left-0 right-0 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-xl shadow-2xl rounded-full border border-border/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="px-4 py-2">
          {!isSearchMode ? (
            <div className="flex items-center justify-between gap-6">
              {/* Logo */}
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="shrink-0"
              >
                <Link href={`/${locale}`} className="flex items-center space-x-3 group">
                  <div
                    className={`relative p-3 rounded-full transition-all duration-500 ${
                      isScrolled
                        ? 'bg-primary shadow-lg'
                        : 'bg-card/10 backdrop-blur-sm border border-border/20'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 transition-all duration-500 ${
                        isScrolled ? 'text-black' : 'text-foreground'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${
                        isScrolled ? 'border-primary-light' : 'border-border/30'
                      }`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span
                    className={`text-lg font-bold transition-all duration-500 ${
                      isScrolled ? 'text-foreground' : 'text-black'
                    }`}
                  >
                    LupaShop
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        isActiveLink(item.href)
                          ? 'bg-primary text-black shadow-lg'
                          : isScrolled
                          ? 'text-muted-foreground hover:text-black hover:bg-primary'
                          : 'text-black/80 hover:text-black hover:bg-primary/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-3">
                {isMarketplacePage && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearchClick}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      isScrolled
                        ? 'bg-muted text-foreground hover:bg-gray-200'
                        : 'bg-card/20 text-black hover:bg-card/30'
                    }`}
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}

                <button
                  className={`relative p-2.5 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-black hover:bg-card/20'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-border"></span>
                </button>

                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    isScrolled
                      ? 'bg-primary text-black hover:bg-primary-dark shadow-lg'
                      : 'bg-card/20 text-black hover:bg-card/30'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">{tm('cart')}</span>
                </button>

                <div className="hidden md:flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                      isScrolled
                        ? 'text-muted-foreground border-border hover:border-border hover:text-foreground'
                        : 'text-black/80 border-border/30 hover:border-border/50 hover:text-black'
                    }`}
                  >
                    {t('login')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isScrolled
                        ? 'bg-primary text-black hover:bg-primary-dark shadow-lg'
                        : 'bg-card/20 backdrop-blur-sm text-black border border-border/30 hover:bg-card/30'
                    }`}
                  >
                    {t('signup')}
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            // Search Mode
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tm('search.placeholder')}
                  className="w-full pl-12 pr-4 py-3 bg-muted bg-gray-800 rounded-full text-foreground text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleCloseSearch}
                className="p-2.5 hover:bg-muted hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isSearchMode && searchQuery.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 -translate-x-1/2 top-24 w-full max-w-2xl z-40 px-4"
          >
            <div className="bg-card bg-muted rounded-2xl shadow-2xl border border-border border-border overflow-hidden">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-3">{tm('search.searching')}</p>
                </div>
              ) : searchResults && (searchResults.products.length > 0 || searchResults.stores.length > 0 || searchResults.categories.length > 0) ? (
                <div className="max-h-[70vh] overflow-y-auto">
                  {/* Products */}
                  {searchResults.products.length > 0 && (
                    <div className="p-4 border-b border-gray-100 border-border">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase mb-3">
                        <Package className="w-4 h-4" />
                        {tm('search.products')}
                      </div>
                      {searchResults.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleResultClick('product', product.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted hover:bg-gray-800 rounded-lg transition-colors text-left"
                        >
                          <div className="w-12 h-12 bg-muted bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                            {product.images[0] && (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-black truncate">{product.name}</p>
                            <p className="text-sm text-primary font-bold">R$ {product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="text-yellow-500">★</span>
                            {product.rating.toFixed(1)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Stores */}
                  {searchResults.stores.length > 0 && (
                    <div className="p-4 border-b border-gray-100 border-border">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase mb-3">
                        <Store className="w-4 h-4" />
                        {tm('search.stores')}
                      </div>
                      {searchResults.stores.map((store) => (
                        <button
                          key={store.id}
                          onClick={() => handleResultClick('store', store.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted hover:bg-gray-800 rounded-lg transition-colors text-left"
                        >
                          <div className="w-12 h-12 bg-muted bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                            {store.logoUrl && (
                              <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-black truncate flex items-center gap-2">
                              {store.name}
                              {store.isVerified && (
                                <span className="text-blue-500 text-xs">✓</span>
                              )}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="text-yellow-500">★</span>
                              {store.rating.toFixed(1)}
                              <span>•</span>
                              <span>{store.reviewCount} avaliações</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Categories */}
                  {searchResults.categories.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase mb-3">
                        <Tag className="w-4 h-4" />
                        {tm('search.categories')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/${locale}/marketplace?category=${category.slug}`}
                            onClick={handleCloseSearch}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-black transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">{tm('search.noResults', { query: searchQuery })}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Backdrop */}
      {isSearchMode && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={handleCloseSearch}
        />
      )}
    </>
  );
}
