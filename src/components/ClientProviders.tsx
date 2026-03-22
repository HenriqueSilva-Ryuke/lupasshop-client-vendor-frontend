'use client';

import { ApiProvider } from "lupa-api-client/provider";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "@/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/Toast";

// Public routes that don't require authentication
const PUBLIC_ROUTES_PATTERNS = [
  /\/(marketplace|about|cart|product|store)(\?|#|\/|$)/,
  /\/(en|pt)\/?$/ // home page
];

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES_PATTERNS.some(pattern => pattern.test(pathname));
};

const apiConfig = {
  httpUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
  wsUrl: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:3000/graphql',
  onAuthError: () => {
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
      // Only redirect to login if NOT on a public route
      if (!isPublicRoute(window.location.pathname)) {
        // Extract locale from current path or default to 'en'
        const locale = window.location.pathname.match(/^\/(en|pt)\//)?.[1] || 'en';
        window.location.href = `/${locale}/auth/login`;
      }
      // For public routes, don't redirect - let the component handle missing auth gracefully
    }
  },
};

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider config={apiConfig} queryClient={queryClient}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}