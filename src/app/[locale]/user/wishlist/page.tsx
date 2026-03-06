'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { EmptyWishlist } from '@/components/ui/EmptyStates';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { useToast } from '@/components/ui/Toast';
import { useCartStore } from '@/stores/cartStore';
import { useWishlist, useRemoveFromWishlist, useAddToWishlist, useCurrentUser } from '@lupa/api-client/hooks';

export default function WishlistPage() {
  const t = useTranslations('customer.wishlist');
  const locale = useLocale();
  const { success } = useToast();
  const { addItem } = useCartStore();
  const { data: user } = useCurrentUser();
  const { data: wishlist = [], isLoading } = useWishlist(!!user);
  const removeFromWishlist = useRemoveFromWishlist();
  const addToWishlist = useAddToWishlist();

  const handleRemove = (productId: string) => {
    removeFromWishlist.mutate(productId);
  };

  const handleAddToCart = (item: (typeof wishlist)[0]) => {
    const product = item.product;
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] ?? '',
      stockQuantity: product.stockQuantity,
      storeId: product.store?.id ?? '',
      storeName: product.store?.name ?? '',
    });
    success(`${product.name} adicionado ao carrinho!`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <span className="text-gray-600">{t('itemsCount', { count: wishlist.length })}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={item.product.images[0] || '/placeholder.jpg'}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
              {item.product.store && (
                <p className="text-xs text-gray-500 mb-2">{item.product.store.name}</p>
              )}
              <p className="text-2xl font-bold text-primary mb-4">
                {item.product.price.toFixed(2)} AKZ
              </p>
              <div className="flex gap-2">
                <LoadingButton
                  onClick={() => handleAddToCart(item)}
                  loading={false}
                  disabled={item.product.stockQuantity === 0}
                  variant="default"
                  size="default"
                  className="flex-1"
                  leftIcon={<ShoppingCart className="w-4 h-4" />}
                >
                  {t('addToCart')}
                </LoadingButton>
                <button
                  onClick={() => handleRemove(item.product.id)}
                  disabled={removeFromWishlist.isPending}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
