import { create } from 'zustand';
import { setCookie, getCookie, deleteCookie } from '@/lib/cookies';

export type Role = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  hasRole: (role: Role | Role[]) => boolean;
  initializeAuth: () => void;
}

const TOKEN_COOKIE_NAME = 'auth_token';
const USER_COOKIE_NAME = 'auth_user';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  setAuth: (user, token) => {
    setCookie(TOKEN_COOKIE_NAME, token, { days: 7, secure: true });
    setCookie(USER_COOKIE_NAME, JSON.stringify(user), { days: 7, secure: true });
    set({ user, token, isAuthenticated: true });
  },
  
  setUser: (user) => {
    if (user) {
      setCookie(USER_COOKIE_NAME, JSON.stringify(user), { days: 7, secure: true });
    } else {
      deleteCookie(USER_COOKIE_NAME);
    }
    set({ user, isAuthenticated: !!user });
  },
  
  setToken: (token) => {
    if (token) {
      setCookie(TOKEN_COOKIE_NAME, token, { days: 7, secure: true });
    } else {
      deleteCookie(TOKEN_COOKIE_NAME);
    }
    set({ token });
  },
  
  logout: () => {
    deleteCookie(TOKEN_COOKIE_NAME);
    deleteCookie(USER_COOKIE_NAME);
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  hasRole: (role) => {
    const { user } = get();
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  },
  
  initializeAuth: () => {
    const token = getCookie(TOKEN_COOKIE_NAME);
    const userStr = getCookie(USER_COOKIE_NAME);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user from cookie:', error);
        deleteCookie(TOKEN_COOKIE_NAME);
        deleteCookie(USER_COOKIE_NAME);
      }
    }
  },
}));
