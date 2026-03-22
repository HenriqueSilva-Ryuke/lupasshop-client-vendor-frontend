/**
 * Order hooks — re-exported from lupa-api-client
 */
import { useOrders, useOrder } from 'lupa-api-client/hooks';

export { useOrders, useOrder };

// Legacy aliases
export const useOrdersQuery = useOrders;
export const useOrderDetailsQuery = useOrder;
export const useRecentOrdersQuery = useOrders;
