'use client';

import React, { useMemo, useState } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES, LIST_ORDERS } from '@/graphql/queries';

export default function OrdersView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: userData } = useQuery(GET_CURRENT_USER);
  const ownerId = userData?.me?.id;

  const { data: storesData } = useQuery(LIST_STORES, {
    variables: { ownerId },
    skip: !ownerId,
  });

  const storeId = storesData?.listStores?.[0]?.id;

  const { data: ordersData, loading } = useQuery(LIST_ORDERS, {
    variables: {
      storeId,
      status: statusFilter === 'all' ? undefined : statusFilter,
      limit: 100,
      offset: 0,
    },
    skip: !storeId,
    fetchPolicy: 'cache-and-network',
  });

  const orders = ordersData?.listOrders?.orders || [];

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [orders, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';
      case 'SHIPPED':
        return 'bg-primary100 text-blue-700';
      case 'PAID':
        return 'bg-amber-100 text-amber-700';
      case 'PENDING':
        return 'bg-muted text-foreground';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track your orders</p>
        </div>
        <button className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2 rounded-xl hover:bg-muted transition-colors">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button className="p-2 bg-muted border border-border rounded-xl hover:bg-muted text-muted-foreground">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">#{order.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {(order.user?.fullName || 'U').charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{order.user?.fullName || '—'}</h3>
                        <p className="text-xs text-muted-foreground">{order.user?.email || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.totalAmount)}
                    </div>
                    <p className="text-xs text-muted-foreground">{order.orderItems.length} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-muted-foreground" size={24} />
            </div>
            <h3 className="text-lg font-medium text-foreground">No orders found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
