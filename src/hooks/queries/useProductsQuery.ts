import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  costPrice?: number;
  images?: string[];
  categoryId?: string;
  shopId: string;
  status: 'active' | 'inactive' | 'draft';
  stock: number;
  sku: string;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  images?: string[];
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductsFilters {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: 'active' | 'inactive' | 'draft';
  search?: string;
}

export const useProductsQuery = (filters?: ProductsFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST(filters?.page, filters?.limit),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.category) params.append('category', filters.category);
      if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.search) params.append('search', filters.search);

      const { data } = await apiClient.get<ProductsResponse>(
        `${API_ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductDetailsQuery = (productId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId ?? ''),
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      const { data } = await apiClient.get<Product>(
        API_ENDPOINTS.PRODUCTS.BY_ID(productId)
      );
      return data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductsStatisticsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.STATISTICS,
    queryFn: async () => {
      const { data } = await apiClient.get(
        API_ENDPOINTS.PRODUCTS.STATISTICS
      );
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useProductVariantsQuery = (productId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.VARIANTS(productId ?? ''),
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      const { data } = await apiClient.get(
        API_ENDPOINTS.PRODUCTS.VARIANTS.LIST(productId)
      );
      return data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
