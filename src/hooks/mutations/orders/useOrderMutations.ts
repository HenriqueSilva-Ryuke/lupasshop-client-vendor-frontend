import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface UpdateOrderStatusPayload {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
}

export interface AddOrderItemPayload {
  productId: string;
  quantity: number;
  unitPrice: number;
  variantId?: string;
}

export interface RemoveOrderItemPayload {
  itemId: string;
}

export const useUpdateOrderStatusMutation = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateOrderStatusPayload) => {
      const { data } = await apiClient.patch(
        `${API_ENDPOINTS.ORDERS.BY_ID(orderId)}/status`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.DETAIL(orderId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.LIST(),
      });
    },
  });
};

export const useAddOrderItemMutation = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddOrderItemPayload) => {
      const { data } = await apiClient.post(
        `${API_ENDPOINTS.ORDERS.BY_ID(orderId)}/items`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.DETAIL(orderId),
      });
    },
  });
};

export const useRemoveOrderItemMutation = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RemoveOrderItemPayload) => {
      await apiClient.delete(
        `${API_ENDPOINTS.ORDERS.BY_ID(orderId)}/items/${payload.itemId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.DETAIL(orderId),
      });
    },
  });
};
