/**
 * Review mutations — re-exported from @lupa/api-client
 */
export {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from '@lupa/api-client/hooks';

// Legacy aliases
export const useDeleteReviewMutation = useDeleteReview;
