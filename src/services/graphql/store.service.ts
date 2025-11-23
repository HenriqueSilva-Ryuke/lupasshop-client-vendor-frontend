// src/services/graphql/store.service.ts
import { apolloClient } from '@/lib/graphql-client';
import { GET_STORE, LIST_STORES } from '@/graphql/queries';
import { CREATE_STORE, UPDATE_STORE, DELETE_STORE } from '@/graphql/mutations';
import type { Store, CreateStoreInput, UpdateStoreInput } from '@/graphql/types';

export const storeService = {
    async getStore(id: string): Promise<Store | null> {
        try {
            const result = await apolloClient.query<{ getStore: Store }>({
                query: GET_STORE,
                variables: { id },
                fetchPolicy: 'network-only',
            });
            return result?.data?.getStore ?? null;
        } catch (error) {
            console.error('GraphQL getStore error:', error);
            return null;
        }
    },

    async listStores(filters: { ownerId?: string; categoryId?: string; search?: string } = {}): Promise<Store[] | null> {
        try {
            const result = await apolloClient.query<{ listStores: Store[] }>({
                query: LIST_STORES,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            return result?.data?.listStores ?? null;
        } catch (error) {
            console.error('GraphQL listStores error:', error);
            return null;
        }
    },

    async createStore(input: CreateStoreInput): Promise<Store | null> {
        try {
            const result = await apolloClient.mutate<{ createStore: Store }>({
                mutation: CREATE_STORE,
                variables: { input },
            });
            return result?.data?.createStore ?? null;
        } catch (error) {
            console.error('GraphQL createStore error:', error);
            return null;
        }
    },

    async updateStore(id: string, input: UpdateStoreInput): Promise<Store | null> {
        try {
            const result = await apolloClient.mutate<{ updateStore: Store }>({
                mutation: UPDATE_STORE,
                variables: { id, input },
            });
            return result?.data?.updateStore ?? null;
        } catch (error) {
            console.error('GraphQL updateStore error:', error);
            return null;
        }
    },

    async deleteStore(id: string): Promise<boolean> {
        try {
            await apolloClient.mutate({
                mutation: DELETE_STORE,
                variables: { id },
            });
            return true;
        } catch (error) {
            console.error('GraphQL deleteStore error:', error);
            return false;
        }
    },
};

export type { Store, CreateStoreInput, UpdateStoreInput };
