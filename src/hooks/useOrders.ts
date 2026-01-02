import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { 
  GET_ORDER, 
  LIST_ORDERS 
} from '@/graphql/queries';
import { 
  CREATE_ORDER 
} from '@/graphql/mutations';
import { CreateOrderInput } from '@/lib/validations';

export const useOrder = (id?: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apolloClient.query<{ getOrder: any }>({
        query: GET_ORDER,
        variables: { id },
      });
      return data?.getOrder ?? null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useOrders = (filters?: {
  userId?: string;
  storeId?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listOrders: any[] }>({
        query: LIST_ORDERS,
        variables: filters,
      });
      return data?.listOrders ?? [];
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      const { data } = await apolloClient.mutate<{ createOrder: any }>({
        mutation: CREATE_ORDER,
        variables: { input },
      });
      return data?.createOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
