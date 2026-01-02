'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useFeaturesScroll } from '../hooks/useFeaturesScroll';
import { getFeaturesConfig } from '../utils/featuresConfig';
import { FeatureItem } from './FeatureItem';

export default function FeaturesSection() {
  const t = useTranslations('features');
  const features = getFeaturesConfig(t);
  const { containerRef, totalHeight, getFeatureTransforms, finalCTAOpacity } = useFeaturesScroll({
    featuresCount: features.length,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white backdrop-blur-sm"
      style={{ height: `${totalHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Features Stack */}
        {features.map((feature, index) => {
          const transforms = getFeatureTransforms(index);

          return (
            <FeatureItem
              key={feature.id}
              feature={feature}
              transforms={transforms}
              zIndex={features.length - index}
            />
          );
        })}
      </div>

      {/* Final CTA Section */}
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center bg-linear-to-br from-purple-900 to-purple-700"
        style={{
          opacity: finalCTAOpacity,
        }}
      >
        <div className="text-center space-y-8 px-8">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t('ctaTitle')}
          </motion.h2>
          <motion.p
            className="text-xl text-purple-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('ctaDescription')}
          </motion.p>
          <motion.button
            className="px-8 py-4 bg-white text-purple-900 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('startNow')}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
