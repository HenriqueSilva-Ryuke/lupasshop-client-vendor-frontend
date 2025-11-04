"use client";

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { StoreIcon, ShoppingCartIcon, ChartIcon, SecurityIcon, UserIcon, ListIcon, TruckIcon, CreditCardIcon, TrendingUpIcon } from './icons';

export default function BenefitsSection() {
  const t = useTranslations('benefits');
  const tCta = useTranslations('cta');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const storeBenefits = [
    {
      icon: <TrendingUpIcon />,
      title: t('forStores.point1'),
      description: t('forStores.point1')
    },
    {
      icon: <CreditCardIcon />,
      title: t('forStores.point2'),
      description: t('forStores.point2')
    },
    {
      icon: <ChartIcon />,
      title: t('forStores.point3'),
      description: t('forStores.point3')
    },
    {
      icon: <TruckIcon />,
      title: t('forStores.point4'),
      description: t('forStores.point4')
    }
  ];

  const customerBenefits = [
    {
      icon: <ShoppingCartIcon />,
      title: t('forCustomers.point1'),
      description: t('forCustomers.point1')
    },
    {
      icon: <TruckIcon />,
      title: t('forCustomers.point2'),
      description: t('forCustomers.point2')
    },
    {
      icon: <SecurityIcon />,
      title: t('forCustomers.point3'),
      description: t('forCustomers.point3')
    },
    {
      icon: <CreditCardIcon />,
      title: t('forCustomers.point4'),
      description: t('forCustomers.point4')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#412778] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#412778] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#412778] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#412778] to-[#2e1a55] bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24">
          {/* For Stores Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Floating Card */}
            <motion.div
              className="absolute -top-6 -left-6 bg-[#412778] backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 z-20 text-white"
              initial={{ opacity: 0, x: -20, rotate: -5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -20, rotate: -5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#412778] text-lg">
                  <StoreIcon />
                </div>
                <div>
                  <div className="font-semibold text-white">{t('forStores.title')}</div>
                  <div className="text-sm text-white/80">{t('forStores.subtitle')}</div>
                </div>
              </div>
            </motion.div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 mt-12">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-[#412778] to-[#2e1a55] bg-clip-text text-transparent"
                variants={itemVariants}
              >
                {t('forStores.title')}
              </motion.h3>
              
              <div className="space-y-6">
                                {storeBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                                        className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      index % 2 === 0 
                        ? 'bg-white border border-white/50 hover:border-[#412778]/50' 
                        : 'bg-[#412778]/10 border border-[#412778]/20 hover:border-[#412778]/50'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-lg ${
                          index % 2 === 0 ? 'bg-[#412778] text-white' : 'bg-white text-[#412778]'
                        }`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                          index % 2 === 0 ? 'text-slate-900 group-hover:text-[#412778]' : 'text-[#412778] group-hover:text-slate-900'
                        }`}>
                          {benefit.title}
                        </h4>
                        <p className={`leading-relaxed ${
                          index % 2 === 0 ? 'text-slate-600' : 'text-slate-700'
                        }`}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* For Customers Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Floating Card */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 z-20"
              initial={{ opacity: 0, x: 20, rotate: 5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 20, rotate: 5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#412778] rounded-xl flex items-center justify-center text-white text-lg">
                  <UserIcon />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t('forCustomers.title')}</div>
                  <div className="text-sm text-slate-600">{t('forCustomers.subtitle')}</div>
                </div>
              </div>
            </motion.div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 mt-12">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-[#412778] to-[#2e1a55] bg-clip-text text-transparent"
                variants={itemVariants}
              >
                {t('forCustomers.title')}
              </motion.h3>
              
              <div className="space-y-6">
                {customerBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      index % 2 === 0 
                        ? 'bg-[#412778]/10 border border-[#412778]/20 hover:border-[#412778]/50' 
                        : 'bg-white border border-white/50 hover:border-[#412778]/50'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-lg ${
                          index % 2 === 0 ? 'bg-white text-[#412778]' : 'bg-[#412778] text-white'
                        }`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                          index % 2 === 0 ? 'text-[#412778] group-hover:text-slate-900' : 'text-slate-900 group-hover:text-[#412778]'
                        }`}>
                          {benefit.title}
                        </h4>
                        <p className={`leading-relaxed ${
                          index % 2 === 0 ? 'text-slate-700' : 'text-slate-600'
                        }`}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-[#412778] backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 max-w-2xl mx-auto text-white">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('shared.title')}
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              {t('shared.description')}
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#412778] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {tCta('registerStore')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                {tCta('exploreProducts')}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}