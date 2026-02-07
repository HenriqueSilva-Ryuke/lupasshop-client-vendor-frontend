'use client';

import { ApiProvider } from "@lupa/api-client/provider";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "@/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/Toast";

const apiConfig = {
  httpUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
  wsUrl: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:3000/graphql',
  onAuthError: () => {
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
      // Extract locale from current path or default to 'en'
      const locale = window.location.pathname.match(/^\/(en|pt)\//)?.[1] || 'en';
      window.location.href = `/${locale}/auth/login`;
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