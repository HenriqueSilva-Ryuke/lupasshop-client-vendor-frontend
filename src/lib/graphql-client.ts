import { ApolloClient, InMemoryCache, HttpLink, split, from } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { onError } from '@apollo/client/link/error';

// Environment variables with fallbacks
const HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL || 'http://localhost:4000/graphql';
const WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql';

// HTTP Link for queries and mutations
// credentials: 'include' is crucial for HttpOnly cookies
const httpLink = new HttpLink({
    uri: HTTP_URL,
    credentials: 'include',
});

// WebSocket Link for subscriptions
// Only create in browser environment
const wsLink = typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
            url: WS_URL,
            // Cookies are automatically sent by the browser for WebSocket connections
            // if the domain matches.
            retryAttempts: 5,
            shouldRetry: () => true,
        })
    )
    : null;

// Error Handling Link
const errorLink = onError((error) => {
    const { graphQLErrors, networkError } = error as any;
    if (graphQLErrors) {
        graphQLErrors.forEach((err: any) => {
            const { message, locations, path, extensions } = err;
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            if (extensions?.code === 'UNAUTHENTICATED' || message.includes('Unauthorized')) {
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
                    window.location.href = '/auth/login';
                }
            }
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// Split link to route operations correctly
// Subscriptions go to WebSocket, everything else goes to HTTP
const splitLink = typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    )
    : httpLink;

// Combine error link with the split link
const link = from([errorLink, splitLink]);

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    listProducts: {
                        // Merge strategy for pagination if needed later
                        merge(existing = [], incoming) {
                            return [...incoming];
                        },
                    },
                    listStores: {
                        merge(existing = [], incoming) {
                            return [...incoming];
                        },
                    },
                },
            },
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});
