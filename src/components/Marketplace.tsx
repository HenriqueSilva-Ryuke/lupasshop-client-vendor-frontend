'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Search, Menu, X, Star, MapPin, TrendingUp, Package, Loader } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { useFeaturedStores } from '@/hooks/useFeaturedStores';
import { useCategories } from '@/hooks/useCategories';
import { useSearchProducts } from '@/hooks/useSearchProducts';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  store: string;
}

interface Store {
  id: string;
  name: string;
  logo: string;
  rating: number;
  salesCount: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

// Mock data - será substituído por dados do backend
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 2341,
    store: 'TechHub Store'
  },
  {
    id: '2',
    name: 'Professional Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a083244fa7?w=400&h=400&fit=crop',
    price: 1299.99,
    originalPrice: 1799.99,
    rating: 4.9,
    reviews: 1205,
    store: 'PhotoPro'
  },
  {
    id: '3',
    name: 'Elegant Wristwatch',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop',
    price: 199.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviews: 856,
    store: 'Luxury Watch Co'
  },
  {
    id: '4',
    name: 'Running Shoes Pro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 3412,
    store: 'SportsGear'
  },
  {
    id: '5',
    name: 'Smart Home Hub',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 1923,
    store: 'TechHub Store'
  },
  {
    id: '6',
    name: 'Portable Speaker',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=400&h=400&fit=crop',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 2156,
    store: 'AudioMax'
  },
];

const mockStores: Store[] = [
  { id: '1', name: 'TechHub Store', logo: 'TH', rating: 4.8, salesCount: 12543 },
  { id: '2', name: 'Fashion Forward', logo: 'FF', rating: 4.7, salesCount: 8934 },
  { id: '3', name: 'Home Essentials', logo: 'HE', rating: 4.6, salesCount: 6421 },
  { id: '4', name: 'Beauty & Care', logo: 'BC', rating: 4.9, salesCount: 9876 },
];

const defaultCategories: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱', count: 1543 },
  { id: '2', name: 'Fashion', icon: '👕', count: 3421 },
  { id: '3', name: 'Home & Garden', icon: '🏠', count: 2156 },
  { id: '4', name: 'Beauty', icon: '💄', count: 1834 },
  { id: '5', name: 'Sports', icon: '⚽', count: 912 },
  { id: '6', name: 'Books & Toys', icon: '📚', count: 1543 },
];

