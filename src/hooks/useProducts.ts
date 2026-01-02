import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import type { Product } from '@/graphql/types';
import { 
  GET_PRODUCT, 
  LIST_PRODUCTS 
} from '@/graphql/queries';
import { 
  CREATE_PRODUCT, 
  UPDATE_PRODUCT, 
  DELETE_PRODUCT 
} from '@/graphql/mutations';
import { CreateProductInput, UpdateProductInput } from '@/lib/validations';

export const useProduct = (id?: string) => {
  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apolloClient.query<{ getProduct: Product }>({
        query: GET_PRODUCT,
        variables: { id },
      });
      return data?.getProduct ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProducts = (filters?: {
  storeId?: string;
  categoryId?: string;
  search?: string;
  isNew?: boolean;
  isTrending?: boolean;
  limit?: number;
  offset?: number;
  featured?: boolean;
}) => {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listProducts: Product[] }>({
        query: LIST_PRODUCTS,
        variables: filters,
      });
      return data?.listProducts ?? [];
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data } = await apolloClient.mutate<{ createProduct: Product }>({
        mutation: CREATE_PRODUCT,
        variables: { input },
      });
      return data?.createProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateProductInput }) => {
      const { data } = await apolloClient.mutate<{ updateProduct: Product }>({
        mutation: UPDATE_PRODUCT,
        variables: { id, input },
      });
      return data?.updateProduct;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apolloClient.mutate<{ deleteProduct: boolean }>({
        mutation: DELETE_PRODUCT,
        variables: { id },
      });
      return data?.deleteProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
