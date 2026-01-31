'use client';

import { useStores } from '@/hooks/useStores';
import Image from 'next/image';
import Link from 'next/link';

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    rating: number;
    reviewCount: number;
    isVerified?: boolean;
    isPremium?: boolean;
    category?: {
      name: string;
      icon?: string;
    };
  };
}

function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/stores/${store.slug}`} className="group">
      <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
          {store.coverImageUrl && (
            <Image
              src={store.coverImageUrl}
              alt={store.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        
        {/* Logo */}
        <div className="relative px-4 pb-4">
          <div className="absolute -top-10 left-4">
            <div className="relative w-20 h-20 rounded-full border-4 border-border bg-card overflow-hidden">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {store.name[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-12">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground text-lg">
                {store.name}
              </h3>
              {store.isVerified && (
                <span className="text-blue-500" title="Loja verificada">✓</span>
              )}
              {store.isPremium && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-2 py-0.5 rounded">
                  Premium
                </span>
              )}
            </div>
            
            {store.category && (
              <p className="text-sm text-muted-foreground mb-2">
                {store.category.icon && <span className="mr-1">{store.category.icon}</span>}
                {store.category.name}
              </p>
            )}
            
            {store.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {store.description}
              </p>
            )}
            
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-foreground font-medium">
                {store.rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({store.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StoresSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-card rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="h-32 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface StoreGridProps {
  filters?: {
    ownerId?: string;
    categoryId?: string;
    search?: string;
  };
}

export function StoreGrid({ filters }: StoreGridProps) {
  const { data: stores, isLoading, error } = useStores(filters);

  if (isLoading) {
    return <StoresSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar lojas</p>
      </div>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhuma loja encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store: any) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
