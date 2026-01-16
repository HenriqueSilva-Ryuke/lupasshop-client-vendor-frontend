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
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white">
        <Navbar />

        <main className="flex-1 flex flex-col w-full ">
          <Suspense fallback={<div className="pt-10 md:pt-14 h-16 bg-gray-200 rounded-xl animate-pulse" />}>
            <HeroSearch />
          </Suspense>

          <Suspense fallback={<div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />)}</div>}>
            <PromotionalCards />
          </Suspense>

          <Suspense fallback={<div className="mb-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />)}</div>}>
            <CategoriesSection />
          </Suspense>

          <Suspense fallback={<div className="mb-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">{[...Array(5)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}</div>}>
            <DealsSection />
          </Suspense>

          <Suspense fallback={<div className="rounded-3xl bg-gray-50 dark:bg-surface-dark p-8 md:p-10 border border-gray-100 dark:border-[#2a3b47]"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse" />)}</div></div>}>
            <FeaturedStoresSection />
          </Suspense>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}