import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql-client';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  storeId: string;
  isNew: boolean;
  isTrending: boolean;
  stockQuantity: number;
}

const FEATURED_PRODUCTS_QUERY = gql`
  query GetFeaturedProducts($limit: Int!, $offset: Int, $featured: Boolean) {
    listProducts(limit: $limit, offset: $offset, featured: $featured) {
      id
      name
      slug
      price
      originalPrice
      images
      description
      rating
      reviewCount
      storeId
      isNew
      isTrending
      stockQuantity
    }
  }
`;

export function useFeaturedProducts(limit: number = 8, offset: number = 0) {
  return useQuery<Product[]>({
    queryKey: ['featured-products', limit, offset],
        queryFn: async () => {
          const { data } = await apolloClient.query<{ listProducts: Product[] }>({
            query: FEATURED_PRODUCTS_QUERY,
            variables: { limit, offset, featured: true },
          });
          return data?.listProducts ?? [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

