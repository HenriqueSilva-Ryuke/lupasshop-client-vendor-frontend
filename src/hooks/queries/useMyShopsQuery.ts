/**
 * Store hooks — re-exported from @lupa/api-client
 */
export { useSellerStore, useStore, useStores } from '@lupa/api-client/hooks';

// Legacy aliases
export const useMyShopsQuery = useSellerStore;
export const useShopDetailsQuery = useStore;
export const useShopStatisticsQuery = useStore;
