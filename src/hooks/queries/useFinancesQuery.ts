import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface Finance {
  id: string;
  type: 'payment' | 'withdrawal' | 'refund' | 'commission';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  orderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancesStats {
  totalRevenue: number;
  totalWithdrawals: number;
  currentBalance: number;
  pendingBalance: number;
  transactionsCount: number;
  averageOrderValue: number;
}

export interface FinancesResponse {
  data: Finance[];
  total: number;
  page: number;
  limit: number;
}

export interface FinancesFilters {
  page?: number;
  limit?: number;
  type?: Finance['type'];
  status?: Finance['status'];
  startDate?: string;
  endDate?: string;
}

export const useFinancesQuery = (filters?: FinancesFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCES.TRANSACTIONS(filters?.page, filters?.limit),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.type) params.append('type', filters.type);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const { data } = await apiClient.get<FinancesResponse>(
        `${API_ENDPOINTS.FINANCES.TRANSACTIONS}?${params.toString()}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFinancesStatsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCES.STATS,
    queryFn: async () => {
      const { data } = await apiClient.get<FinancesStats>(
        API_ENDPOINTS.FINANCES.STATS
      );
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const usePaymentsQuery = (filters?: FinancesFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.FINANCES.PAYMENTS(filters?.page, filters?.limit),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const { data } = await apiClient.get<FinancesResponse>(
        `${API_ENDPOINTS.FINANCES.PAYMENTS}?${params.toString()}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
