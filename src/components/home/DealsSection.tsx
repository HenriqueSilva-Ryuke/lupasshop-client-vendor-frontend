"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Bolt, Heart, ShoppingCart, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';

export default function DealsSection() {
    const locale = useLocale();
    const t = useTranslations('home');
    const router = useRouter();
    const { data: featuredProductsData = [], isLoading: productsLoading } = useFeaturedProducts(5);

    const deals = useMemo(() => {
        return (featuredProductsData || []).slice(0, 5).map((product: any) => ({
            id: product.id,
            store: product.store?.name || 'Unknown Store',
            title: product.name,
            price: `AOA ${product.price?.toFixed(2) || '0.00'}`,
            oldPrice: product.originalPrice ? `AOA ${product.originalPrice.toFixed(2)}` : null,
            badge: product.discount ? `${product.discount}% OFF` : null,
            image: product.images?.[0] || 'https://via.placeholder.com/400',
            slug: product.slug,
        }));
    }, [featuredProductsData]);

    return (
        <section className="relative py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Alinhado com o estilo Hero/Categories */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b-2 border-border pb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Bolt className="text-primary w-5 h-5 fill-primary" />
                            <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">
                                {t('deals.badgeTitle')}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-foreground leading-[0.8]">
                            {t('deals.sectionTitle')}
                        </h2>
                    </motion.div>
                    <Button className="font-black text-sm uppercase">
                        {t('deals.viewAll')} <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                {productsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-[400px] bg-muted rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {deals.map((deal, idx) => (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col bg-card border-2 border-border hover:border-primary transition-all duration-500 overflow-hidden"
                                onClick={() => router.push(`/${locale}/product/${deal.slug}`)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 bg-center bg-cover"
                                        style={{ backgroundImage: `url(${deal.image})` }}
                                    />
                                    {/* Badge Disruptiva */}
                                    {deal.badge && (
                                        <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1.5 uppercase tracking-tighter z-10">
                                            {deal.badge}
                                        </div>
                                    )}

                                    <button
                                        className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-md rounded-full text-muted-foreground hover:text-destructive transition-colors z-10"
                                        onClick={(e) => { e.stopPropagation(); }}
                                    >
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Info Content */}
                                <div className="p-5 flex flex-col flex-1 border-t-2 border-border group-hover:border-primary/30 transition-colors">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                                        {deal.store}
                                    </span>
                                    <h3 className="text-sm font-black uppercase tracking-tighter leading-tight mb-4 line-clamp-2 text-foreground">
                                        {deal.title}
                                    </h3>

                                    <div className="mt-auto">
                                        <div className="flex flex-col mb-4">
                                            {deal.oldPrice && (
                                                <span className="text-[10px] text-muted-foreground line-through font-bold">
                                                    {deal.oldPrice}
                                                </span>
                                            )}
                                            <span className="text-xl font-black text-foreground tracking-tighter">
                                                {deal.price}
                                            </span>
                                        </div>

                                        {/* Botão com efeito Inset ou Slide */}
                                        <Button
                                            variant="slide"
                                            size="md"
                                            className="w-full border-primary text-primary"
                                            onClick={(e) => { e.stopPropagation(); }}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {t('deals.addButton')}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}