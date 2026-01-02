import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql-client';

const GLOBAL_SEARCH_QUERY = gql`
  query GlobalSearch($query: String!, $limit: Int) {
    globalSearch(query: $query, limit: $limit) {
      products {
        id
        name
        slug
        price
        images
        storeId
        rating
        reviewCount
      }
      stores {
        id
        name
        slug
        logoUrl
        rating
        reviewCount
        isVerified
      }
      categories {
        id
        name
        slug
        icon
      }
    }
  }
`;

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  storeId: string;
  rating: number;
  reviewCount: number;
}

interface SearchStore {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

interface SearchCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

interface SearchResults {
  products: SearchProduct[];
  stores: SearchStore[];
  categories: SearchCategory[];
}

export function useGlobalSearch(query: string, limit: number = 5) {
  return useQuery<SearchResults>({
    queryKey: ['globalSearch', query, limit],
    queryFn: async () => {
      const { data } = await apolloClient.query<{ globalSearch: SearchResults }>({
        query: GLOBAL_SEARCH_QUERY,
        variables: { query, limit },
      });
      return data?.globalSearch ?? { products: [], stores: [], categories: [] };
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
