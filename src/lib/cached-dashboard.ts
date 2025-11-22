'use cache';

import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  activeProducts: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  // In a real app, this would fetch from the backend
  // For now, return mock data
  return {
    totalSales: 12450.50,
    totalOrders: 48,
    totalProducts: 156,
    activeProducts: 142,
  };
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export async function getRecentOrders(): Promise<RecentOrder[]> {
  // Mock data for recent orders
  return [
    {
      id: '1',
      orderNumber: '#OD-001',
      customer: 'João Silva',
      amount: 2500.0,
      status: 'delivered',
      date: '2025-11-03',
    },
    {
      id: '2',
      orderNumber: '#OD-002',
      customer: 'Maria Santos',
      amount: 1800.5,
      status: 'shipped',
      date: '2025-11-04',
    },
    {
      id: '3',
      orderNumber: '#OD-003',
      customer: 'Pedro Costa',
      amount: 3200.0,
      status: 'confirmed',
      date: '2025-11-04',
    },
    {
      id: '4',
      orderNumber: '#OD-004',
      customer: 'Ana Oliveira',
      amount: 1500.0,
      status: 'pending',
      date: '2025-11-04',
    },
  ];
}
