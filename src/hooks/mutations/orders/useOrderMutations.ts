/**
 * Order mutations — re-exported from @lupa/api-client
 */
export {
  useCreateOrder,
  useUpdateOrderStatus,
} from '@lupa/api-client/hooks';

// Legacy aliases
export const useUpdateOrderStatusMutation = useUpdateOrderStatus;
