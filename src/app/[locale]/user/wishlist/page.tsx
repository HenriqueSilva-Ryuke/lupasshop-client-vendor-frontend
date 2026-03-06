'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { EmptyWishlist } from '@/components/ui/EmptyStates';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { useToast } from '@/components/ui/Toast';
import { useCartStore } from '@/stores/cartStore';
import { useWishlist, useRemoveFromWishlist, useAddToWishlist, useCurrentUser } from '@lupa/api-client/hooks';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { pageContainerClass, sectionTitleClass } from '@/components/ui/primitives';

export default function WishlistPage() {
  const t = useTranslations('customer.wishlist');
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
      <div className={pageContainerClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
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
    <div className={pageContainerClass}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={sectionTitleClass}>{t('title')}</h1>
        <span className="text-muted-foreground">{t('itemsCount', { count: wishlist.length })}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={item.product.images[0] || '/placeholder.jpg'}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
              {item.product.store && (
                <p className="text-xs text-muted-foreground mb-2">{item.product.store.name}</p>
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
                <Button
                  onClick={() => handleRemove(item.product.id)}
                  disabled={removeFromWishlist.isPending}
                  variant="outline"
                  className="px-4 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
