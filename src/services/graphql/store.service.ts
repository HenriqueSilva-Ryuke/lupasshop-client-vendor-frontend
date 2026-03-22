/**
 * @deprecated — Use hooks from 'lupa-api-client/hooks' instead
 */
import { getApiClient } from 'lupa-api-client/client';
import { GET_STORE, LIST_STORES } from 'lupa-api-client/queries';
import { CREATE_STORE, UPDATE_STORE, DELETE_STORE } from 'lupa-api-client/mutations';
import type { Store, CreateStoreInput, UpdateStoreInput } from 'lupa-types';

export const storeService = {
  async getStore(id: string) {
    const { data } = await getApiClient().query<{ getStore: Store }>({ query: GET_STORE, variables: { id } });
    return data?.getStore ?? null;
  },
  async listStores(filters = {}) {
    const { data } = await getApiClient().query<{ listStores: Store[] }>({ query: LIST_STORES, variables: filters });
    return data?.listStores ?? null;
  },
  async createStore(input: CreateStoreInput) {
    const { data } = await getApiClient().mutate<{ createStore: Store }>({ mutation: CREATE_STORE, variables: { input } });
    return data?.createStore ?? null;
  },
  async updateStore(id: string, input: UpdateStoreInput) {
    const { data } = await getApiClient().mutate<{ updateStore: Store }>({ mutation: UPDATE_STORE, variables: { id, input } });
    return data?.updateStore ?? null;
  },
  async deleteStore(id: string) {
    await getApiClient().mutate({ mutation: DELETE_STORE, variables: { id } });
    return true;
  },
};
export type { Store, CreateStoreInput, UpdateStoreInput };
