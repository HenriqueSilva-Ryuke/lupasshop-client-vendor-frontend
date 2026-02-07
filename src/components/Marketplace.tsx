'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Heart, ShoppingCart, Search, Menu, X, Star, MapPin, TrendingUp, Package, Loader } from 'lucide-react';
import Link from 'next/link';
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
 currency: string;
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


export default function Marketplace() {
 const tHome = useTranslations('home');
 const tMarket = useTranslations('marketplace');
 const locale = useLocale();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [favorites, setFavorites] = useState<Set<string>>(new Set());
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

 // Fetch data from backend using TanStack Query
 const { data: featuredProducts = [], isLoading: productsLoading } = useFeaturedProducts(5);
 const { data: featuredStores = [], isLoading: storesLoading } = useFeaturedStores(4);
 const { data: backendCategories = [], isLoading: categoriesLoading } = useCategories();
 const { data: searchData } = useSearchProducts(searchQuery, 5);

 const categories = backendCategories.map((cat: any) => ({
 id: cat.id,
 name: cat.name,
 icon: cat.icon || '📦',
 count: cat.productsCount || 0,
 }));

 const displayProducts = featuredProducts.map((prod: any) => ({
 id: prod.id,
 name: prod.name,
 image: prod.images?.[0] || '',
 price: prod.price,
 originalPrice: prod.originalPrice,
 currency: prod.currency || 'AOA',
 rating: prod.rating || 0,
 reviews: prod.reviewCount || 0,
 store: prod.store?.name || '',
 }));

 const displayStores = featuredStores.map((store: any) => ({
 id: store.id,
 name: store.name,
 logo: store.logoUrl || '',
 rating: store.rating || 0,
 salesCount: store.reviewCount || 0,
 }));

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
 <div className="min-h-screen bg-background">
 {/* Header */}
 <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 {/* Logo */}
 <div className="flex items-center gap-2">
 <Package className="w-6 h-6 text-primary" />
 <span className="text-xl font-bold text-primary">LupaShop</span>
 </div>

 {/* Navigation - Desktop */}
 <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
 <Link href="#" className="text-foreground hover:text-primary transition">
 {tMarket('navbar.home')}
 </Link>
 <Link href="#" className="text-foreground hover:text-primary transition">
 {tMarket('navbar.products')}
 </Link>
 <Link href="#" className="text-foreground hover:text-primary transition">
 {tMarket('navbar.stores')}
 </Link>
 <Link href="#" className="text-foreground hover:text-primary transition">
 {tMarket('navbar.deals')}
 </Link>
 </nav>

 {/* Right side actions */}
 <div className="hidden md:flex items-center gap-4">
 <button className="p-2 hover:bg-muted rounded-lg transition">
 <Heart className="w-6 h-6 text-foreground" />
 </button>
 <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition">
 <ShoppingCart className="w-6 h-6 text-foreground" />
 <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
 0
 </span>
 </Link>
 <Link href="/${locale}/auth/login" className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition font-medium">
 {tMarket('navbar.login')}
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
 <div className="md:hidden bg-muted border-t border-border">
 <div className="px-4 py-4 space-y-3">
 <Link href="#" className="block text-foreground">Home</Link>
 <Link href="#" className="block text-foreground">Products</Link>
 <Link href="#" className="block text-foreground">Stores</Link>
 <Link href="/${locale}/auth/login" className="block text-primary font-medium">Login</Link>
 </div>
 </div>
 )}
 </header>

 {/* Hero / Search Section */}
 <section className="bg-gradient-to-br from-primary to-purple-900 text-black py-12 md:py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-8">
 <h1 className="text-3xl md:text-4xl font-bold mb-3">{tHome('hero.title')}</h1>
 <p className="text-primary100 text-lg">{tHome('hero.subtitle')}</p>
 </div>

 {/* Search Bar */}
 <div className="flex gap-2 max-w-2xl mx-auto">
 <div className="flex-1 relative">
 <input
 type="text"
 placeholder="Search products..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400"
 />
 <Search className="absolute right-3 top-3.5 text-muted-foreground" size={20} />
 </div>
 <button className="px-6 py-3 bg-card text-primary rounded-lg font-semibold hover:bg-muted transition">
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
 <button className="bg-card text-red-500 px-4 py-2 rounded font-semibold hover:bg-destructive/10 transition">
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
 <button className="bg-card text-primary px-4 py-2 rounded font-semibold hover:bg-primary50 transition">
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
 <button className="bg-card text-green-500 px-4 py-2 rounded font-semibold hover:bg-green-50 transition">
 Browse
 </button>
 </div>
 </div>
 </section>

 {/* Categories */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <h2 className="text-2xl font-bold mb-6 text-foreground">Shop by Category</h2>
 {categoriesLoading ? (
 <div className="flex justify-center py-8">
 <Loader className="w-6 h-6 animate-spin text-primary" />
 </div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
 {categories.map((category: any) => (
 <button
 key={category.id}
 onClick={() => setSelectedCategory(category.id)}
 className={`p-4 rounded-lg text-center transition ${selectedCategory === category.id
 ? 'bg-primary text-black'
 : 'bg-muted text-foreground hover:bg-accent200'
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
 <h2 className="text-2xl font-bold text-foreground">Flash Deals</h2>
 <Link href="#" className="text-primary hover:text-primary900 font-semibold flex items-center gap-2">
 View All
 <span>→</span>
 </Link>
 </div>

 {productsLoading ? (
 <div className="flex justify-center py-12">
 <Loader className="w-8 h-8 animate-spin text-primary" />
 </div>
 ) : displayProducts.length === 0 ? (
 <div className="py-12 text-center text-muted-foreground">Sem produtos em destaque</div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 {displayProducts.slice(0, 5).map((product) => (
 <div
 key={product.id}
 className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-border"
 >
 {/* Product Image */}
 <div className="relative aspect-square overflow-hidden group">
 {product.image ? (
 <Image
 src={product.image}
 alt={product.name}
 fill
 className="object-cover group-hover:scale-110 transition duration-300"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
 Sem imagem
 </div>
 )}
 {product.originalPrice && (
 <div className="absolute top-2 right-2 bg-destructive/100 text-black px-3 py-1 rounded-full text-sm font-bold">
 -{getDiscountPercent(product.price, product.originalPrice)}%
 </div>
 )}
 <button
 onClick={() => toggleFavorite(product.id)}
 className="absolute top-2 left-2 p-2 bg-card rounded-full hover:bg-muted transition"
 >
 <Heart
 className={`w-5 h-5 ${favorites.has(product.id)
 ? 'fill-red-500 text-red-500'
 : 'text-muted-foreground'
 }`}
 />
 </button>
 </div>

 {/* Product Info */}
 <div className="p-4">
 <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
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
 <span className="text-xs text-muted-foreground">
 {product.rating} ({product.reviews})
 </span>
 </div>

 {/* Price */}
 <div className="mb-3">
 <div className="flex items-baseline gap-2">
 <span className="text-lg font-bold text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: product.currency }).format(product.price)}
 </span>
 {product.originalPrice && (
 <span className="text-sm text-muted-foreground line-through">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: product.currency }).format(product.originalPrice)}
 </span>
 )}
 </div>
 </div>

 {/* Store Info */}
 <p className="text-xs text-muted-foreground mb-3">
 by {product.store}
 </p>

 {/* Add to Cart Button */}
 <button className="w-full bg-primary hover:bg-primary900 text-black py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
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
 <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Stores</h2>
 {storesLoading ? (
 <div className="flex justify-center py-8">
 <Loader className="w-6 h-6 animate-spin text-primary" />
 </div>
 ) : displayStores.length === 0 ? (
 <div className="py-8 text-center text-muted-foreground">Sem lojas em destaque</div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {displayStores.map((store) => (
 <div
 key={store.id}
 className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition border border-border"
 >
 <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-2xl mb-4 overflow-hidden bg-primary text-black">
 {store.logo ? (
 <Image
 src={store.logo}
 alt={store.name}
 width={64}
 height={64}
 className="object-cover"
 />
 ) : (
 <span>{store.name.substring(0, 2).toUpperCase()}</span>
 )}
 </div>
 <h3 className="font-bold text-foreground mb-2">{store.name}</h3>
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
 <span className="text-xs text-muted-foreground ml-1">
 {store.rating}
 </span>
 </div>
 <p className="text-sm text-muted-foreground mb-4">
 {store.salesCount.toLocaleString()} sales
 </p>
 <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-black py-2 rounded-lg font-semibold transition">
 {tMarket('visitStore')}
 </button>
 </div>
 ))}
 </div>
 )}
 </section>

 {/* Footer */}
 <footer className="bg-muted text-black mt-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
 {/* Company Info */}
 <div>
 <div className="flex items-center gap-2 mb-4">
 <Package className="w-6 h-6 text-primary" />
 <span className="text-xl font-bold">LupaShop</span>
 </div>
 <p className="text-muted-foreground">{tMarket('tagline')}</p>
 <div className="flex gap-4 mt-4">
 <a href="#" className="text-muted-foreground hover:text-black">Facebook</a>
 <a href="#" className="text-muted-foreground hover:text-black">Twitter</a>
 <a href="#" className="text-muted-foreground hover:text-black">Instagram</a>
 </div>
 </div>

 {/* Quick Links */}
 <div>
 <h4 className="font-bold mb-4">Company</h4>
 <ul className="space-y-2 text-muted-foreground">
 <li><a href="#" className="hover:text-black">About Us</a></li>
 <li><a href="#" className="hover:text-black">Careers</a></li>
 <li><a href="#" className="hover:text-black">Blog</a></li>
 <li><a href="#" className="hover:text-black">Press</a></li>
 </ul>
 </div>

 {/* Support */}
 <div>
 <h4 className="font-bold mb-4">Support</h4>
 <ul className="space-y-2 text-muted-foreground">
 <li><a href="#" className="hover:text-black">Help Center</a></li>
 <li><a href="#" className="hover:text-black">Contact Us</a></li>
 <li><a href="#" className="hover:text-black">Shipping Info</a></li>
 <li><a href="#" className="hover:text-black">Returns</a></li>
 </ul>
 </div>

 {/* Legal */}
 <div>
 <h4 className="font-bold mb-4">Legal</h4>
 <ul className="space-y-2 text-muted-foreground">
 <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
 <li><a href="#" className="hover:text-black">Terms of Service</a></li>
 <li><a href="#" className="hover:text-black">Cookie Policy</a></li>
 <li><a href="#" className="hover:text-black">Security</a></li>
 </ul>
 </div>
 </div>

 <div className="border-t border-border pt-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
 <div className="text-center">
 <div className="text-2xl font-bold text-primary">100K+</div>
 <p className="text-muted-foreground text-sm">Products</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-primary">50K+</div>
 <p className="text-muted-foreground text-sm">Sellers</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-primary">1M+</div>
 <p className="text-muted-foreground text-sm">Happy Customers</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-primary">24/7</div>
 <p className="text-muted-foreground text-sm">Customer Support</p>
 </div>
 </div>

 <div className="text-center text-muted-foreground text-sm">
 <p>&copy; 2024 LupaShop. All rights reserved.</p>
 </div>
 </div>
 </div>
 </footer>
 </div>
 );
}
