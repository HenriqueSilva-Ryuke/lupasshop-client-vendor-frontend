import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import type { Store, Category } from '@/graphql/types';
import { 
  GET_STORE, 
  LIST_STORES,
  LIST_CATEGORIES 
} from '@/graphql/queries';
import { 
  CREATE_STORE, 
  UPDATE_STORE, 
  DELETE_STORE 
} from '@/graphql/mutations';
import { CreateStoreInput, UpdateStoreInput, CategoryTypeSchema } from '@/lib/validations';

export const useStore = (id?: string) => {
  return useQuery<Store | null>({
    queryKey: ['store', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apolloClient.query<{ getStore: Store }>({
        query: GET_STORE,
        variables: { id },
      });
      return data?.getStore ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useStores = (filters?: {
  ownerId?: string;
  categoryId?: string;
  search?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
  promoted?: boolean;
}) => {
  return useQuery<Store[]>({
    queryKey: ['stores', filters],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listStores: Store[] }>({
        query: LIST_STORES,
        variables: filters,
      });
      return data?.listStores ?? [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCategories = (type?: 'STORE' | 'PRODUCT') => {
  return useQuery<Category[]>({
    queryKey: ['categories', type],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listCategories: Category[] }>({
        query: LIST_CATEGORIES,
        variables: { type },
      });
      return data?.listCategories ?? [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateStoreInput) => {
      const { data } = await apolloClient.mutate<{ createStore: Store }>({
        mutation: CREATE_STORE,
        variables: { input },
      });
      return data?.createStore;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateStoreInput }) => {
      const { data } = await apolloClient.mutate<{ updateStore: Store }>({
        mutation: UPDATE_STORE,
        variables: { id, input },
      });
      return data?.updateStore;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['store', data.id] });
      }
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apolloClient.mutate<{ deleteStore: boolean }>({
        mutation: DELETE_STORE,
        variables: { id },
      });
      return data?.deleteStore;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
};
