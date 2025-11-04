import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  shopId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment?: string;
  status: 'approved' | 'pending' | 'rejected';
  verified: boolean;
  helpfulCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  data: Review[];
  total: number;
  page: number;
  limit: number;
}

export interface ReviewsFilters {
  page?: number;
  limit?: number;
  status?: Review['status'];
  rating?: number;
  search?: string;
}

export const useReviewsQuery = (filters?: ReviewsFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.LIST(undefined, undefined),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.rating) params.append('rating', filters.rating.toString());
      if (filters?.search) params.append('search', filters.search);

      const { data } = await apiClient.get<ReviewsResponse>(
        `${API_ENDPOINTS.REVIEWS.BY_SHOP}?${params.toString()}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProductReviewsQuery = (productId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.LIST(productId ?? undefined),
    queryFn: async () => {
      if (!productId) throw new Error('Product ID is required');
      const { data } = await apiClient.get<ReviewsResponse>(
        API_ENDPOINTS.REVIEWS.BY_PRODUCT(productId)
      );
      return data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useReviewDetailsQuery = (reviewId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS.DETAIL(reviewId ?? ''),
    queryFn: async () => {
      if (!reviewId) throw new Error('Review ID is required');
      const { data } = await apiClient.get<Review>(
        API_ENDPOINTS.REVIEWS.BY_ID(reviewId)
      );
      return data;
    },
    enabled: !!reviewId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
