import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql-client';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  type: 'STORE' | 'PRODUCT';
  productsCount: number;
}

const CATEGORIES_QUERY = gql`
  query GetCategories($type: CategoryType, $limit: Int) {
    listCategories(type: $type, limit: $limit) {
      id
      name
      slug
      icon
      type
      productsCount
    }
  }
`;

export function useCategories(type?: 'STORE' | 'PRODUCT', limit?: number) {
  return useQuery<Category[]>({
    queryKey: ['categories', type, limit],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ listCategories: Category[] }>({
        query: CATEGORIES_QUERY,
        variables: { type, limit },
      });
      return data?.listCategories ?? [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
