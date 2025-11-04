'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import DashboardNavigation from '@/components/dashboard/DashboardNavigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import OverviewView from '@/components/dashboard/views/OverviewView';
import ShopsView from '@/components/dashboard/views/ShopsView';
import ProductsView from '@/components/dashboard/views/ProductsView';
import OrdersView from '@/components/dashboard/views/OrdersView';
import FinancesView from '@/components/dashboard/views/FinancesView';
import ReviewsView from '@/components/dashboard/views/ReviewsView';
import SettingsView from '@/components/dashboard/views/SettingsView';
import { useResponsive } from '@/hooks/useResponsive';
import { useLocale } from 'next-intl';
import BottomNavigation from '@/components/dashboard/BottomNavigation';

type DashboardView = 
  | 'overview' 
  | 'shops' 
  | 'products' 
  | 'orders' 
  | 'finances' 
  | 'reviews' 
  | 'settings';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const { isMobile } = useResponsive();
  const locale = useLocale();

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'shops':
        return <ShopsView />;
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'finances':
        return <FinancesView />;
      case 'reviews':
        return <ReviewsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Main Content - Mobile */}
        <main className="flex-1 overflow-auto pb-32">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {renderView()}
          </motion.div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <BottomNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <DashboardNavigation 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentView={currentView}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {renderView()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
