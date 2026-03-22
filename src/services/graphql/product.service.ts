/**
 * @deprecated — Use hooks from 'lupa-api-client/hooks' instead
 */
import { getApiClient } from 'lupa-api-client/client';
import { GET_PRODUCT, LIST_PRODUCTS } from 'lupa-api-client/queries';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from 'lupa-api-client/mutations';
import type { Product, CreateProductInput, UpdateProductInput } from 'lupa-types';

export const productService = {
  async getProduct(id: string) {
    const { data } = await getApiClient().query<{ getProduct: Product }>({ query: GET_PRODUCT, variables: { id } });
    return data?.getProduct ?? null;
  },
  async listProducts(filters = {}) {
    const { data } = await getApiClient().query<{ listProducts: Product[] }>({ query: LIST_PRODUCTS, variables: filters });
    return data?.listProducts ?? null;
  },
  async createProduct(input: CreateProductInput) {
    const { data } = await getApiClient().mutate<{ createProduct: Product }>({ mutation: CREATE_PRODUCT, variables: { input } });
    return data?.createProduct ?? null;
  },
  async updateProduct(id: string, input: UpdateProductInput) {
    const { data } = await getApiClient().mutate<{ updateProduct: Product }>({ mutation: UPDATE_PRODUCT, variables: { id, input } });
    return data?.updateProduct ?? null;
  },
  async deleteProduct(id: string) {
    await getApiClient().mutate({ mutation: DELETE_PRODUCT, variables: { id } });
    return true;
  },
};
export type { Product, CreateProductInput, UpdateProductInput };
