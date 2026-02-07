'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { EmptyWishlist } from '@/components/ui/EmptyStates';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { useToast } from '@/components/ui/Toast';
import { useCartStore } from '@/stores/cartStore';

interface WishlistItem {
 id: string;
 product: {
 id: string;
 name: string;
 price: number;
 images: string[];
 stockQuantity: number;
 };
}

export default function WishlistPage() {
 const t = useTranslations('customer.wishlist');
 const locale = useLocale();
 const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
 const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
 const { undo, success } = useToast();
 const { addItem } = useCartStore();

 const handleRemove = async (productId: string, productName: string) => {
 // Optimistic UI with undo
 const item = wishlist.find(i => i.product.id === productId);
 setWishlist(wishlist.filter(i => i.product.id !== productId));
 
 undo(
 `${productName} removido da lista de desejos`,
 () => {
 // Restore item
 if (item) {
 setWishlist(prev => [...prev, item]);
 }
 }
 );
 };

 const handleAddToCart = async (productId: string, productName: string) => {
 setLoadingItems(prev => new Set(prev).add(productId));
 
 try {
 // Simulate API call - replace with actual GraphQL mutation
 await new Promise(resolve => setTimeout(resolve, 500));
 
 const product = wishlist.find(i => i.product.id === productId)?.product;
 if (product) {
 addItem({
 id: product.id,
 name: product.name,
 price: product.price,
 quantity: 1,
 image: product.images[0],
 stockQuantity: product.stockQuantity,
 storeId: 'store-1', // Would come from product data
 storeName: 'Loja'
 });
 }
 
 success(`${productName} adicionado ao carrinho!`);
 } catch (error) {
 console.error('Error adding to cart:', error);
 } finally {
 setLoadingItems(prev => {
 const next = new Set(prev);
 next.delete(productId);
 return next;
 });
 }
 };

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
 <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
 <p className="text-2xl font-bold text-primary mb-4">
 {item.product.price.toFixed(2)} AKZ
 </p>
 <div className="flex gap-2">
 <LoadingButton
 onClick={() => handleAddToCart(item.product.id, item.product.name)}
 loading={loadingItems.has(item.product.id)}
 disabled={item.product.stockQuantity === 0}
 variant="default"
 size="default"
 className="flex-1"
 leftIcon={<ShoppingCart className="w-4 h-4" />}
 >
 {t('addToCart')}
 </LoadingButton>
 <button
 onClick={() => handleRemove(item.product.id, item.product.name)}
 className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-colors"
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
