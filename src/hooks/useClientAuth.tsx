'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import type { User, Role } from '@/stores/authStore';

/**
 * Client-only hook for auth store
 * Returns null during SSR, actual state on client
 */
export function useClientAuth() {
  const [isClient, setIsClient] = useState(false);
  
  const user = useAuthStore((state) => (isClient ? state.user : null));
  const token = useAuthStore((state) => (isClient ? state.token : null));
  const isAuthenticated = useAuthStore((state) => (isClient ? state.isAuthenticated : false));
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const logout = useAuthStore((state) => state.logout);
  const hasRole = useAuthStore((state) => state.hasRole);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    setIsClient(true);
    initializeAuth();
  }, [initializeAuth]);

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    setUser,
    setToken,
    logout,
    hasRole,
    isClient,
  };
}

/**
 * Client-only wrapper for components that need auth
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}
