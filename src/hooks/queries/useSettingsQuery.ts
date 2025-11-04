import { useQuery } from '@tanstack/react-query';
import apiClient from '@/config/axios';
import { API_ENDPOINTS, QUERY_KEYS } from '@/config/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  role: 'customer' | 'merchant' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface ShopSettings {
  id: string;
  shopId: string;
  theme?: string;
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
  };
  shippingMethods?: string[];
  paymentMethods?: string[];
}

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.PROFILE,
    queryFn: async () => {
      const { data } = await apiClient.get<UserProfile>(
        API_ENDPOINTS.USERS.PROFILE
      );
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useShopSettingsQuery = (shopId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.SHOPS.SETTINGS(shopId ?? ''),
    queryFn: async () => {
      if (!shopId) throw new Error('Shop ID is required');
      const { data } = await apiClient.get<ShopSettings>(
        API_ENDPOINTS.SHOPS.SETTINGS(shopId)
      );
      return data;
    },
    enabled: !!shopId,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
