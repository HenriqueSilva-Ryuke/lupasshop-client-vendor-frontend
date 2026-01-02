'use client';

import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { LIST_STORES } from '@/graphql/queries';

interface Store {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  location: string | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPromoted: boolean;
  isPremium: boolean;
  createdAt: string;
}

export function useSellerStore(userId: string | null) {
  return useQuery({
    queryKey: ['sellerStore', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const { data } = await apolloClient.query<{ listStores: Store[] }>({
        query: LIST_STORES,
        variables: {
          ownerId: userId,
          limit: 1,
        },
      });

      if (!data?.listStores || data.listStores.length === 0) {
        return null;
      }

      return data.listStores[0];
    },
    enabled: !!userId,
  });
}
