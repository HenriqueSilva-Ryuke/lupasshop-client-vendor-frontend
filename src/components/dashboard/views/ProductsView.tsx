'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { SELLER_PRODUCTS } from '@/graphql/queries';

export default function ProductsView() {
 const [searchQuery, setSearchQuery] = useState('');
 const [statusFilter, setStatusFilter] = useState<string>('all');

 const isActiveFilter = statusFilter === 'active' ? true : statusFilter === 'archived' ? false : undefined;

 const { data, loading } = useQuery(SELLER_PRODUCTS, {
 variables: { limit: 50, offset: 0, search: searchQuery || undefined, isActive: isActiveFilter },
 fetchPolicy: 'cache-and-network',
 });

 const products = data?.sellerProducts?.products || [];

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-foreground">Products</h1>
 <p className="text-muted-foreground">Manage your product catalog</p>
 </div>
 <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
 <Plus size={20} />
 <span>Add Product</span>
 </button>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-2xl border shadow-sm">
 <div className="flex-1 relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
 <input
 type="text"
 placeholder="Search products..."
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
 <option value="active">Active</option>
 <option value="archived">Archived</option>
 </select>
 <button className="p-2 bg-muted border border-border rounded-xl hover:bg-muted text-muted-foreground">
 <Filter size={20} />
 </button>
 </div>
 </div>

 <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-muted border-b">
 <tr>
 <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
 <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
 <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
 <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
 <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
 <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {products.map((product: any) => (
 <tr key={product.id} className="hover:bg-muted/50 transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
 {product.images?.[0] ? (
 <Image
 src={product.images[0]}
 alt={product.name}
 fill
 className="object-cover"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
 Sem imagem
 </div>
 )}
 </div>
 <div>
 <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
 <p className="text-xs text-muted-foreground">{product.store?.name || '—'}</p>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium capitalize">
 {product.category?.name || '—'}
 </span>
 </td>
 <td className="px-6 py-4">
 <div className="font-medium text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: product.currency || 'AOA' }).format(product.price)}
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2">
 <div className={`w-2 h-2 rounded-full ${product.stockQuantity > 10 ? 'text-primary' : product.stockQuantity > 0 ? 'bg-amber-500' : 'bg-destructive/100'}`} />
 <span className="text-sm text-muted-foreground">{product.stockQuantity} in stock</span>
 </div>
 </td>
 <td className="px-6 py-4">
 <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
 {product.isActive ? 'ACTIVE' : 'ARCHIVED'}
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="View">
 <Eye size={18} />
 </button>
 <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary50 rounded-lg transition-colors" title="Edit">
 <Edit size={18} />
 </button>
 <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Delete">
 <Trash2 size={18} />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {!loading && products.length === 0 && (
 <div className="p-12 text-center">
 <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
 <Search className="text-muted-foreground" size={24} />
 </div>
 <h3 className="text-lg font-medium text-foreground">No products found</h3>
 <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
 </div>
 )}
 </div>
 </div>
 );
}
