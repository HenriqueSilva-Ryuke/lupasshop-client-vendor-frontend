// src/services/graphql/product.service.ts
import { apolloClient } from '@/lib/graphql-client';
import { GET_PRODUCT, LIST_PRODUCTS } from '@/graphql/queries';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '@/graphql/mutations';
import type { Product, CreateProductInput, UpdateProductInput } from '@/graphql/types';

export const productService = {
    async getProduct(id: string): Promise<Product | null> {
        try {
            const result = await apolloClient.query<{ getProduct: Product }>({
                query: GET_PRODUCT,
                variables: { id },
                fetchPolicy: 'network-only',
            });
            return result?.data?.getProduct ?? null;
        } catch (error) {
            console.error('GraphQL getProduct error:', error);
            return null;
        }
    },

    async listProducts(filters: { storeId?: string; categoryId?: string; search?: string } = {}): Promise<Product[] | null> {
        try {
            const result = await apolloClient.query<{ listProducts: Product[] }>({
                query: LIST_PRODUCTS,
                variables: filters,
                fetchPolicy: 'network-only',
            });
            return result?.data?.listProducts ?? null;
        } catch (error) {
            console.error('GraphQL listProducts error:', error);
            return null;
        }
    },

    async createProduct(input: CreateProductInput): Promise<Product | null> {
        try {
            const result = await apolloClient.mutate<{ createProduct: Product }>({
                mutation: CREATE_PRODUCT,
                variables: { input },
            });
            return result?.data?.createProduct ?? null;
        } catch (error) {
            console.error('GraphQL createProduct error:', error);
            return null;
        }
    },

    async updateProduct(id: string, input: UpdateProductInput): Promise<Product | null> {
        try {
            const result = await apolloClient.mutate<{ updateProduct: Product }>({
                mutation: UPDATE_PRODUCT,
                variables: { id, input },
            });
            return result?.data?.updateProduct ?? null;
        } catch (error) {
            console.error('GraphQL updateProduct error:', error);
            return null;
        }
    },

    async deleteProduct(id: string): Promise<boolean> {
        try {
            await apolloClient.mutate({
                mutation: DELETE_PRODUCT,
                variables: { id },
            });
            return true;
        } catch (error) {
            console.error('GraphQL deleteProduct error:', error);
            return false;
        }
    },
};

export type { Product, CreateProductInput, UpdateProductInput };
