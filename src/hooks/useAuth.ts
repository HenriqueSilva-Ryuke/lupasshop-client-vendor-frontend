import { useCallback } from 'react';
import { useClientAuth } from './useClientAuth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user?: {
    id: string;
    email: string;
    fullName?: string;
    name?: string;
    role?: string | null;
  } | null;
  token?: string | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const useAuth = () => {
  const { user, token, setUser, setToken, logout } = useClientAuth();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Falha no login');
      }

      const data: AuthResponse = await response.json();
      const normalizedUser = data.user
        ? {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.fullName ?? data.user.name ?? '',
            role: (data.user.role as 'BUYER' | 'SELLER' | 'ADMIN' | undefined) ?? 'BUYER',
          }
        : null;

      if (data.token) setToken(data.token);
      if (normalizedUser) setUser(normalizedUser);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, [setUser, setToken]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Falha no registro');
      }

      const data: AuthResponse = await response.json();
      const normalizedUser = data.user
        ? {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.fullName ?? data.user.name ?? '',
            role: (data.user.role as 'BUYER' | 'SELLER' | 'ADMIN' | undefined) ?? 'BUYER',
          }
        : null;

      if (data.token) setToken(data.token);
      if (normalizedUser) setUser(normalizedUser);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, [setUser, setToken]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Falha ao solicitar reset de senha');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      if (!response.ok) {
        throw new Error('Falha ao resetar senha');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, []);

  return {
    user,
    token,
    isAuthenticated: !!user,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout
  };
};
