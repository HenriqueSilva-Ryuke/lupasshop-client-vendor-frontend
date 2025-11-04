import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface Shop {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  status: 'active' | 'inactive' | 'pending';
  plan: 'basic' | 'premium';
  createdAt: string;
  updatedAt: string;
  statistics?: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    averageRating: number;
  };
}

export interface ShopsResponse {
  data: Shop[];
  total: number;
  page: number;
  limit: number;
}

export const useMyShopsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SHOPS.MY,
    queryFn: async () => {
      const { data } = await apiClient.get<ShopsResponse>(
        API_ENDPOINTS.SHOPS.MY
      );
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useShopDetailsQuery = (shopId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.SHOPS.DETAIL(shopId ?? ''),
    queryFn: async () => {
      if (!shopId) throw new Error('Shop ID is required');
      const { data } = await apiClient.get<Shop>(
        API_ENDPOINTS.SHOPS.BY_ID(shopId)
      );
      return data;
    },
    enabled: !!shopId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useShopStatisticsQuery = (shopId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.SHOPS.STATISTICS(shopId ?? ''),
    queryFn: async () => {
      if (!shopId) throw new Error('Shop ID is required');
      const { data } = await apiClient.get(
        API_ENDPOINTS.SHOPS.STATISTICS(shopId)
      );
      return data;
    },
    enabled: !!shopId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
