'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useProductBySlug } from '@/hooks/useProducts';
import type { Product } from '@/graphql/types';

function formatMoney(value?: number | null, currency = 'BRL', locale: string = 'pt-BR') {
 if (value == null) return '—';
 try {
 return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
 } catch (err) {
 return value.toString();
 }
}

function ProductSkeleton() {
 return (
 <div className="max-w-[1280px] mx-auto px-4 py-12 space-y-8 animate-pulse">
 <div className="h-6 w-48 bg-slate-200 bg-slate-800 rounded" />
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 <div className="lg:col-span-7 space-y-4">
 <div className="w-full aspect-[4/3] bg-slate-200 bg-slate-800 rounded-xl" />
 <div className="grid grid-cols-5 gap-3">
 {Array.from({ length: 5 }).map((_, i) => (
 <div key={i} className="aspect-square rounded-lg bg-slate-200 bg-slate-800" />
 ))}
 </div>
 </div>
 <div className="lg:col-span-5 space-y-4">
 <div className="h-6 w-64 bg-slate-200 bg-slate-800 rounded" />
 <div className="h-10 w-48 bg-slate-200 bg-slate-800 rounded" />
 <div className="h-10 w-full bg-slate-200 bg-slate-800 rounded" />
 </div>
 </div>
 </div>
 );
}

