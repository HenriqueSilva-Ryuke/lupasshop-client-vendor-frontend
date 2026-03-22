/**
 * Order mutations — re-exported from lupa-api-client
 */
import {
  useCreateOrder,
  useUpdateOrderStatus,
} from 'lupa-api-client/hooks';

export { useCreateOrder, useUpdateOrderStatus };

// Legacy aliases
export const useUpdateOrderStatusMutation = useUpdateOrderStatus;
