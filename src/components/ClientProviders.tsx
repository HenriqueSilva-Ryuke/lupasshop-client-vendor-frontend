'use client';

import { QueryProvider } from "@/providers/QueryProvider";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/graphql-client";
import { AuthInitializer } from "@/components/AuthInitializer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
 return (
 <ApolloProvider client={apolloClient}>
 <QueryProvider>
 <AuthInitializer>
 {children}
 </AuthInitializer>
 </QueryProvider>
 </ApolloProvider>
 );
}