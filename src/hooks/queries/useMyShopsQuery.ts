/**
 * Store hooks — re-exported from lupa-api-client
 */
import { useSellerStore, useStore, useStores } from 'lupa-api-client/hooks';

export { useSellerStore, useStore, useStores };

// Legacy aliases
export const useMyShopsQuery = useSellerStore;
export const useShopDetailsQuery = useStore;
export const useShopStatisticsQuery = useStore;
