/**
 * Shop mutations — re-exported from @lupa/api-client
 */
import {
  useCreateStore,
  useUpdateStore,
  useDeleteStore,
} from '@lupa/api-client/hooks';

export { useCreateStore, useUpdateStore, useDeleteStore };

// Legacy aliases
export const useCreateShopMutation = useCreateStore;
export const useUpdateShopMutation = useUpdateStore;
export const useDeleteShopMutation = useDeleteStore;
