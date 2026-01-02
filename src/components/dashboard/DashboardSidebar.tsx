'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useDashboardNavigation } from '@/hooks/useDashboardNavigation';

type DashboardView = 
  | 'overview' 
  | 'shops' 
  | 'products' 
  | 'orders' 
  | 'finances' 
  | 'reviews' 
  | 'settings';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const colorMap: Record<string, string> = {
  overview: 'bg-blue-500',
  shops: 'bg-purple-500',
  products: 'bg-green-500',
  orders: 'bg-orange-500',
  finances: 'bg-emerald-500',
  reviews: 'bg-yellow-500',
  settings: 'bg-gray-500',
};

export default function DashboardSidebar({
  isOpen,
  onClose,
  currentView,
  onViewChange,
}: DashboardSidebarProps) {
  const locale = useLocale();
  const { navItems } = useDashboardNavigation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        exit={{ x: -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:relative w-64 h-screen bg-white border-r border-gray-200 z-40 lg:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href={`/${locale}`} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <span className="material-icons text-black text-xl">dashboard</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">LupaShop</h1>
              <p className="text-xs text-gray-500">Seller Panel</p>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                onViewChange(item.id as DashboardView);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="material-icons text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
              {currentView === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-6 bg-primary rounded-r"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            v1.0.0 • {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </>
  );
}
