/**
 * @deprecated — Use hooks from '@lupa/api-client/hooks' instead
 * Auth service is now handled via GraphQL mutations in the unified API client.
 * This file provides type re-exports for backward compatibility.
 */
import { getApiClient } from '@lupa/api-client/client';
import { LOGIN, SIGNUP } from '@lupa/api-client/mutations';
import { GET_CURRENT_USER } from '@lupa/api-client/queries';
import type { LoginInput, CreateUserInput, AuthResponse, User } from '@lupa/types';

// Types re-exported for backward compatibility
export type LoginRequest = LoginInput;
export type RegisterRequest = { name: string; email: string; password: string };
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = { token: string; password: string };
export type { AuthResponse };

// Legacy service object — delegates to unified GraphQL client
export const authService = {
  async login(data: LoginInput): Promise<AuthResponse | null> {
    try {
      const client = getApiClient();
      const result = await client.mutate<{ login: AuthResponse }>({
        mutation: LOGIN,
        variables: { input: data },
      });
      return result?.data?.login ?? null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse | null> {
    try {
      const client = getApiClient();
      const result = await client.mutate<{ signup: AuthResponse }>({
        mutation: SIGNUP,
        variables: {
          input: {
            email: data.email,
            password: data.password,
            fullName: data.name,
          } satisfies CreateUserInput,
        },
      });
      return result?.data?.signup ?? null;
    } catch (error) {
      console.error('Register error:', error);
      return null;
    }
  },

  async forgotPassword(_data: ForgotPasswordRequest): Promise<{ message: string } | null> {
    // TODO: Implement when backend supports this
    return null;
  },

  async resetPassword(_data: ResetPasswordRequest): Promise<{ message: string } | null> {
    // TODO: Implement when backend supports this
    return null;
  },
};
