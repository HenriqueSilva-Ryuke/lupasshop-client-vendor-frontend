/**
 * Shop mutations — re-exported from @lupa/api-client
 */
export {
  useCreateStore,
  useUpdateStore,
  useDeleteStore,
} from '@lupa/api-client/hooks';

// Legacy aliases
export const useCreateShopMutation = useCreateStore;
export const useUpdateShopMutation = useUpdateStore;
export const useDeleteShopMutation = useDeleteStore;
