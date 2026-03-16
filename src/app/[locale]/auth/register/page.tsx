'use client';

import React, { useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import RegisterTypeSelector from '@/components/auth/RegisterTypeSelector';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function RegisterPage() {
 const locale = useLocale();
 const router = useRouter();
 const t = useTranslations('auth.register');
 const [registerType, setRegisterType] = useState<'selector' | 'customer' | null>('selector');

 return (
 <div className="min-h-screen flex flex-col">
 {/* Top Navigation Bar */}
 <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-6 lg:px-10 py-4 z-20">
 <Link href={`/${locale}`} className="flex items-center gap-3 cursor-pointer">
 <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10">
 <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
 </div>
 <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">LupaShop</h2>
 </Link>
 <div className="flex gap-4 items-center">
 <span className="hidden sm:block text-sm text-muted-foreground">{t('haveAccount')}</span>
 <button
 onClick={() => router.push(`/${locale}/auth/login`)}
 className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-colors"
 >
 <span className="truncate">{t('signIn')}</span>
 </button>
 </div>
 </header>

 {/* Main Content Area */}
 <main className="flex-1 flex flex-col lg:flex-row h-full">
 {/* Left Side: Form */}
 <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-20 bg-card">
 <div className="w-full max-w-[480px] flex flex-col gap-6">
 <AnimatePresence mode="wait">
 {registerType === 'selector' ? (
 <motion.div
 key="selector"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3 }}
 >
 <RegisterTypeSelector onSelect={(type) => {
 if (type === 'customer') {
 setRegisterType('customer');
 }
 // Vendedor redireciona automaticamente no componente
 }} />
 </motion.div>
 ) : (
 <motion.div
 key="customer-form"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3 }}
 >
 <div className="mb-8">
 <button
 onClick={() => setRegisterType('selector')}
 className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1 mb-4"
 >
 <span>←</span> {t('back')}
 </button>
 <h1 className="text-text-main text-3xl lg:text-4xl font-bold leading-tight mb-2 tracking-tight">
 {t('customerTitle')}
 </h1>
 <p className="text-muted-foreground text-base font-normal">
 {t('customerSubtitle')}
 </p>
 </div>

 {/* Social Login */}
 <div className="flex gap-4">
 <button className="flex flex-1 items-center justify-center gap-3 h-12 px-4 rounded-xl border border-border hover:bg-muted/50 transition-colors bg-card">
 <img
 alt="Google"
 className="w-5 h-5"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLBIuBiJeGS-8Mskku5FkvQSiur94G7fCxjygPhMaiArQ-iTC29GfRFJGPeGeX0WseHG6FU-4mkU_HmrparIJqgYMbherBjjDDi2p_ae0xwbYQsBe1durnsr4UNCD-lGxXO10RQ8e6f3FmHu42CKWaIDbnWyEqOIyeBltnQV6mOWHemZPJ7Lx0kAki9ooGpPZGLhRt7nEDzoAHCsNN-q0FCEyLxxIxWcRKv4O2atdysstZeGQMJrdAOSsziTZtYXZvjBbLh915Hso"
 />
 <span className="text-sm font-medium text-text-main">Google</span>
 </button>
 </div>

 <div className="relative flex py-2 items-center">
 <div className="flex-grow border-t border-border"></div>
 <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-wider">
 {t('emailDivider')}
 </span>
 <div className="flex-grow border-t border-border"></div>
 </div>

 {/* Registration Form */}
 <RegisterForm />
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {/* Right Side: Visual Image */}
 <div className="hidden lg:flex flex-1 relative bg-muted overflow-hidden">
 <div className="absolute inset-0 m-6 rounded-3xl overflow-hidden shadow-2xl">
 <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary-light/40 mix-blend-multiply z-10"></div>
 <img
 alt="Woman smiling while shopping holding bags in a modern setting"
 className="w-full h-full object-cover"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVI6bdkV1UYi_5rncM6PQkV0GGn_Zhi8uYKpz06tnd2RQd_0JKccs4Ab_UdN831f4EnOdpHYBGvfB4ExDSyAvqoP6mq3iVIj_zZSza6YGdmki3JL7cnv-VewVrBF1x6rgTP9VflmjRogguh-vJnmRPjjCLfuvvA8pqcfNjI-oKvmWxDHsvXskOfOOh65kv5fMVuSN0uHmhIIiAJmnzIvYLB7RulVRjmb_Oe9soO7GGukAOslw1ZaBvKoXEm2y_tAneCUzswJjXpEc"
 />
 <div className="absolute bottom-0 left-0 p-12 z-20 max-w-lg">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6">
 <span className="material-symbols-outlined text-[16px]">verified</span>
 {t('heroBadge')}
 </div>
 <h3 className="text-4xl font-bold mb-4 leading-tight">
 {t('heroTitle')}
 </h3>
 <p className="text-lg text-white/90 font-medium">
 {t('heroDescriptionPrefix')}{' '}
 <span className="text-white font-bold bg-white/20 px-2 rounded">{t('heroCoupon')}</span>.
 </p>
 </div>
 </div>
 </div>
 </main>
 </div>
 );
}
