/**
 * Settings hooks — re-exported from @lupa/api-client
 */
import { useCurrentUser } from '@lupa/api-client/hooks';

export { useCurrentUser };

// Legacy alias
export const useUserProfileQuery = useCurrentUser;
