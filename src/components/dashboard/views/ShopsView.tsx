'use client';

import React, { useState } from 'react';
import { Plus, Store, MapPin, Star, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { mockShops, DashboardShop } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopsView() {
  const [shops, setShops] = useState<DashboardShop[]>(mockShops);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Shops</h1>
          <p className="text-gray-500">Manage your stores and settings</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
          <Plus size={20} />
          <span>Create New Shop</span>
        </button>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Cover Image */}
            <div className="relative h-32 bg-gray-100">
              <Image
                src={shop.coverImage}
                alt={shop.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${shop.status === 'active' ? 'bg-green-500 text-black' :
                    shop.status === 'pending' ? 'bg-amber-500 text-black' :
                      'bg-red-500 text-black'
                  }`}>
                  {shop.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 pt-12 relative">
              {/* Logo */}
              <div className="absolute -top-10 left-5 p-1 bg-white rounded-xl shadow-sm">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src={shop.logo}
                    alt={shop.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Actions Menu (Mock) */}
              <div className="absolute top-4 right-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{shop.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span className="truncate max-w-[150px]">{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span>{shop.rating} ({shop.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Revenue</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(shop.revenue)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Orders</p>
                  <p className="text-lg font-bold text-gray-900">{shop.totalOrders}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  <Edit size={16} />
                  Edit
                </button>
                <Link
                  href={`/store/${shop.slug}`}
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Visit
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Shop Card (Empty State) */}
        <button className="flex flex-col items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Add New Shop</h3>
          <p className="text-gray-500 text-sm mt-1">Expand your business</p>
        </button>
      </div>
    </div>
  );
}
