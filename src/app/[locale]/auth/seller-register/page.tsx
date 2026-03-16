'use client';

import React from 'react';
import { SellerMultiStepRegisterForm } from '@/components/auth/SellerMultiStepRegisterForm';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SellerRegisterPage() {
 const locale = useLocale();
 const router = useRouter();
 const t = useTranslations('auth.register');

 return (
 <div className="min-h-screen flex flex-col">
 {/* Top Navigation Bar */}
 <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-6 lg:px-10 py-4 z-20">
 <Link href={`/${locale}`} className="flex items-center gap-3 cursor-pointer">
 <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10">
 <span className="material-symbols-outlined text-[24px]">storefront</span>
 </div>
 <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">LupaShop</h2>
 </Link>
 <div className="flex gap-4 items-center">
 <span className="hidden sm:block text-sm text-muted-foreground">{t('seller.haveAccount')}</span>
 <button
 onClick={() => router.push(`/${locale}/auth/seller-login`)}
 className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-colors"
 >
 <span className="truncate">{t('seller.signIn')}</span>
 </button>
 </div>
 </header>

 {/* Main Content Area */}
 <main className="flex-1 flex flex-col lg:flex-row h-full">
 {/* Left Side: Form */}
 <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-20 bg-card">
 <div className="w-full max-w-[600px] flex flex-col gap-6">
 {/* Header Text */}
 <div className="text-center lg:text-left">
 <h1 className="text-text-main text-3xl lg:text-4xl font-bold leading-tight mb-2 tracking-tight">
 {t('seller.title')}
 </h1>
 <p className="text-muted-foreground text-base font-normal">
 {t('seller.subtitle')}
 </p>
 </div>

 {/* Registration Form */}
 <SellerMultiStepRegisterForm />
 </div>
 </div>

 {/* Right Side: Visual Image */}
 <div className="hidden lg:flex flex-1 relative bg-muted overflow-hidden">
 <div className="absolute inset-0 m-6 rounded-3xl overflow-hidden shadow-2xl">
 <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary-light/40 mix-blend-multiply z-10"></div>
 <img
 alt="Modern retail store with organized products"
 className="w-full h-full object-cover"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoSfTglbrr5lOKNQoF-NDtIn6tMzbp3xFJbgzTftoJU7PyPvqxT_mjxNbswvvyOjBlhxXcLme1cG_B30yHoCesnuVXDGgryaaC5xtNQXJuls8fCzwe1D9JK1933izwzpWvHoZIMl-wQardvQEuEI9YJedVVAJfPqFcl4VkJWVSApRwxIl9gW_vjEtxarAglFk2N6RpaLM6n-FaKlg8YYL41VT3qL40E_jtBfW5956wKSSKsYxTYOL2x9P1mck9wGDthlk42BBz1vg"
 />
 <div className="absolute bottom-0 left-0 p-12 z-20 max-w-lg text-white">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6 text-white">
 <span className="material-symbols-outlined text-[16px]">verified</span>
 {t('seller.heroBadge')}
 </div>
 <h3 className="text-4xl font-bold mb-4 leading-tight text-white">
 {t('seller.heroTitle')}
 </h3>
 <p className="text-lg text-white/90 font-medium">
 {t('seller.heroDescription')}
 </p>
 </div>
 </div>
 </div>
 </main>
 </div>
 );
}
