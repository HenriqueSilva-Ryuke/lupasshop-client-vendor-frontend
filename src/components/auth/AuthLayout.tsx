'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface AuthLayoutProps {
 children: ReactNode;
 title: string;
 subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
 const locale = useLocale();
 const t = useTranslations('auth.layout');

 return (
 <div className="min-h-screen flex">
 {/* Left Side - Form */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6 }}
 className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-card"
 >
 <div className="w-full max-w-md">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="mb-8"
 >
 {/* Logo */}
 <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 group">
 <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
 <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
 </svg>
 </div>
 <span className="text-lg font-bold text-foreground">LupaShop</span>
 </Link>

 {/* Title & Subtitle */}
 <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
 <p className="text-muted-foreground text-sm">{subtitle}</p>
 </motion.div>

 {/* Form */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 >
 {children}
 </motion.div>

 {/* Footer */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground"
 >
 <p>
 {t('termsPrefix')}{' '}
 <Link href={`/${locale}/terms`} className="text-primary hover:underline">
 {t('terms')}
 </Link>
 {' '}e{' '}
 <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
 {t('privacy')}
 </Link>
 </p>
 </motion.div>
 </div>
 </motion.div>

 {/* Right Side - Image Illustration */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="hidden lg:flex lg:w-1/2 relative bg-muted overflow-hidden"
 >
 <div className="absolute inset-0 m-6 rounded-3xl overflow-hidden shadow-2xl">
 <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary-light/40 mix-blend-multiply z-10"></div>
 <img
 alt={t('heroAlt')}
 className="w-full h-full object-cover"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVI6bdkV1UYi_5rncM6PQkV0GGn_Zhi8uYKpz06tnd2RQd_0JKccs4Ab_UdN831f4EnOdpHYBGvfB4ExDSyAvqoP6mq3iVIj_zZSza6YGdmki3JL7cnv-VewVrBF1x6rgTP9VflmjRogguh-vJnmRPjjCLfuvvA8pqcfNjI-oKvmWxDHsvXskOfOOh65kv5fMVuSN0uHmhIIiAJmnzIvYLB7RulVRjmb_Oe9soO7GGukAOslw1ZaBvKoXEm2y_tAneCUzswJjXpEc"
 />
 <div className="absolute bottom-0 left-0 p-12 z-20 max-w-lg">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6"
 >
 <span className="material-symbols-outlined text-[16px]">verified</span>
 {t('heroBadge')}
 </motion.div>
 <motion.h3
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.5 }}
 className="text-4xl font-bold mb-4 leading-tight text-white"
 >
 {t('heroTitle')}
 </motion.h3>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.6 }}
 className="text-lg text-white/90 font-medium"
 >
 {t('heroDescription')}
 </motion.p>
 </div>
 </div>
 </motion.div>
 </div>
 );
}
