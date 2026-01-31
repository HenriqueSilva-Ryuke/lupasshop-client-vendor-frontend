"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';

export default function PromotionalCards() {
 const locale = useLocale();
 const t = useTranslations('home');
 const router = useRouter();
 const { data: featuredProductsData = [], isLoading: productsLoading } = useFeaturedProducts(5);

 const deals = useMemo(() => {
 return (featuredProductsData || []).slice(0, 5).map((product: any) => ({
 id: product.id,
 store: product.store?.name || 'Unknown Store',
 title: product.name,
 price: `R$ ${product.price?.toFixed(2) || '0.00'}`,
 badge: product.discount ? `${product.discount}%` : null,
 image: product.images?.[0] || 'https://via.placeholder.com/400',
 slug: product.slug,
 }));
 }, [featuredProductsData]);

 if (productsLoading) return null;

 return (
 <section className="py-24 bg-primary relative overflow-hidden">
 {/* Background Decorativo */}
 <div className="absolute inset-0 z-0">
 <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
 </div>

 <div className="max-w-7xl mx-auto px-4 relative z-10">
 <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="flex-1"
 >
 <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.8]">
 DEALS <br />
 <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>INSANE</span>
 </h2>
 </motion.div>

 {/* BOTÃO OUTLINE COM ANIMAÇÃO DE PREENCHIMENTO INSET */}
 <Button
 variant="slide"
 className="group overflow-hidden px-8 py-4 border-2 border-foreground text-foreground text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-colors duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
 >
 <span className="relative z-10 flex items-center gap-3 group-hover:text-primary transition-colors duration-300">Ver Catálogo <ArrowRight className="w-4 h-4" /></span>
 </Button>
 </div>

 {/* Bento Grid */}
 <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[550px]">
 {deals.slice(0, 3).map((deal, idx) => (
 <motion.div
 key={deal.id}
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5, delay: idx * 0.1 }}
 viewport={{ once: true }}
 onClick={() => router.push(`/${locale}/product/${deal.slug}`)}
 className={`group relative overflow-hidden rounded-xl border border-border/10 bg-primary-dark/40 cursor-pointer ${
 idx === 0 ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2'
 }`}
 >
 <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent z-10 opacity-90" />
  <motion.div
 whileHover={{ scale: 1.08 }}
 transition={{ duration: 0.7 }}
 className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all"
 style={{ backgroundImage: `url(${deal.image})` }}
 />

 <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
 <div className="flex flex-col gap-1 mb-4">
 {deal.badge && (
 <span className="w-fit bg-primary text-primary-foreground text-[10px] font-black px-2 py-1 rounded-sm mb-2">
 {deal.badge} OFF
 </span>
 )}
 <p className="text-foreground/50 text-[10px] font-black uppercase tracking-widest">{deal.store}</p>
 <h3 className={`font-black text-foreground uppercase tracking-tighter leading-[0.9] ${
 idx === 0 ? 'text-4xl md:text-6xl max-w-sm' : 'text-2xl'
 }`}>
 {deal.title}
 </h3>
 </div>

 <div className="flex items-center justify-between pt-6 border-t border-border/30">
 <span className="text-2xl font-black text-foreground">{deal.price}</span>
  {/* Pequeno botão outline dentro do card */}
 <Button className="relative overflow-hidden w-12 h-12 rounded-lg border-2 border-border/50 flex items-center justify-center p-0 transition-all hover:border-primary hover:bg-primary/10">
 <ArrowRight className="relative z-10 w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
 </Button>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}