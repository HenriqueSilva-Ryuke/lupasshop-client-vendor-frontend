"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function CTASection() {
 const t = useTranslations('cta');

 return (
 <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-[#4a2d85] to-[#2e1a55] text-black">
 {/* Background Pattern */}
 <div className="absolute inset-0 opacity-10">
 <div className="absolute top-0 left-0 w-72 h-72 bg-[#5a3491] rounded-full blur-3xl"></div>
 <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5a3491] rounded-full blur-3xl"></div>
 </div>

 {/* Floating Elements */}
 <div className="absolute inset-0 overflow-hidden">
 <motion.div
 className="absolute top-20 left-10 w-6 h-6 bg-card/20 rounded-full"
 animate={{
 y: [0, -20, 0],
 opacity: [0.3, 0.7, 0.3]
 }}
 transition={{
 duration: 4,
 repeat: Infinity,
 ease: "easeInOut"
 }}
 />
 <motion.div
 className="absolute top-40 right-20 w-4 h-4 bg-card/30 rounded-full"
 animate={{
 y: [0, 15, 0],
 opacity: [0.4, 0.8, 0.4]
 }}
 transition={{
 duration: 3,
 repeat: Infinity,
 ease: "easeInOut",
 delay: 1
 }}
 />
 <motion.div
 className="absolute bottom-32 left-20 w-8 h-8 bg-card/15 rounded-full"
 animate={{
 y: [0, 25, 0],
 opacity: [0.2, 0.6, 0.2]
 }}
 transition={{
 duration: 5,
 repeat: Infinity,
 ease: "easeInOut",
 delay: 2
 }}
 />
 </div>

 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
 {/* Header Section */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 viewport={{ once: true }}
 className="mb-12"
 >
 <motion.h2  className="text-4xl md:text-6xl font-bold mb-6"
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 >
 {t('title')}
 </motion.h2>
 <motion.p
 className="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto leading-relaxed"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 >
 {t('subtitle')}
 </motion.p>
 </motion.div>

 {/* Stats Section */}
 <motion.div
 className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-2xl mx-auto"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.6 }}
 viewport={{ once: true }}
 >
 {[
 { icon: "store", number: "100+", label: t('stats.activeStores') },
 { icon: "inventory_2", number: "10K+", label: t('stats.products') },
 { icon: "people", number: "50K+", label: t('stats.customers') },
 { icon: "local_shipping", number: "1M+", label: t('stats.deliveries') }
 ].map((stat, index) => (
 <motion.div
 key={stat.label}
 className={`text-center p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
 index % 2 === 0  ? 'bg-card/10 border-border/20 text-black'  : 'bg-primary/80 border-[#5a3491]/50 text-black'
 }`}
 whileHover={{  scale: 1.05,
 backgroundColor: index % 2 === 0 ? "rgba(255,255,255,0.2)" : "rgba(90, 52, 145, 0.9)"
 }}
 initial={{ opacity: 0, scale: 0.8 }}
 whileInView={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.8 + index * 0.1 }}
 viewport={{ once: true }}
 >
 <div className="flex justify-center mb-2">
 <span className="material-icons text-3xl text-black/80">
 {stat.icon}
 </span>
 </div>
 <div className="text-2xl md:text-3xl font-bold text-black mb-1">{stat.number}</div>
 <div className="text-sm text-black/60">{stat.label}</div>
 </motion.div>
 ))}
 </motion.div>

 {/* CTA Buttons */}
 <motion.div
 className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.8 }}
 viewport={{ once: true }}
 >
 <Button
 variant="default"
 className="group relative bg-card text-primary px-10 py-4 rounded-full font-semibold text-lg overflow-hidden shadow-2xl"
 >
 <span className="relative z-10 flex items-center justify-center">
 <span className="material-icons mr-3">storefront</span>
 {t('registerStore')}
 </span>
 <motion.div
 className="absolute inset-0 bg-linear-to-r from-gray-100 to-white"
 initial={{ x: '-100%' }}
 whileHover={{ x: '0%' }}
 transition={{ duration: 0.3 }}
 />
 </Button>

 <Button
 variant="default"
 className="group border-2 border-black/30 text-black px-10 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:border-black/50 transition-all duration-300 flex items-center justify-center"
 >
 <span className="material-icons mr-3">shopping_bag</span>
 {t('exploreProducts')}
 </Button>
 </motion.div>

 {/* Additional Options */}
 <motion.div
 className="flex flex-wrap justify-center gap-8 text-black/60"
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 transition={{ duration: 0.8, delay: 1 }}
 viewport={{ once: true }}
 >
 {[
 { icon: "schedule", text: t('features.setup') },
 { icon: "support_agent", text: t('features.support') },
 { icon: "security", text: t('features.securePayment') },
 { icon: "local_shipping", text: t('features.fastDelivery') }
 ].map((feature, index) => (
 <motion.div
 key={feature.text}
 className="flex items-center space-x-2"
 whileHover={{ color: "#ffffff" }}
 transition={{ duration: 0.3 }}
 >
 <span className="material-icons text-lg">{feature.icon}</span>
 <span className="text-sm font-medium">{feature.text}</span>
 </motion.div>
 ))}
 </motion.div>

  </div>
 </section>
 );
}