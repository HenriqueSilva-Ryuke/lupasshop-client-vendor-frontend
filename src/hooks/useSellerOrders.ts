'use client';

import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { LIST_ORDERS } from '@/graphql/queries';

export interface Order {
  id: string;
  userId: string;
  storeId: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  orderItems: OrderItem[];
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  product?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface UseSellerOrdersParams {
  limit?: number;
  offset?: number;
  status?: string;
}

export function useSellerOrders(params: UseSellerOrdersParams = {}) {
  return useQuery({
    queryKey: ['sellerOrders', params],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listOrders: Order[] }>({
        query: LIST_ORDERS,
        variables: {
          limit: params.limit || 10,
          offset: params.offset || 0,
          status: params.status || undefined,
        },
      });

      return data?.listOrders || [];
    },
  });
}
