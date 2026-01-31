import { MarketplaceStore, MarketplaceProduct } from '@/types/marketplace';

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'buyer';
  avatar?: string;
}

export interface DashboardShop extends MarketplaceStore {
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  revenue: number;
  totalOrders: number;
}

export interface DashboardProduct extends MarketplaceProduct {
  stock: number;
  status: 'active' | 'draft' | 'archived';
  sales: number;
}

export interface DashboardOrder {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

export const mockUser: DashboardUser | null = null;
export const mockShops: DashboardShop[] = [];
export const mockDashboardProducts: DashboardProduct[] = [];
export const mockOrders: DashboardOrder[] = [];
