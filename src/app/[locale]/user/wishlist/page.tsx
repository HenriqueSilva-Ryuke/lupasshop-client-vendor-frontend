'use client';

import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

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
 const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

 const handleRemove = async (productId: string) => {
 // Call GraphQL mutation to remove from wishlist
 setWishlist(wishlist.filter(item => item.product.id !== productId));
 };

 const handleAddToCart = async (productId: string) => {
 // Call GraphQL mutation to add to cart
 console.log('Adding to cart:', productId);
 };

 if (wishlist.length === 0) {
 return (
 <div className="container mx-auto px-4 py-12">
 <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
 <div className="flex flex-col items-center justify-center py-12 text-gray-500">
 <Heart className="w-16 h-16 mb-4" />
 <p className="text-lg">{t('empty')}</p>
 </div>
 </div>
 );
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
 <button
 onClick={() => handleAddToCart(item.product.id)}
 disabled={item.product.stockQuantity === 0}
 className="flex-1 bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
 >
 <ShoppingCart className="w-4 h-4" />
 {t('addToCart')}
 </button>
 <button
 onClick={() => handleRemove(item.product.id)}
 className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-destructive/10 flex items-center justify-center"
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
