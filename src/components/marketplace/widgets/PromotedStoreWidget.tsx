import React from 'react';
import { MarketplaceStore } from '@/types/marketplace';
import Image from 'next/image';
import { Star, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
interface PromotedStoreWidgetProps {
  store: MarketplaceStore;
}
export default function PromotedStoreWidget({ store }: PromotedStoreWidgetProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Featured Store</h3>
        <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          Promoted
        </span>
      </div>
      
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={store.coverImage}
          alt={store.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 relative">
        <div className="absolute -top-10 left-4 p-1 bg-white rounded-xl shadow-md">
          <div className="relative h-16 w-16 rounded-lg overflow-hidden">
            <Image
              src={store.logo}
              alt={store.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-lg text-gray-900">{store.name}</h4>
            {store.isVerified && (
              <BadgeCheck className="w-5 h-5 text-blue-500" />
            )}
          </div>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-gray-900">{store.rating}</span>
            <span className="text-sm text-gray-500">({store.reviewCount} reviews)</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {store.description}
          </p>
          <Link 
            href={`/store/${store.slug}`}
            className="block w-full py-2.5 text-center text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            Visit Store
          </Link>
        </div>
      </div>
    </div>
  );
}