'use client';

import { ApiProvider } from "@lupa/api-client/provider";
import { QueryProvider, queryClient } from "@/providers/QueryProvider";

const apiConfig = {
  httpUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  wsUrl: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
  onAuthError: () => {
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
      window.location.href = '/auth/login';
    }
  },
};

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ApiProvider config={apiConfig} queryClient={queryClient}>
        {children}
      </ApiProvider>
    </QueryProvider>
  );
}