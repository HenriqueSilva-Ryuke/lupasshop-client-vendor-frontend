'use client';

import { QueryProvider } from "@/providers/QueryProvider";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/graphql-client";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ApolloProvider>
  );
}