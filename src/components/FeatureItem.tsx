import { motion } from 'motion/react';
import { Feature } from '../utils/featuresConfig';

interface FeatureItemProps {
  feature: Feature;
  transforms: {
    opacity: any;
    scale: any;
    y: any;
  };
  zIndex: number;
}

export const FeatureItem = ({ feature, transforms, zIndex }: FeatureItemProps) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ ...transforms, zIndex }}
    >
      <div className="w-full max-w-6xl px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-purple-200 flex items-center justify-center text-purple-600">
            <div className="text-black">
              {feature.icon}
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-xl text-gray-600">{feature.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {feature.details.map((detail, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <span className="text-purple-600 mt-1">{detail.icon}</span>
                <span className="text-gray-700">{detail.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className={`relative h-96 rounded-2xl bg-linear-to-br ${feature.gradient} p-8 flex items-center justify-center overflow-hidden border border-purple-100`}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl" />
          </div>
          <motion.div
            className="text-purple-600 text-6xl opacity-80"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};