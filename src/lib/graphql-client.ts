/**
 * @deprecated — Use lupa-api-client instead.
 * This file re-exports the unified Apollo client for backward compatibility.
 */
import { getApiClient } from 'lupa-api-client/client';

export const apolloClient = getApiClient();
