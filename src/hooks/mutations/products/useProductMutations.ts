import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  costPrice?: number;
  images?: string[];
  categoryId?: string;
  status: 'active' | 'inactive' | 'draft';
  stock: number;
  sku: string;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  costPrice?: number;
  images?: string[];
  categoryId?: string;
  status?: 'active' | 'inactive' | 'draft';
  stock?: number;
  sku?: string;
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const { data } = await apiClient.post(
        API_ENDPOINTS.PRODUCTS.CREATE,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.LIST(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.STATISTICS,
      });
    },
  });
};

export const useUpdateProductMutation = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProductPayload) => {
      const { data } = await apiClient.put(
        API_ENDPOINTS.PRODUCTS.UPDATE(productId),
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.LIST(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId),
      });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      await apiClient.delete(
        API_ENDPOINTS.PRODUCTS.DELETE(productId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.LIST(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.STATISTICS,
      });
    },
  });
};

export interface UpdateProductStockPayload {
  quantity: number;
}

export const useUpdateProductStockMutation = (productId: string, variantId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProductStockPayload) => {
      let endpoint = API_ENDPOINTS.PRODUCTS.BY_ID(productId);
      
      if (variantId) {
        endpoint = API_ENDPOINTS.PRODUCTS.VARIANTS.STOCK(productId, variantId);
      }

      const { data } = await apiClient.patch(endpoint, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId),
      });
    },
  });
};
