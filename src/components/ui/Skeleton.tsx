'use client';

import React from 'react';
import { motion } from 'motion/react';

type SkeletonType = 'text' | 'card' | 'avatar' | 'input' | 'table-row';

interface SkeletonProps {
  type?: SkeletonType;
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

const skeletonVariants = {
  type: {
    text: 'h-4 w-full rounded',
    card: 'h-32 w-full rounded-lg',
    avatar: 'h-12 w-12 rounded-full',
    input: 'h-10 w-full rounded-md',
    'table-row': 'h-12 w-full rounded',
  },
};

export default function Skeleton({
  type = 'text',
  width = 'w-full',
  height,
  className = '',
  count = 1,
}: SkeletonProps) {
  const baseClass = `${skeletonVariants.type[type]} ${width} ${height || ''} bg-gray-200 ${className}`;

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse' as const,
          }}
          className={baseClass}
        />
      ))}
    </div>
  );
}
