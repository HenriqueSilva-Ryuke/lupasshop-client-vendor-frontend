// src/services/graphql/order.service.ts
import { apolloClient } from '@/lib/graphql-client';
import { GET_ORDER, LIST_ORDERS } from '@/graphql/queries';
import { CREATE_ORDER, CREATE_ORDER_ITEM, UPDATE_ORDER_STATUS } from '@/graphql/mutations';
import type { Order, OrderItem, CreateOrderInput, CreateOrderItemInput, UpdateOrderStatusInput } from '@/graphql/types';

export const orderService = {
    async getOrder(id: string): Promise<Order | null> {
        try {
            const result = await apolloClient.query<{ getOrder: Order }>({
                query: GET_ORDER,
                variables: { id },
                fetchPolicy: 'network-only',
            });
            return result?.data?.getOrder ?? null;
        } catch (error) {
            console.error('GraphQL getOrder error:', error);
            return null;
        }
    },

    async listOrders(filters: { userId?: string; storeId?: string; status?: string } = {}): Promise<Order[] | null> {
        try {
            const result = await apolloClient.query<{ listOrders: Order[] }>({
                query: LIST_ORDERS,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            return result?.data?.listOrders ?? null;
        } catch (error) {
            console.error('GraphQL listOrders error:', error);
            return null;
        }
    },

    async createOrder(input: CreateOrderInput): Promise<Order | null> {
        try {
            const result = await apolloClient.mutate<{ createOrder: Order }>({
                mutation: CREATE_ORDER,
                variables: { input },
            });
            return result?.data?.createOrder ?? null;
        } catch (error) {
            console.error('GraphQL createOrder error:', error);
            return null;
        }
    },

    async createOrderItem(input: CreateOrderItemInput): Promise<any | null> {
        try {
            const result = await apolloClient.mutate<{ createOrderItem: OrderItem }>({
                mutation: CREATE_ORDER_ITEM,
                variables: { input },
            });
            return result?.data?.createOrderItem ?? null;
        } catch (error) {
            console.error('GraphQL createOrderItem error:', error);
            return null;
        }
    },

    async updateOrderStatus(id: string, input: UpdateOrderStatusInput): Promise<any | null> {
        try {
            const result = await apolloClient.mutate<{ updateOrderStatus: Order }>({
                mutation: UPDATE_ORDER_STATUS,
                variables: { id, input },
            });
            return result?.data?.updateOrderStatus ?? null;
        } catch (error) {
            console.error('GraphQL updateOrderStatus error:', error);
            return null;
        }
    },
};

export type { Order, CreateOrderInput, CreateOrderItemInput, UpdateOrderStatusInput };
