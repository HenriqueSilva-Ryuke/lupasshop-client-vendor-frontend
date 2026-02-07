'use client';

import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useLocale } from 'next-intl';

function CartItem({ item }: { item: any }) {
 const { updateQuantity, removeItem } = useCartStore();

 return (
 <div className="flex gap-4 py-4 border-b">
 <div className="relative w-20 h-20 flex-shrink-0">
 <Image
 src={item.image}
 alt={item.name}
 fill
 className="object-cover rounded"
 sizes="80px"
 />
 </div>
  <div className="flex-1 min-w-0">
 <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
 <p className="text-sm text-muted-foreground">{item.storeName}</p>
 <p className="text-lg font-bold text-foreground mt-1">
 {item.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
 </p>
 </div>
  <div className="flex flex-col items-end justify-between">
 <button
 onClick={() => removeItem(item.id)}
 className="text-muted-foreground hover:text-destructive transition-colors"
 >
 <X size={20} />
 </button>
  <div className="flex items-center gap-2 border rounded">
 <button
 onClick={() => updateQuantity(item.id, item.quantity - 1)}
 className="p-1 hover:bg-muted transition-colors"
 disabled={item.quantity <= 1}
 >
 <Minus size={16} />
 </button>
 <span className="w-8 text-center font-medium">{item.quantity}</span>
 <button
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 className="p-1 hover:bg-muted transition-colors"
 disabled={item.quantity >= item.stockQuantity}
 >
 <Plus size={16} />
 </button>
 </div>
 </div>
 </div>
 );
}

export function CartDrawer() {
 const locale = useLocale();
 const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
 const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();

 if (!isCartDrawerOpen) return null;

 return (
 <>
 {/* Backdrop */}
 <div  className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
 onClick={closeCartDrawer}
 />
  {/* Drawer */}
 <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl z-50 flex flex-col">
 {/* Header */}
 <div className="flex items-center justify-between p-4 border-b">
 <div className="flex items-center gap-2">
 <ShoppingBag size={24} />
 <h2 className="text-xl font-bold">Carrinho</h2>
 <span className="bg-primary600 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center">
 {getTotalItems()}
 </span>
 </div>
 <button
 onClick={closeCartDrawer}
 className="text-muted-foreground hover:text-muted-foreground transition-colors"
 >
 <X size={24} />
 </button>
 </div>
  {/* Items */}
 <div className="flex-1 overflow-y-auto p-4">
 {items.length === 0 ? (
 <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
 <ShoppingBag size={64} className="mb-4 opacity-20" />
 <p className="text-lg">Seu carrinho está vazio</p>
 </div>
 ) : (
 <div>
 {items.map((item) => (
 <CartItem key={item.id} item={item} />
 ))}
 </div>
 )}
 </div>
  {/* Footer */}
 {items.length > 0 && (
 <div className="border-t p-4 space-y-4">
 <div className="flex items-center justify-between text-lg font-bold">
 <span>Total</span>
 <span>
 {getTotalPrice().toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
 </span>
 </div>
  <Link
 href={`/${locale}/cart/checkout`}
 onClick={closeCartDrawer}
 className="block w-full py-3 bg-primary600 hover:bg-primary700 text-black text-center font-medium rounded-lg transition-colors"
 >
 Finalizar Compra
 </Link>
  <button
 onClick={clearCart}
 className="block w-full py-2 text-destructive hover:text-red-700 text-center font-medium transition-colors"
 >
 Limpar Carrinho
 </button>
 </div>
 )}
 </div>
 </>
 );
}
