import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface Order {
  id: string;
  orderNumber: string;
  shopId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalAmount: number;
  shippingCost: number;
  taxAmount?: number;
  items: OrderItem[];
  shippingAddress?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantId?: string;
}

export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrdersFilters {
  page?: number;
  limit?: number;
  status?: Order['status'];
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const useOrdersQuery = (filters?: OrdersFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.LIST(filters?.page, filters?.limit),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.search) params.append('search', filters.search);

      const { data } = await apiClient.get<OrdersResponse>(
        `${API_ENDPOINTS.ORDERS.LIST}?${params.toString()}`
      );
      return data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useOrderDetailsQuery = (orderId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.DETAIL(orderId ?? ''),
    queryFn: async () => {
      if (!orderId) throw new Error('Order ID is required');
      const { data } = await apiClient.get<Order>(
        API_ENDPOINTS.ORDERS.BY_ID(orderId)
      );
      return data;
    },
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useRecentOrdersQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.LIST(1, 10),
    queryFn: async () => {
      const { data } = await apiClient.get<Order[]>(
        `${API_ENDPOINTS.ORDERS.LIST}?limit=10&page=1`
      );
      return data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
