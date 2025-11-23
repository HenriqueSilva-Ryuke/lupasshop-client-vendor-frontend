// src/services/graphql/auth.service.ts
import { apolloClient } from '@/lib/graphql-client';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import { GET_CURRENT_USER } from '@/graphql/queries';
import type { LoginInput, CreateUserInput, AuthResponse } from '@/graphql/types';

export const authService = {
    async login(data: LoginInput): Promise<AuthResponse | null> {
        try {
            const result = await apolloClient.mutate<{ login: AuthResponse }>({
                mutation: LOGIN,
                variables: { input: data },
            });
            return result?.data?.login ?? null;
        } catch (error) {
            console.error('GraphQL login error:', error);
            return null;
        }
    },

    async signup(data: CreateUserInput): Promise<AuthResponse | null> {
        try {
            const result = await apolloClient.mutate<{ signup: AuthResponse }>({
                mutation: SIGNUP,
                variables: { input: data },
            });
            return result?.data?.signup ?? null;
        } catch (error) {
            console.error('GraphQL signup error:', error);
            return null;
        }
    },

    async getCurrentUser(): Promise<AuthResponse['user'] | null> {
        try {
            const result = await apolloClient.query<{ me: AuthResponse['user'] }>({
                query: GET_CURRENT_USER,
                fetchPolicy: 'network-only', // ensure fresh data
            });
            return result?.data?.me ?? null;
        } catch (error) {
            console.error('GraphQL getCurrentUser error:', error);
            return null;
        }
    },
};

export type { LoginInput, CreateUserInput, AuthResponse };
