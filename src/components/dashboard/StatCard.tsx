'use client';

import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  color: string;
  isPositive: boolean;
  isLoading?: boolean;
}

export default function StatCard({
  icon,
  label,
  value,
  change,
  color,
  isPositive,
  isLoading = false,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-lg p-6 border border-border hover:border-border transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <div className="mt-3">
            {isLoading ? (
              <div className="h-8 bg-muted rounded animate-pulse w-24" />
            ) : (
              <p className="text-2xl font-bold text-foreground">{value}</p>
            )}
          </div>
          <p className={`text-xs mt-2 ${isPositive ? 'text-primary' : 'text-destructive'}`}>
            {change}
          </p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <span className="material-icons text-black">{icon}</span>
        </div>
      </div>

      {/* Sparkline effect */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-4 h-1 bg-linear-to-r from-transparent via-current to-transparent opacity-30"
      />
    </motion.div>
  );
}
