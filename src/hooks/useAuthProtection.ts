'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function useAuthProtection(requiredRoles?: string[]) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // User not authenticated - redirect will happen, but we still need to return valid state
      return;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.includes(user.role);
      if (!hasRole) {
        // User doesn't have required role
        router.replace('/');
        return;
      }
    }
  }, [isAuthenticated, user, router, requiredRoles]);

  // Return loading state until authentication is verified
  if (!isAuthenticated || !user) {
    return { isLoading: true, isAuthorized: false };
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      return { isLoading: true, isAuthorized: false };
    }
  }

  return { isLoading: false, isAuthorized: true };
}

