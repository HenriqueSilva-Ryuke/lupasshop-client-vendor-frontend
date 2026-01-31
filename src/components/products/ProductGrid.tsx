'use client';

import { useProducts } from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    stockQuantity: number;
    isNew?: boolean;
    isTrending?: boolean;
    store: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-square">
          {Array.isArray(product.images) && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-100">
              Sem imagem
            </div>
          )}
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-blue-500 text-black text-xs px-2 py-1 rounded">
              Novo
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-black text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <Link 
            href={`/stores/${product.store.slug}`}
            className="text-sm text-gray-600 hover:text-blue-600 mb-2 block"
            onClick={(e) => e.stopPropagation()}
          >
            {product.store.name}
          </Link>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-700">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
              </span>
            )}
          </div>
          
          {product.stockQuantity === 0 && (
            <p className="text-sm text-red-600 mt-2">Esgotado</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProductGridProps {
  filters?: {
    storeId?: string;
    categoryId?: string;
    search?: string;
    isNew?: boolean;
    isTrending?: boolean;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const { data: products, isLoading, error } = useProducts(filters);

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar produtos</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
