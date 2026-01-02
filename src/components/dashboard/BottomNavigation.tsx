'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useDashboardNavigation } from '@/hooks/useDashboardNavigation';

type DashboardView = 'overview' | 'shops' | 'products' | 'orders' | 'finances' | 'reviews' | 'settings';

interface BottomNavigationProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export default function BottomNavigation({
  currentView,
  onViewChange,
}: BottomNavigationProps) {
  const { navItems } = useDashboardNavigation();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-transparent lg:hidden"
    >
      <div className="flex justify-center p-4">
        <div className="overflow-x-auto scrollbar-hide w-11/12 bg-white rounded-full px-2 py-2 border border-gray-200 shadow-lg">
          <div className="inline-flex gap-2 w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as DashboardView)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all whitespace-nowrap text-sm font-medium ${
                  currentView === item.id
                    ? 'bg-blue-600 text-black'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="material-icons text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
