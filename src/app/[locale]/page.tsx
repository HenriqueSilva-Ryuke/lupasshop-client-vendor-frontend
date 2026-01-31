"use client";

import type React from 'react';
import { lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import PageTransition from '../../components/PageTransition';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Lazy load components
const HeroSearch = lazy(() => import('../../components/home/HeroSearch'));
const PromotionalCards = lazy(() => import('../../components/home/PromotionalCards'));
const CategoriesSection = lazy(() => import('../../components/home/CategoriesSection'));
const DealsSection = lazy(() => import('../../components/home/DealsSection'));
const FeaturedStoresSection = lazy(() => import('../../components/home/FeaturedStoresSection'));

export default function Home() {
 const t = useTranslations('home');

 return (
 <PageTransition>
 <div className="min-h-screen bg-background text-foreground">
 <Navbar />

 <main className="flex-1 flex flex-col w-full">
 <Suspense fallback={<div className="w-full h-[500px] bg-muted animate-pulse" />}>
 <HeroSearch />
 </Suspense>

 <div className="space-y-16 py-12">
 <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-48 bg-muted rounded-2xl animate-pulse" />}>
 <PromotionalCards />
 </Suspense>

 <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-32 bg-muted rounded-2xl animate-pulse" />}>
 <CategoriesSection />
 </Suspense>

 <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-64 bg-muted rounded-2xl animate-pulse" />}>
 <DealsSection />
 </Suspense>

 <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-80 bg-muted rounded-3xl animate-pulse" />}>
 <FeaturedStoresSection />
 </Suspense>
 </div>
 </main>

 <Footer />
 </div>
 </PageTransition>
 );
}