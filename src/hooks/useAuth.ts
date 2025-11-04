import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';

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
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const useAuth = () => {
  const { user, token, setUser, setToken, logout } = useAuthStore();

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
      setToken(data.token);
      setUser(data.user);
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
      setToken(data.token);
      setUser(data.user);
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
