import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql-client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  rating?: number;
  reviewCount?: number;
  store: {
    id: string;
    name: string;
  };
}

interface SearchProductsResponse {
  listProducts: Product[];
  countProducts: number;
}

const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String, $limit: Int!, $offset: Int!) {
    listProducts(search: $query, limit: $limit, offset: $offset) {
      id
      name
      description
      price
      originalPrice
      images
      rating
      reviewCount
      store {
        id
        name
      }
    }
    countProducts(search: $query)
  }
`;

export function useSearchProducts(
  query: string = '',
  limit: number = 12,
  offset: number = 0
) {
  return useQuery({
    queryKey: ['search-products', query, limit, offset],
    queryFn: async () => {
      if (!query.trim()) {
        return { products: [], total: 0 };
      }
      const { data } = await apolloClient.query<SearchProductsResponse>({
        query: SEARCH_PRODUCTS_QUERY,
        variables: { query: query || null, limit, offset },
      });
      return {
        products: data?.listProducts ?? [],
        total: data?.countProducts ?? 0,
      };
    },
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
