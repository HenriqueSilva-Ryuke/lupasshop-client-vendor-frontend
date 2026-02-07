/**
 * Settings hooks — re-exported from @lupa/api-client
 */
export { useCurrentUser } from '@lupa/api-client/hooks';

// Legacy alias
export const useUserProfileQuery = useCurrentUser;
