'use client';

import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 text-black py-20 px-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="text-xl text-primary100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.description')}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-12 py-20 px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('stats.title')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: t('stats.stores') },
              { number: "50K+", label: t('stats.products') },
              { number: "100K+", label: t('stats.customers') },
              { number: "1M+", label: t('stats.deliveries') }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-black">{stat.number}</div>
                <div className="text-black">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 py-20 px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('mission.title')}
          </motion.h2>
          <motion.p
            className="text-lg text-black max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('mission.description')}
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="space-y-12 py-20 px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('values.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: t('values.trust.title'),
                description: t('values.trust.description')
              },
              {
                icon: "🚀",
                title: t('values.innovation.title'),
                description: t('values.innovation.description')
              },
              {
                icon: "🌍",
                title: t('values.community.title'),
                description: t('values.community.description')
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-card p-8 rounded-xl shadow-sm text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="space-y-12 py-20 px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-black"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('team.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: t('team.founder.name'),
                role: t('team.founder.role'),
              },
              {
                name: t('team.cto.name'),
                role: t('team.cto.role'),
              },
              {
                name: t('team.design.name'),
                role: t('team.design.role'),
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-32 h-32 bg-linear-to-br from-purple-100 to-purple-200 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-black">{member.name}</h3>
                <p className="text-black">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 to-purple-700">
        <div className="text-center space-y-8 px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-primary100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('cta.description')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/stores/register`}
              className="bg-card text-primary900 px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              {t('cta.joinStore')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-card hover:text-primary900 transition-colors"
            >
              {t('cta.startShopping')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}