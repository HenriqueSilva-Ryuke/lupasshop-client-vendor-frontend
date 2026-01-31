'use client';

import React, { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Mail,
  Heart,
  ShoppingCart,
  Star,
  Share2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStores } from '@/hooks/useStores';
import Button from '@/components/ui/Button';

export default function StorePage() {
  const locale = useLocale();
  
  // Extrair slug da URL pathname
  const pathParts = typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean) : [];
  const slug = pathParts[pathParts.length - 1] || '';
  
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevant');
  const productsPerPage = 12;

  // Fetch store by slug - vamos usar o hook e filtrar por slug
  const { data: allStores = [], isLoading: storesLoading } = useStores({ limit: 100 });
  
  const store = useMemo(() => {
    return allStores.find((s: any) => s.slug === slug);
  }, [allStores, slug]);

  const storeProducts = useMemo(() => {
    if (!store?.products) return [];
    
    let sorted = [...store.products];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        sorted.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    
    return sorted;
  }, [store?.products, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return storeProducts.slice(start, start + productsPerPage);
  }, [storeProducts, currentPage]);

  const totalPages = Math.ceil(storeProducts.length / productsPerPage);

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

  if (storesLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white text-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando loja...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!store) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Loja não encontrada</h1>
          <p className="text-gray-600 mb-6">A loja que você procura não existe ou foi removida.</p>
          <Link href={`/${locale}/marketplace`} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            Voltar ao Marketplace
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href={`/${locale}`} className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/${locale}/marketplace`} className="text-gray-600 hover:text-primary transition-colors">Lojas</Link>
              <span className="text-gray-400">/</span>
              <span className="text-black font-medium">{store.name}</span>
            </div>
          </div>
        </div>

        {/* Store Header Background */}
        <div className="bg-white pb-0">
          <div
            className="h-48 md:h-64 w-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${store.coverImageUrl || 'https://via.placeholder.com/1200x300'})`,
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Store Info Card */}
            <div className="relative -mt-16 mb-4 flex flex-col md:flex-row gap-6 items-start md:items-end pb-6 border-b border-gray-200">
              {/* Logo */}
              <div className="relative group">
                <div className="size-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                  <img
                    alt={`${store.name} Logo`}
                    className="w-full h-full object-cover"
                    src={store.logoUrl || `https://via.placeholder.com/128`}
                  />
                </div>
                {store.isVerified && (
                  <div className="absolute bottom-1 right-1 text-primary border-2 border-white rounded-full size-6 flex items-center justify-center" title="Loja Verificada">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Store Details */}
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-black">{store.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1 text-yellow-500 font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {(store.rating || 0).toFixed(1)} ({store.reviewCount || 0} avaliações)
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{store.description || 'Loja de qualidade'}</span>
                    {store.isVerified && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-primary font-medium flex items-center gap-1">
                          ✓ Loja Verificada
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    variant="default"
                    className="flex-1 md:flex-none h-10 px-6 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Seguir Loja
                  </Button>
                  <Button
                    variant="icon"
                    className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-black hover:bg-accent50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="icon"
                    className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-black hover:bg-accent50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 overflow-x-auto no-scrollbar">
              <a href="#products" className="pb-3 border-b-[3px] border-primary text-primary font-bold text-sm whitespace-nowrap">
                Produtos
              </a>
              <a href="#reviews" className="pb-3 border-b-[3px] border-transparent text-gray-600 hover:text-black font-medium text-sm whitespace-nowrap transition-colors">
                Avaliações da Loja
              </a>
              <a href="#about" className="pb-3 border-b-[3px] border-transparent text-gray-600 hover:text-black font-medium text-sm whitespace-nowrap transition-colors">
                Sobre {store.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Store Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-black">Informações da Loja</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Endereço</p>
                      <p className="text-sm text-black">{store.location || 'Endereço não informado'}</p>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Horário</p>
                      <p className="text-sm text-black">Seg-Sex: 09h - 18h</p>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Contato</p>
                      <p className="text-sm text-black break-all">{store.owner?.email || 'contato@loja.com.br'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-black">Filtros</h3>
                  <button className="text-xs font-medium text-primary hover:underline">Limpar</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-3 text-black">Ordenar</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white text-black"
                    >
                      <option value="relevant">Mais Relevantes</option>
                      <option value="price-low">Menor Preço</option>
                      <option value="price-high">Maior Preço</option>
                      <option value="newest">Mais Recentes</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="col-span-1 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-sm text-gray-600">
                  Exibindo <span className="font-bold text-black">{Math.min((currentPage - 1) * productsPerPage + 1, storeProducts.length)}-{Math.min(currentPage * productsPerPage, storeProducts.length)}</span> de{' '}
                  <span className="font-bold text-black">{storeProducts.length}</span> produtos
                </p>
              </div>

              {paginatedProducts.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">Nenhum produto encontrado nesta loja.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product: any, idx: number) => (
                    <motion.article
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          src={product.images?.[0] || 'https://via.placeholder.com/300'}
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="absolute top-3 right-3 size-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-md"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart className={`w-5 h-5 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </motion.button>
                        {product.discount && (
                          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            -{product.discount}%
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-xs text-gray-600 mb-1 uppercase font-medium">{product.category?.name || 'Produtos'}</p>
                        <h3 className="font-medium text-black mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="mt-auto pt-3 space-y-3">
                          <div className="flex items-end gap-2">
                            <p className="text-xl font-bold text-black">R$ {(product.price || 0).toFixed(2)}</p>
                            {product.originalPrice && (
                              <p className="text-xs text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</p>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg h-9 flex items-center justify-center gap-2 font-bold text-xs transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Adicionar
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-accent50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    {[...Array(Math.min(3, totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`size-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary text-white'
                              : 'border border-gray-200 text-black hover:bg-accent50'
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}

                    {totalPages > 3 && (
                      <>
                        <span className="text-gray-600 px-2">...</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setCurrentPage(totalPages)}
                          className={`size-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                            currentPage === totalPages
                              ? 'bg-primary text-white'
                              : 'border border-gray-200 text-black hover:bg-accent50'
                          }`}
                        >
                          {totalPages}
                        </motion.button>
                      </>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-accent50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
