import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface CreateShopPayload {
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
}

export interface UpdateShopPayload {
  name?: string;
  description?: string;
  logo?: string;
  banner?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export const useCreateShopMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateShopPayload) => {
      const { data } = await apiClient.post(
        API_ENDPOINTS.SHOPS.CREATE,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SHOPS.MY,
      });
    },
  });
};

export const useUpdateShopMutation = (shopId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateShopPayload) => {
      const { data } = await apiClient.put(
        API_ENDPOINTS.SHOPS.UPDATE(shopId),
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SHOPS.MY,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SHOPS.DETAIL(shopId),
      });
    },
  });
};

export const useDeleteShopMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shopId: string) => {
      await apiClient.delete(
        API_ENDPOINTS.SHOPS.DELETE(shopId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SHOPS.MY,
      });
    },
  });
};
