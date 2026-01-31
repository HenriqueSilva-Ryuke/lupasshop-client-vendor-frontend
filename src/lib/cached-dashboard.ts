import { unstable_cache } from 'next/cache';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  activeProducts: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  date: string;
}

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ||
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  'http://localhost:4000/graphql';

async function fetchGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message || 'GraphQL error');
  }
  return json.data as T;
}

export const getDashboardStats = unstable_cache(async (): Promise<DashboardStats> => {
  const data = await fetchGraphQL<{ getSellerDashboard: { stats: DashboardStats } }>(
    `query GetSellerDashboard($days: Int) {
      getSellerDashboard(days: $days) {
        stats {
          totalSales
          totalOrders
          totalProducts
          activeProducts
        }
      }
    }`,
    { days: 30 }
  );

  return data.getSellerDashboard.stats;
}, ['dashboard-stats'], { revalidate: 300 });

export const getRecentOrders = unstable_cache(async (): Promise<RecentOrder[]> => {
  const data = await fetchGraphQL<{ getSellerDashboard: { recentOrders: any[] } }>(
    `query GetSellerDashboard($recentLimit: Int) {
      getSellerDashboard(recentLimit: $recentLimit) {
        recentOrders {
          id
          totalAmount
          status
          createdAt
          user { fullName }
        }
      }
    }`,
    { recentLimit: 5 }
  );

  return (data.getSellerDashboard.recentOrders || []).map((order: any) => ({
    id: order.id,
    orderNumber: `#${order.id.slice(0, 8)}`,
    customer: order.user?.fullName || '—',
    amount: order.totalAmount,
    status: order.status,
    date: order.createdAt,
  }));
}, ['recent-orders'], { revalidate: 300 });
