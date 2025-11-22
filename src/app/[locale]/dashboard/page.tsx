'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OverviewView from '@/components/dashboard/views/OverviewView';
import ProductsView from '@/components/dashboard/views/ProductsView';
import OrdersView from '@/components/dashboard/views/OrdersView';
import SettingsView from '@/components/dashboard/views/SettingsView';
import FinancesView from '@/components/dashboard/views/FinancesView';
import ReviewsView from '@/components/dashboard/views/ReviewsView';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState('overview');

  const renderView = () => {
    switch (currentView) {
      case 'overview': return <OverviewView />;
      case 'products': return <ProductsView />;
      case 'orders': return <OrdersView />;
      case 'finances': return <FinancesView />;
      case 'reviews': return <ReviewsView />;
      case 'settings': return <SettingsView />;
      default: return <OverviewView />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </DashboardLayout>
  );
}
