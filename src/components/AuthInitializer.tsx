'use client';

import { useClientAuth } from '@/hooks/useClientAuth';

/**
 * Auth initializer component
 * Loads auth state from cookies on mount (client-side only)
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  // This hook handles initialization internally
  useClientAuth();

  return <>{children}</>;
}
