'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { mockShops, mockOrders, mockDashboardProducts } from '@/lib/mock-data';
import Image from 'next/image';

export default function OverviewView() {
  // Calculate stats from mocks
  const totalRevenue = mockShops.reduce((acc, shop) => acc + shop.revenue, 0);
  const totalOrders = mockShops.reduce((acc, shop) => acc + shop.totalOrders, 0);
  const totalProducts = mockDashboardProducts.length;
  const totalCustomers = new Set(mockOrders.map(o => o.customer.email)).size;

  const stats = [
    {
      title: 'Total Revenue',
      value: new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(totalRevenue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Products',
      value: totalProducts.toString(),
      change: '-2.4%',
      trend: 'down',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Customers',
      value: totalCustomers.toString(),
      change: '+5.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {order.customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items • {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}
                  </p>
                  <p className={`text-xs font-bold capitalize ${order.status === 'delivered' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {mockDashboardProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg relative overflow-hidden shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: product.currency }).format(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
