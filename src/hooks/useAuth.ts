/**
 * Unified auth hook — uses GraphQL exclusively via lupa-api-client
 * Replaces the old raw fetch()-based implementation
 */
'use client';

import { useCallback } from 'react';
import { useAuthState } from 'lupa-api-client/hooks';
import type { LoginInput, CreateUserInput } from 'lupa-types';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutate,
    signup: signupMutate,
    logout: logoutFn,
  } = useAuthState();

  const login = useCallback(
    async (credentials: LoginInput) => {
      try {
        const data = await loginMutate(credentials);
        return { success: true, data };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    [loginMutate]
  );

  const register = useCallback(
    async (credentials: { name: string; email: string; password: string }) => {
      try {
        const data = await signupMutate({
          fullName: credentials.name,
          email: credentials.email,
          password: credentials.password,
        });
        return { success: true, data };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    [signupMutate]
  );

  const forgotPassword = useCallback(async (_email: string) => {
    // TODO: Implement when backend supports forgotPassword mutation
    return { success: false, error: 'Not implemented' };
  }, []);

  const resetPassword = useCallback(async (_token: string, _newPassword: string) => {
    // TODO: Implement when backend supports resetPassword mutation
    return { success: false, error: 'Not implemented' };
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout: logoutFn,
  };
};