export default function ProductDetailPage() {
 const params = useParams();
 const locale = (params?.locale as string) || 'pt';
 const slug = (params?.slug as string) || '';
 const [selectedImage, setSelectedImage] = useState(0);

 const { data: productData, isLoading } = useProductBySlug(slug);

 const product: Product | null = useMemo(() => {
    return productData ?? null;
  }, [productData]);

 const images = useMemo(() => {
 if (!product?.images) return [] as string[];
 return Array.isArray(product.images) ? (product.images as unknown as string[]) : [];
 }, [product]);

 if (isLoading) {
 return (
 <PageTransition>
 <div className="min-h-screen bg-background-light bg-background-dark text-foreground text-black">
 <Navbar />
 <ProductSkeleton />
 <Footer />
 </div>
 </PageTransition>
 );
 }

 if (!product) {
 return (
 <PageTransition>
 <div className="min-h-screen bg-background-light bg-background-dark text-foreground text-black">
 <Navbar />
 <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
 <h1 className="text-3xl font-bold">Produto não encontrado</h1>
 <p className="text-slate-500 text-slate-400">Talvez ele tenha sido removido ou esteja indisponível no momento.</p>
 <div className="flex justify-center gap-3">
 <Link
 href={`/${locale}/marketplace`}
 className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary-dark transition-colors"
 >
 Voltar para o marketplace
 </Link>
 <Link
 href={`/${locale}`}
 className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-300 border-slate-600 text-foreground text-black font-semibold hover:bg-slate-50 hover:bg-slate-800 transition-colors"
 >
 Ir para a home
 </Link>
 </div>
 </div>
 <Footer />
 </div>
 </PageTransition>
 );
 }

 const price = formatMoney(product.price as unknown as number, product.currency || 'BRL', locale === 'pt' ? 'pt-BR' : 'en-US');
 const originalPrice = product.originalPrice
 ? formatMoney(product.originalPrice as unknown as number, product.currency || 'BRL', locale === 'pt' ? 'pt-BR' : 'en-US')
 : null;
 const rating = product.rating ?? 0;
 const reviewCount = product.reviewCount ?? 0;
 const store = product.store;

 return (
 <PageTransition>
 <div className="min-h-screen bg-background-light bg-background-dark text-foreground text-black">
 <Navbar />

 <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-6 md:px-8">
 {/* Breadcrumb */}
 <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
 <Link href={`/${locale}`} className="text-slate-500 hover:text-primary text-slate-400 font-medium transition-colors">
 Início
 </Link>
 <span className="text-slate-400 material-symbols-outlined text-[16px]">chevron_right</span>
 <Link
 href={`/${locale}/marketplace?category=${product.category?.slug ?? ''}`}
 className="text-slate-500 hover:text-primary text-slate-400 font-medium transition-colors"
 >
 {product.category?.name || 'Categoria'}
 </Link>
 <span className="text-slate-400 material-symbols-outlined text-[16px]">chevron_right</span>
 <span className="text-foreground text-black font-semibold line-clamp-1">{product.name}</span>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
 {/* Gallery */}
 <div className="lg:col-span-7 flex flex-col gap-4">
 <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-surface-dark rounded-xl overflow-hidden border border-slate-200 border-slate-700 flex items-center justify-center group shadow-sm">
 <div className="absolute top-4 right-4 z-10">
 <motion.button
 whileTap={{ scale: 0.95 }}
 className="p-2 rounded-full bg-white/80 hover:bg-white bg-slate-900/50 hover:bg-slate-900 backdrop-blur-sm text-slate-600 text-slate-300 transition-all shadow-sm"
 aria-label="Favoritar"
 >
 <span className="material-symbols-outlined">favorite</span>
 </motion.button>
 </div>
 <div
 className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-500"
 style={{ backgroundImage: `url(${images[selectedImage] || images[0] || '/placeholder.png'})` }}
 />
 </div>
 {images.length > 0 && (
 <div className="grid grid-cols-5 gap-3">
 {images.slice(0, 5).map((img, idx) => (
 <motion.button
 key={img + idx}
 whileHover={{ scale: 1.02 }}
 onClick={() => setSelectedImage(idx)}
 className={`aspect-square rounded-lg overflow-hidden relative border ${
 idx === selectedImage
 ? 'border-primary ring-2 ring-primary/20'
 : 'border-slate-200 border-slate-700 hover:border-primary/50'
 }`}
 aria-label={`Imagem ${idx + 1}`}
 >
 <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
 </motion.button>
 ))}
 {images.length < 5 && (
 <div className="aspect-square rounded-lg border border-dashed border-slate-200 border-slate-700 flex items-center justify-center text-slate-400">
 <span className="material-symbols-outlined">image</span>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Summary */}
 <div className="lg:col-span-5 relative">
 <div className="sticky top-24 flex flex-col gap-6 p-6 rounded-xl bg-surface-light bg-surface-dark border border-slate-200 border-slate-800 shadow-sm">
 <div>
 <div className="flex items-center justify-between mb-2">
 {product.isNew && (
 <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary-light">Novo</span>
 )}
 <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
 <span className="material-symbols-outlined text-[18px] fill-current">star</span>
 <span>{rating.toFixed(1)}</span>
 <span className="text-slate-400 font-normal ml-1">({reviewCount} avaliações)</span>
 </div>
 </div>
 <h1 className="text-2xl md:text-3xl font-bold leading-tight text-foreground text-black">{product.name}</h1>
 </div>

 <div className="flex flex-col">
 {originalPrice && <span className="text-slate-400 line-through text-sm">{originalPrice}</span>}
 <div className="flex items-end gap-2">
 <span className="text-3xl font-extrabold text-primary">{price}</span>
 {originalPrice && (
 <span className="text-sm text-primary text-green-400 font-medium mb-1.5">-
 {Math.round(
 ((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice || 1)) * 100
 )}%
 </span>
 )}
 </div>
 <span className="text-sm text-slate-500 text-slate-400 mt-1">Estoque: {product.stockQuantity ?? 0} unidades</span>
 </div>

 <hr className="border-slate-100 border-slate-700" />

 <div>
 <h3 className="text-sm font-medium text-foreground text-black mb-3">Vendedor</h3>
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
 {store?.name?.slice(0, 2).toUpperCase() || 'LS'}
 </div>
 <div className="flex flex-col">
 <div className="flex items-center gap-1">
 <Link href={`/${locale}/store/${store?.slug ?? store?.id ?? '#'}`} className="font-bold hover:underline">
 {store?.name ?? 'Loja LupaShop'}
 </Link>
 {store?.isVerified && <span className="material-symbols-outlined text-[16px] text-primary" title="Loja verificada">verified</span>}
 </div>
 <span className="text-xs text-slate-500">{store?.slug || 'vendedor-oficial'}</span>
 </div>
 </div>
 </div>

 <div className="flex flex-col gap-3 pt-2">
 <div className="flex gap-3 h-12">
 <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 px-1 bg-white dark:bg-slate-800 w-32">
 <button className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-foreground hover:text-black" aria-label="Diminuir quantidade">
 <span className="material-symbols-outlined text-[20px]">remove</span>
 </button>
 <input
 type="text"
 readOnly
 value="1"
 className="w-full bg-transparent border-none text-center font-semibold text-foreground dark:text-white focus:ring-0 p-0"
 />
 <button className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-foreground hover:text-black" aria-label="Aumentar quantidade">
 <span className="material-symbols-outlined text-[20px]">add</span>
 </button>
 </div>
 <motion.button
 whileHover={{ scale: 1.01 }}
 whileTap={{ scale: 0.99 }}
 className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">shopping_bag</span>
 Adicionar ao Carrinho
 </motion.button>
 </div>
 <button className="w-full h-10 rounded-lg border border-slate-300 border-slate-600 text-slate-700 text-slate-300 font-medium hover:bg-slate-50 hover:bg-slate-800 transition-colors">
 Comprar agora com 1-Click
 </button>
 </div>

 <div className="mt-2 bg-slate-50 bg-slate-800/50 rounded-lg p-3 flex items-center gap-3 border border-slate-100 border-slate-700">
 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-200 border-slate-600 overflow-hidden">
 <span className="material-symbols-outlined text-slate-400">storefront</span>
 </div>
 <div className="flex-1">
 <p className="text-xs text-slate-500 text-slate-400">Vendido e entregue por</p>
 <div className="flex items-center gap-1">
 <Link href={`/${locale}/store/${store?.slug ?? store?.id ?? '#'}`} className="font-bold text-sm hover:underline">
 {store?.name ?? 'LupaShop Store'}
 </Link>
 {store?.isVerified && <span className="material-symbols-outlined text-[14px] text-primary" title="Loja Verificada">verified</span>}
 </div>
 </div>
 <div className="text-right">
 <span className="block text-xs font-bold text-primary">{rating.toFixed(1)} <span className="material-symbols-outlined text-[10px] align-middle">star</span></span>
 <span className="text-[10px] text-slate-500">{reviewCount} avaliações</span>
 </div>
 </div>

 <div className="flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline pt-2">
 <span className="material-symbols-outlined text-[18px]">location_on</span>
 Calcular frete e prazo
 </div>
 </div>
 </div>
 </div>

 {/* Description & Specs */}
 <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
 <div className="lg:col-span-8 flex flex-col gap-10">
 <div className="bg-surface-light bg-surface-dark rounded-xl p-6 md:p-8 border border-slate-200 border-slate-800">
 <h2 className="text-xl font-bold mb-6 text-foreground text-black">Descrição do Produto</h2>
 <div className="prose prose-slate prose-invert max-w-none text-slate-600 text-slate-300 leading-relaxed">
 <p className="whitespace-pre-line">{product.description || 'Sem descrição disponível no momento.'}</p>
 </div>
 </div>

 <div className="bg-surface-light bg-surface-dark rounded-xl p-6 md:p-8 border border-slate-200 border-slate-800">
 <h2 className="text-xl font-bold mb-6 text-foreground text-black">Especificações Técnicas</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
 <div className="flex flex-col py-3 border-b border-slate-100 border-slate-700">
 <span className="text-sm text-slate-500 text-slate-400">Loja</span>
 <span className="font-medium text-foreground text-black">{store?.name ?? 'LupaShop Store'}</span>
 </div>
 <div className="flex flex-col py-3 border-b border-slate-100 border-slate-700">
 <span className="text-sm text-slate-500 text-slate-400">Categoria</span>
 <span className="font-medium text-foreground text-black">{product.category?.name ?? '—'}</span>
 </div>
 <div className="flex flex-col py-3 border-b border-slate-100 border-slate-700">
 <span className="text-sm text-slate-500 text-slate-400">Preço</span>
 <span className="font-medium text-foreground text-black">{price}</span>
 </div>
 <div className="flex flex-col py-3 border-b border-slate-100 border-slate-700">
 <span className="text-sm text-slate-500 text-slate-400">Estoque</span>
 <span className="font-medium text-foreground text-black">{product.stockQuantity ?? 0} unidades</span>
 </div>
 </div>
 </div>
 </div>

 <div className="lg:col-span-4">
 <div className="bg-surface-light bg-surface-dark rounded-xl p-6 border border-slate-200 border-slate-800 sticky top-24">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-bold text-foreground text-black">Avaliações</h2>
 <a className="text-sm text-primary font-medium" href="#">Ver todas</a>
 </div>
 <div className="flex items-center gap-4 mb-6">
 <div className="text-4xl font-extrabold text-foreground text-black">{rating.toFixed(1)}</div>
 <div className="flex flex-col">
 <div className="flex text-yellow-500 text-sm">
 {Array.from({ length: 5 }).map((_, i) => (
 <span key={i} className={`material-symbols-outlined text-[20px] ${i < Math.round(rating) ? 'fill-current' : ''}`}>
 star
 </span>
 ))}
 </div>
 <span className="text-xs text-slate-500 mt-1">Baseado em {reviewCount} notas</span>
 </div>
 </div>

 <div className="space-y-6">
 <div className="flex flex-col gap-2 pb-6 border-b border-slate-100 border-slate-700 last:border-0 last:pb-0">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">JD</div>
 <div className="flex flex-col">
 <span className="text-sm font-bold text-foreground text-black">João D.</span>
 <span className="text-xs text-slate-400">Há 2 dias</span>
 </div>
 </div>
 <div className="flex text-yellow-500">
 {Array.from({ length: 5 }).map((_, i) => (
 <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
 ))}
 </div>
 <p className="text-sm text-slate-600 text-slate-300 leading-snug">
 O cancelamento de ruído é surreal. Desaparece tudo ao redor. Vale cada centavo!
 </p>
 </div>
 <div className="flex flex-col gap-2 pb-6 border-b border-slate-100 border-slate-700 last:border-0 last:pb-0">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-primary-light/10 text-primary-light flex items-center justify-center text-xs font-bold">MA</div>
 <div className="flex flex-col">
 <span className="text-sm font-bold text-foreground text-black">Maria A.</span>
 <span className="text-xs text-slate-400">Há 1 semana</span>
 </div>
 </div>
 <div className="flex text-yellow-500">
 {[0, 1, 2, 3].map((i) => (
 <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
 ))}
 <span className="material-symbols-outlined text-[16px] text-slate-300">star</span>
 </div>
 <p className="text-sm text-slate-600 text-slate-300 leading-snug">
 Muito bom, mas achei que aperta um pouco se usar óculos por muito tempo.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </main>

 <Footer />
 </div>
 </PageTransition>
 );
}
