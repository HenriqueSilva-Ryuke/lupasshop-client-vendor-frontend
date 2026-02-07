'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import {
 Trash2,
 Plus,
 Minus,
 ArrowLeft,
 Lock,
 Zap,
 ArrowRight,
 ShoppingBag,
 Search,
 LogIn,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/stores/cartStore';
import PageTransition from '@/components/PageTransition';
import { EmptyCart } from '@/components/ui/EmptyStates';
import { useToast } from '@/components/ui/Toast';

export default function CartPage() {
 const locale = useLocale();
 const t = useTranslations('cart');
 const router = useRouter();
 const { items, removeItem, updateQuantity } = useCartStore();
 const { undo } = useToast();
 const [couponCode, setCouponCode] = useState('');
 const [shippingCep, setShippingCep] = useState('');
 const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

 // Agrupar itens por loja
 const itemsByStore = useMemo(() => {
 const grouped = new Map<string, typeof items>();
 items.forEach((item) => {
 if (!grouped.has(item.storeId)) {
 grouped.set(item.storeId, []);
 }
 grouped.get(item.storeId)!.push(item);
 });
 return Array.from(grouped.entries());
 }, [items]);

 // Calcular totais
 const subtotal = useMemo(() => {
 return items.reduce((total, item) => total + item.price * item.quantity, 0);
 }, [items]);

 const shippingTotal = 25; // Simplificado - em produção viria da API
 const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
 const total = subtotal + shippingTotal - discountAmount;
 const installments = 12;
 const installmentValue = total / installments;

 const handleRemoveItem = (id: string, itemName: string) => {
 // Optimistic UI + Undo pattern
 const removedItem = items.find(item => item.id === id);
 removeItem(id);
 
 undo(
 `${itemName} removido do carrinho`,
 () => {
 // Undo: restore item
 if (removedItem) {
 updateQuantity(id, removedItem.quantity);
 }
 }
 );
 };

 const handleUpdateQuantity = (id: string, quantity: number) => {
 if (quantity > 0) {
 updateQuantity(id, quantity);
 }
 };

 const handleApplyCoupon = () => {
 // Simula aplicação de cupom
 if (couponCode.toUpperCase() === 'DESCONTO10') {
 setAppliedCoupon({ code: couponCode, discount: 10 });
 } else if (couponCode.toUpperCase() === 'DESCONTO20') {
 setAppliedCoupon({ code: couponCode, discount: 20 });
 } else {
 alert(t('invalidCoupon'));
 }
 };

 const handleCheckout = () => {
 if (items.length === 0) {
 alert(t('emptyCartWarning'));
 return;
 }
 router.push(`/${locale}/checkout`);
 };

 if (items.length === 0) {
 return (
 <PageTransition>
 <div className="min-h-screen text-black flex flex-col">
 <Navbar />
 <div className="flex-1 flex items-center justify-center px-4 py-16">
 <EmptyCart />
 </div>
 <Footer />
 </div>
 </PageTransition>
 );
 }

 return (
 <PageTransition>
 <div className="min-h-screen text-black flex flex-col">
 <Navbar />

 <div className="flex-1 px-4 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
 {/* Header */}
 <div className="flex flex-wrap justify-between items-end gap-3 pb-6 border-b mb-8">
 <div className="flex min-w-72 flex-col gap-2">
 <h1 className="text-3xl md:text-4xl font-black leading-tight">{t('title')}</h1>
 <p className="text-gray-500 text-base font-normal">
 {t('itemsFrom', { count: items.length, stores: itemsByStore.length, plural: itemsByStore.length > 1 ? 's' : '' })}
 </p>
 </div>
 <Button
 variant="default"
 onClick={() => router.push(`/${locale}/marketplace`)}
 className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
 >
 <ArrowLeft className="w-4 h-4" />
 {t('continueShopping')}
 </Button>
 </div>

 {/* Main Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 {/* Cart Items */}
 <div className="lg:col-span-8 flex flex-col gap-6">
 {itemsByStore.map(([storeId, storeItems]) => {
 const storeTotal = storeItems.reduce((total, item) => total + item.price * item.quantity, 0);
 const storeName = storeItems[0]?.storeName || 'Loja';

 return (
 <div key={storeId} className="flex flex-col gap-0 rounded-xl overflow-hidden shadow-sm border border-gray-200">
 {/* Store Header */}
 <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
 <div className="flex items-center gap-2">
 <Zap className="w-5 h-5 text-primary" />
 <h3 className="text-black text-sm font-bold leading-tight uppercase">{storeName}</h3>
 </div>
 <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
 {t('freeShipping')}
 </span>
 </div>

 {/* Store Items */}
 {storeItems.map((item) => (
 <motion.div
 key={item.id}
 initial={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="flex flex-col sm:flex-row gap-4 px-6 py-6 justify-between border-b hover:bg-accent50/50 transition-colors group"
 >
 {/* Product Info */}
 <div className="flex items-start gap-4 flex-1">
 <div
 className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-24 shrink-0 border border-gray-100"
 style={{ backgroundImage: `url(${item.image || 'https://via.placeholder.com/96'})` }}
 />
 <div className="flex flex-col justify-between h-full min-h-[96px]">
 <div>
 <p className="text-black text-base font-bold leading-snug mb-1">{item.name}</p>
 <p className="text-gray-500 text-sm font-normal leading-normal mb-2">
 {t('quantity')}: {item.quantity}
 </p>
 {item.stockQuantity > 0 ? (
 <p className="text-primary text-xs font-medium">{t('inStock')}</p>
 ) : (
 <p className="text-destructive text-xs font-medium">{t('outOfStock')}</p>
 )}
 </div>
 <Button
 variant="default"
 onClick={() => handleRemoveItem(item.id, item.name)}
 className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 mt-2 w-fit transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
 >
 <Trash2 className="w-4 h-4" />
 {t('remove')}
 </Button>
 </div>
 </div>

 {/* Price and Quantity */}
 <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-4 shrink-0">
 <p className="text-black text-lg font-bold leading-normal">
 R$ {(item.price * item.quantity).toFixed(2)}
 </p>
 <div className="flex items-center gap-1 text-black border rounded-lg p-1 bg-white">
 <Button
 variant="ghost"
 onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
 className="flex h-7 w-7 items-center justify-center rounded hover:bg-accent100 cursor-pointer transition-colors text-gray-500"
 >
 <Minus className="w-4 h-4" />
 </Button>
 <input
 type="number"
 value={item.quantity}
 onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
 className="text-sm font-semibold w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 border-none text-black"
 />
 <Button
 variant="ghost"
 onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
 disabled={item.quantity >= item.stockQuantity}
 className="flex h-7 w-7 items-center justify-center rounded hover:bg-accent100 cursor-pointer transition-colors text-primary disabled:opacity-50"
 >
 <Plus className="w-4 h-4" />
 </Button>
 </div>
 </div>
 </motion.div>
 ))}

 {/* Store Subtotal */}
 <div className="bg-gray-50 px-6 py-4 border-t flex justify-end items-center gap-3">
 <span className="text-sm text-gray-600">
 {t('storeSubtotal', { count: storeItems.length })}:
 </span>
 <span className="text-xl font-bold text-black">R$ {storeTotal.toFixed(2)}</span>
 </div>
 </div>
 );
 })}
 </div>

 {/* Summary Sidebar */}
 <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
 {/* Order Summary */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
 >
 <h3 className="text-black text-xl font-bold leading-tight mb-6">{t('orderSummary')}</h3>

 {/* Shipping CEP */}
 <div className="mb-6">
 <label className="block text-sm font-bold text-black mb-2">{t('calculateShipping')}</label>
 <div className="flex gap-2">
 <input
 type="text"
 value={shippingCep}
 onChange={(e) => setShippingCep(e.target.value)}
 placeholder={t('enterCep')}
 className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm transition-colors"
 >
 {t('calculate')}
 </motion.button>
 </div>
 <a
 href="https://buscacepinter.correios.com.br/app/endereco/index.php"
 target="_blank"
 rel="noopener noreferrer"
 className="text-xs underline mt-2 inline-block hover:text-primary"
 >
 Não sei meu CEP
 </a>
 </div>

 {/* Coupon */}
 <div className="mb-6 border-b pb-6">
 <label className="block text-sm font-bold text-black mb-2">{t('couponCode')}</label>
 <div className="flex gap-2">
 <div className="relative flex-1">
 <input
 type="text"
 value={couponCode}
 onChange={(e) => setCouponCode(e.target.value)}
 placeholder={t('enterCoupon')}
 className="w-full rounded-lg border bg-white pl-9 pr-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 </div>
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={handleApplyCoupon}
 className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm transition-colors"
 >
 {t('apply')}
 </motion.button>
 </div>
 {appliedCoupon && (
 <p className="text-xs text-primary mt-2">✓ Cupom {appliedCoupon.code} aplicado!</p>
 )}
 </div>

 {/* Price Breakdown */}
 <div className="space-y-3 mb-6">
 <div className="flex justify-between text-sm">
 <span className="text-gray-500">{t('subtotal')} ({items.length} itens)</span>
 <span className="text-black font-medium">R$ {subtotal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-gray-500">{t('shipping')}</span>
 <span className="text-black font-medium">R$ {shippingTotal.toFixed(2)}</span>
 </div>
 {appliedCoupon && (
 <div className="flex justify-between text-sm text-primary">
 <span>{t('discount')} ({appliedCoupon.discount}%)</span>
 <span className="font-medium">- R$ {discountAmount.toFixed(2)}</span>
 </div>
 )}
 </div>

 {/* Total */}
 <div className="border-t pt-4 mb-6">
 <div className="flex justify-between items-center mb-1">
 <span className="text-lg font-bold text-black">{t('total')}</span>
 <span className="text-2xl font-black text-black">R$ {total.toFixed(2)}</span>
 </div>
 <p className="text-xs text-right">
 {t('installments', { count: installments, value: installmentValue.toFixed(2) })}
 </p>
 </div>

 {/* Checkout Button */}
 <motion.button
 whileHover={{ scale: 1.02, translateY: -2 }}
 whileTap={{ scale: 0.98, translateY: 0 }}
 onClick={handleCheckout}
 className="w-full bg-primary hover:bg-primary-dark font-bold text-lg py-4 rounded-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 mb-3"
 >
 {t('proceedToCheckout')}
 <ArrowRight className="w-5 h-5" />
 </motion.button>

 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => router.push(`/${locale}/marketplace`)}
 className="w-full border hover:bg-accent50 text-black font-bold py-3 rounded-lg transition-colors text-sm"
 >
 Escolher mais produtos
 </motion.button>
 </motion.div>

 {/* Security Badge */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-3 text-center border border-gray-200"
 >
 <div className="flex gap-2 items-center text-primary">
 <Lock className="w-4 h-4" />
 <span className="text-sm font-bold">Compra 100% Segura</span>
 </div>
 <p className="text-xs text-gray-500">
 Seus dados estão protegidos. LupaShop garante a entrega ou seu dinheiro de volta.
 </p>
 </motion.div>
 </div>
 </div>
 </div>

 <Footer />
 </div>
 </PageTransition>
 );
}
