import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';

export interface ShopsFilters {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  featuredImage?: string;
  rating?: number;
  productCount?: number;
  categories?: string[];
  description?: string;
}

export interface ShopsListResponse {
  data: ShopItem[];
  total: number;
  page: number;
  limit: number;
}

export const useShopsQuery = (filters?: ShopsFilters) => {
  return useQuery({
    queryKey: ['shops', 'list', filters?.q, filters?.category, filters?.page, filters?.limit, filters?.sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', String(filters.page));
      if (filters?.limit) params.append('limit', String(filters.limit));
      if (filters?.q) params.append('q', filters.q);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.sort) params.append('sort', filters.sort);

      const { data } = await apiClient.get(`/shops?${params.toString()}`);
      return data as ShopsListResponse;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
