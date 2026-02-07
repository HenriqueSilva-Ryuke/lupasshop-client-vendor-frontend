/**
 * Order hooks — re-exported from @lupa/api-client
 */
export { useOrders, useOrder } from '@lupa/api-client/hooks';

// Legacy aliases
export const useOrdersQuery = useOrders;
export const useOrderDetailsQuery = useOrder;
export const useRecentOrdersQuery = useOrders;
