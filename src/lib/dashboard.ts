'use server';

import { getDashboardStats, getRecentOrders } from './cached-dashboard';

// Server actions for client-side calls

export async function fetchDashboardStats() {
  return getDashboardStats();
}

export async function fetchRecentOrders() {
  return getRecentOrders();
}