export default function Marketplace() {
  const tHome = useTranslations('home');
  const tMarket = useTranslations('marketplace');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch data from backend using TanStack Query
  const { data: featuredProducts = [], isLoading: productsLoading } = useFeaturedProducts(5);
  const { data: featuredStores = [], isLoading: storesLoading } = useFeaturedStores(4);
  const { data: backendCategories = [], isLoading: categoriesLoading } = useCategories();
  const { data: searchData } = useSearchProducts(searchQuery, 5);

  // Use backend categories if available, otherwise use defaults
  const categories = backendCategories.length > 0 ? backendCategories.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon || '📦',
    count: cat.productsCount || 0,
  })) : defaultCategories;

  // Use featured products or mock data as fallback
  const displayProducts = featuredProducts.length > 0 ? featuredProducts.map((prod: any) => ({
    id: prod.id,
    name: prod.name,
    image: prod.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: prod.price,
    originalPrice: prod.originalPrice,
    rating: prod.rating || 4.5,
    reviews: prod.reviewsCount || 0,
    store: prod.store?.name || 'Unknown Store',
  })) : mockProducts;

  // Use featured stores or mock data as fallback
  const displayStores = featuredStores.length > 0 ? featuredStores.map((store: any) => ({
    id: store.id,
    name: store.name,
    logo: store.logo || store.name.substring(0, 2).toUpperCase(),
    rating: store.rating,
    salesCount: store.salesCount,
  })) : mockStores;

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-100 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-[#412778]" />
              <span className="text-xl font-bold text-[#412778]">LupaShop</span>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-[#412778] transition">
                {t('navbar.home')}
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-[#412778] transition">
                {t('navbar.products')}
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-[#412778] transition">
                {t('navbar.stores')}
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-[#412778] transition">
                {t('navbar.deals')}
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <Link href="/dashboard/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#412778] text-black text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/dashboard/auth/login" className="px-4 py-2 text-[#412778] border border-[#412778] rounded-lg hover:bg-[#412778] hover:text-black transition font-medium">
                {t('navbar.login')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <Link href="#" className="block text-gray-700 dark:text-gray-300">Home</Link>
              <Link href="#" className="block text-gray-700 dark:text-gray-300">Products</Link>
              <Link href="#" className="block text-gray-700 dark:text-gray-300">Stores</Link>
              <Link href="/dashboard/auth/login" className="block text-[#412778] font-medium">Login</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero / Search Section */}
      <section className="bg-gradient-to-br from-[#412778] to-purple-900 text-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{tHome('hero.title')}</h1>
            <p className="text-purple-100 text-lg">{tHome('hero.subtitle')}</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
            </div>
            <button className="px-6 py-3 bg-white text-[#412778] rounded-lg font-semibold hover:bg-gray-100 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Promo Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flash Sale */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-bold">Flash Sales</h3>
            </div>
            <p className="text-red-100 mb-4">Up to 60% off selected items</p>
            <button className="bg-white text-red-500 px-4 py-2 rounded font-semibold hover:bg-red-50 transition">
              Shop Now
            </button>
          </div>

          {/* New Collection */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-6 h-6" />
              <h3 className="text-lg font-bold">New Collection</h3>
            </div>
            <p className="text-blue-100 mb-4">Latest trends just arrived</p>
            <button className="bg-white text-blue-500 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition">
              Explore
            </button>
          </div>

          {/* Renew Your Home */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-6 h-6" />
              <h3 className="text-lg font-bold">Renew Your Home</h3>
            </div>
            <p className="text-green-100 mb-4">Home essentials on sale</p>
            <button className="bg-white text-green-500 px-4 py-2 rounded font-semibold hover:bg-green-50 transition">
              Browse
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">Shop by Category</h2>
        {categoriesLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-[#412778]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition ${
                  selectedCategory === category.id
                    ? 'bg-[#412778] text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-black hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-medium text-sm">{category.name}</p>
                <p className="text-xs opacity-75">{category.count} items</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Flash Deals Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-black">Flash Deals</h2>
          <Link href="#" className="text-[#412778] hover:text-purple-900 font-semibold flex items-center gap-2">
            View All
            <span>→</span>
          </Link>
        </div>

        {productsLoading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-[#412778]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {displayProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      -{getDiscountPercent(product.price, product.originalPrice)}%
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 left-2 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-black line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-black">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Store Info */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    by {product.store}
                  </p>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-[#412778] hover:bg-purple-900 text-black py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Stores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">Featured Stores</h2>
        {storesLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-[#412778]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayStores.map((store) => (
              <div
                key={store.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 mx-auto bg-[#412778] text-black rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  {store.logo}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-black mb-2">{store.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(store.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    {store.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {store.salesCount.toLocaleString()} sales
                </p>
                <button className="w-full border-2 border-[#412778] text-[#412778] hover:bg-[#412778] hover:text-black py-2 rounded-lg font-semibold transition">
                  {tMarket('visitStore')}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-[#412778]" />
                <span className="text-xl font-bold">LupaShop</span>
              </div>
              <p className="text-gray-400">{tMarket('tagline')}</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-black">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-black">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-black">Instagram</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-black">About Us</a></li>
                <li><a href="#" className="hover:text-black">Careers</a></li>
                <li><a href="#" className="hover:text-black">Blog</a></li>
                <li><a href="#" className="hover:text-black">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-black">Help Center</a></li>
                <li><a href="#" className="hover:text-black">Contact Us</a></li>
                <li><a href="#" className="hover:text-black">Shipping Info</a></li>
                <li><a href="#" className="hover:text-black">Returns</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                <li><a href="#" className="hover:text-black">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-black">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#412778]">100K+</div>
                <p className="text-gray-400 text-sm">Products</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#412778]">50K+</div>
                <p className="text-gray-400 text-sm">Sellers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#412778]">1M+</div>
                <p className="text-gray-400 text-sm">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#412778]">24/7</div>
                <p className="text-gray-400 text-sm">Customer Support</p>
              </div>
            </div>

            <div className="text-center text-gray-400 text-sm">
              <p>&copy; 2024 LupaShop. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
