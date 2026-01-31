'use client';

import React from 'react';
import { Plus, MapPin, Star, MoreVertical, Edit, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES } from '@/graphql/queries';

export default function ShopsView() {
 const { data: userData } = useQuery(GET_CURRENT_USER);
 const ownerId = userData?.me?.id;

 const { data: storesData, loading } = useQuery(LIST_STORES, {
 variables: { ownerId },
 skip: !ownerId,
 fetchPolicy: 'cache-and-network',
 });

 const shops = storesData?.listStores || [];

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-foreground">My Shops</h1>
 <p className="text-muted-foreground">Manage your stores and settings</p>
 </div>
 <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors">
 <Plus size={20} />
 <span>Create New Shop</span>
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
 {shops.map((shop: any) => (
 <div key={shop.id} className="bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 group">
 <div className="relative h-32 bg-muted">
 {shop.coverImageUrl ? (
 <Image
 src={shop.coverImageUrl}
 alt={shop.name}
 fill
 className="object-cover"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
 Sem imagem
 </div>
 )}
 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

 <div className="absolute top-3 right-3">
 <span className={`px-2 py-1 rounded-lg text-xs font-bold ${shop.approvalStatus === 'APPROVED' ? 'text-primary text-black' :
 shop.approvalStatus === 'PENDING' ? 'bg-amber-500 text-black' :
 'bg-destructive/100 text-black'
 }`}>
 {shop.approvalStatus}
 </span>
 </div>
 </div>

 <div className="p-5 pt-12 relative">
 <div className="absolute -top-10 left-5 p-1 bg-card rounded-xl shadow-sm">
 <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted border">
 {shop.logoUrl ? (
 <Image
 src={shop.logoUrl}
 alt={shop.name}
 fill
 className="object-cover"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
 {shop.name.substring(0, 2).toUpperCase()}
 </div>
 )}
 </div>
 </div>

 <div className="absolute top-4 right-4">
 <button className="p-2 text-muted-foreground hover:text-muted-foreground hover:bg-muted rounded-lg transition-colors">
 <MoreVertical size={20} />
 </button>
 </div>

 <div className="mb-4">
 <h3 className="text-lg font-bold text-foreground mb-1">{shop.name}</h3>
 <div className="flex items-center gap-4 text-sm text-muted-foreground">
 <div className="flex items-center gap-1">
 <MapPin size={14} />
 <span className="truncate max-w-[150px]">{shop.location || '—'}</span>
 </div>
 <div className="flex items-center gap-1">
 <Star size={14} className="text-amber-400 fill-amber-400" />
 <span>{shop.rating} ({shop.reviewCount})</span>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4 py-4 border-t">
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Revenue</p>
 <p className="text-lg font-bold text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(shop.stats?.totalRevenue || 0)}
 </p>
 </div>
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Orders</p>
 <p className="text-lg font-bold text-foreground">{shop.stats?.totalOrders || 0}</p>
 </div>
 </div>

 <div className="flex items-center gap-2 mt-4 pt-4 border-t">
 <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-muted text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium">
 <Edit size={16} />
 Edit
 </button>
 <Link
 href={`/store/${shop.slug}`}
 className="flex items-center justify-center gap-2 py-2 px-4 bg-muted text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium"
 >
 <ExternalLink size={16} />
 Visit
 </Link>
 </div>
 </div>
 </div>
 ))}

 {!loading && shops.length === 0 && (
 <div className="col-span-full p-12 text-center text-muted-foreground">Sem lojas cadastradas</div>
 )}
 </div>
 </div>
 );
}
