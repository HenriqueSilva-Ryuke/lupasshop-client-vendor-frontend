import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql-client';

interface Store {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPremium: boolean;
  isPromoted: boolean;
  location?: string | null;
}

const FEATURED_STORES_QUERY = gql`
  query GetFeaturedStores($limit: Int!, $offset: Int, $featured: Boolean, $promoted: Boolean) {
    listStores(limit: $limit, offset: $offset, featured: $featured, promoted: $promoted) {
      id
      name
      slug
      logoUrl
      description
      rating
      reviewCount
      isVerified
      isPremium
      isPromoted
      location
    }
  }
`;

export function useFeaturedStores(limit: number = 6, offset: number = 0, promoted: boolean = true) {
  return useQuery<Store[]>({
    queryKey: ['featured-stores', limit, offset, promoted],
      queryFn: async () => {
        const { data } = await apolloClient.query<{ listStores: Store[] }>({
          query: FEATURED_STORES_QUERY,
          variables: { limit, offset, featured: true, promoted },
        });
        return data?.listStores ?? [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
