/**
 * @deprecated — Use hooks from '@lupa/api-client/hooks' instead
 */
import { getApiClient } from '@lupa/api-client/client';
import { GET_ORDER, LIST_ORDERS } from '@lupa/api-client/queries';
import { CREATE_ORDER, CREATE_ORDER_ITEM, UPDATE_ORDER_STATUS } from '@lupa/api-client/mutations';
import type { Order, CreateOrderInput, CreateOrderItemInput, UpdateOrderStatusInput } from '@lupa/types';

export const orderService = {
  async getOrder(id: string) {
    const { data } = await getApiClient().query<{ getOrder: Order }>({ query: GET_ORDER, variables: { id } });
    return data?.getOrder ?? null;
  },
  async listOrders(filters = {}) {
    const { data } = await getApiClient().query<{ listOrders: Order[] }>({ query: LIST_ORDERS, variables: filters });
    return data?.listOrders ?? null;
  },
  async createOrder(input: CreateOrderInput) {
    const { data } = await getApiClient().mutate<{ createOrder: Order }>({ mutation: CREATE_ORDER, variables: { input } });
    return data?.createOrder ?? null;
  },
  async createOrderItem(input: CreateOrderItemInput) {
    const { data } = await getApiClient().mutate<{ createOrderItem: unknown }>({ mutation: CREATE_ORDER_ITEM, variables: { input } });
    return data?.createOrderItem ?? null;
  },
  async updateOrderStatus(id: string, input: UpdateOrderStatusInput) {
    const { data } = await getApiClient().mutate<{ updateOrderStatus: Order }>({ mutation: UPDATE_ORDER_STATUS, variables: { id, input } });
    return data?.updateOrderStatus ?? null;
  },
};
export type { Order, CreateOrderInput, CreateOrderItemInput, UpdateOrderStatusInput };
