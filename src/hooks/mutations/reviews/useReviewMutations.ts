import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface ModerateReviewPayload {
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface RespondToReviewPayload {
  response: string;
}

export const useModeratReviewMutation = (reviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ModerateReviewPayload) => {
      const { data } = await apiClient.patch(
        API_ENDPOINTS.REVIEWS.MODERATE(reviewId),
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS.DETAIL(reviewId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS.LIST(),
      });
    },
  });
};

export const useRespondToReviewMutation = (reviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RespondToReviewPayload) => {
      const { data } = await apiClient.post(
        `${API_ENDPOINTS.REVIEWS.BY_ID(reviewId)}/response`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS.DETAIL(reviewId),
      });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      await apiClient.delete(
        API_ENDPOINTS.REVIEWS.BY_ID(reviewId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEWS.LIST(),
      });
    },
  });
};
