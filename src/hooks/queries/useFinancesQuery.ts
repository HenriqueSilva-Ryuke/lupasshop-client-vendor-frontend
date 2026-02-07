/**
 * Finance hooks — re-exported from @lupa/api-client
 */
export {
  useFinancialSummary,
  useStoreBalance,
  useUserFinances,
  usePayouts,
} from '@lupa/api-client/hooks';

// Legacy alias for backward compatibility
export const useFinancesQuery = useFinancialSummary;
export const useFinancesStatsQuery = useFinancialSummary;
export const usePaymentsQuery = usePayouts;
