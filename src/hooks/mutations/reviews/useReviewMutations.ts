/**
 * Review mutations — re-exported from lupa-api-client
 */
import {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from 'lupa-api-client/hooks';

export { useCreateReview, useUpdateReview, useDeleteReview };

// Legacy aliases
export const useDeleteReviewMutation = useDeleteReview;
