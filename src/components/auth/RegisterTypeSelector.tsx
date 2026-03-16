'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Store, ShoppingBag } from 'lucide-react';

interface RegisterTypeSelectorProps {
    onSelect: (type: 'customer' | 'seller') => void;
}

export default function RegisterTypeSelector({ onSelect }: RegisterTypeSelectorProps) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('auth.register.typeSelector');

    const handleCustomerSelect = () => {
        onSelect('customer');
    };

    const handleSellerSelect = () => {
        router.push(`/${locale}/auth/seller-register`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    {t('title')}
                </h2>
                <p className="text-muted-foreground text-lg">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Option */}
                <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCustomerSelect}
                    className="relative group p-8 rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 bg-card hover:bg-card/80 cursor-pointer"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        >
                            <ShoppingBag className="w-8 h-8 text-primary" />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {t('customer.title')}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('customer.description')}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full items-start text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('customer.benefit1')}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('customer.benefit2')}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('customer.benefit3')}
                            </div>
                        </div>
                        <div className="mt-6 w-full px-4 py-3 bg-primary/10 rounded-xl font-semibold text-primary group-hover:bg-primary/20 transition-colors">
                            {t('customer.cta')}
                        </div>
                    </div>
                </motion.button>

                {/* Seller Option */}
                <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSellerSelect}
                    className="relative group p-8 rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 bg-card hover:bg-card/80 cursor-pointer"
                >
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                        {t('seller.badge')}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        >
                            <Store className="w-8 h-8 text-primary" />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {t('seller.title')}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('seller.description')}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full items-start text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('seller.benefit1')}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('seller.benefit2')}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-primary">✓</span>
                                {t('seller.benefit3')}
                            </div>
                        </div>
                        <div className="mt-6 w-full px-4 py-3 bg-primary/10 rounded-xl font-semibold text-primary group-hover:bg-primary/20 transition-colors">
                            {t('seller.cta')}
                        </div>
                    </div>
                </motion.button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
                {t('footer')}
            </p>
        </motion.div>
    );
}
