/**
 * Review hooks — re-exported from @lupa/api-client
 */
import { useReviews } from '@lupa/api-client/hooks';

export { useReviews };

// Legacy aliases
export const useReviewsQuery = useReviews;
export const useProductReviewsQuery = useReviews;
export const useReviewDetailsQuery = useReviews;
