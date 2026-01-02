import apiClient from '@/config/axios';
import { API_ENDPOINTS } from '@/config/api';

// Types for Auth Service
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
}

interface ApiError {
  statusCode: number;
  code: string;
  error: string;
  message: string;
}

// Auth Service
export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse | null> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse | null> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Register error:', error);
      return null;
    }
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string } | null> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        data
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Forgot password error:', error);
      return null;
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string } | null> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        data
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Reset password error:', error);
      return null;
    }
  }
};

export type { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, AuthResponse, ApiError };
