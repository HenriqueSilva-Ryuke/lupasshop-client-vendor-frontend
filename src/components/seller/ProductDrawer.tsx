'use client';

import { useProductForm } from '@/hooks/forms/useProductForm';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useRef } from 'react';

interface ProductDrawerProps {
 isOpen: boolean;
 onClose: () => void;
 onSuccess?: () => void;
}

export function ProductDrawer({ isOpen, onClose, onSuccess }: ProductDrawerProps) {
 const { user } = useClientAuth();
 const { data: store, isLoading: isLoadingStore } = useSellerStore(user?.id || null);
  const {
 form,
 handleSubmit,
 handleImageUpload,
 removeImage,
 uploadedImages,
 isLoading,
 error,
 } = useProductForm(store?.id || '', () => {
 onSuccess?.();
 onClose();
 });

 const {
 register,
 formState: { errors },
 } = form;

 const imageInputRef = useRef<HTMLInputElement>(null);

 if (!isOpen) return null;

 // Show loading if store is still being fetched
 if (isLoadingStore) {
 return (
 <>
 <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
 <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card z-50 shadow-2xl flex items-center justify-center">
 <div className="text-center">
 <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
 <p className="mt-2 text-sm ">Carregando...</p>
 </div>
 </div>
 </>
 );
 }

 // Show error if no store found
 if (!store) {
 return (
 <>
 <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
 <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card z-50 shadow-2xl flex items-center justify-center">
 <div className="text-center p-6">
 <span className="material-symbols-outlined text-6xl text-red-500">error</span>
 <h3 className="mt-4 text-lg font-bold text-foreground text-card-foreground">Loja não encontrada</h3>
 <p className="mt-2 text-sm ">
 Você precisa ter uma loja cadastrada para adicionar produtos.
 </p>
 <button
 onClick={onClose}
 className="mt-6 h-12 px-6 rounded-lg bg-primary text-card-foreground font-bold"
 >
 Fechar
 </button>
 </div>
 </div>
 </>
 );
 }

 return (
 <>
 {/* Backdrop */}
 <div
 className="fixed inset-0 bg-black/50 z-40 transition-opacity"
 onClick={onClose}
 />

 {/* Drawer */}
 <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card z-50 shadow-2xl overflow-y-auto">
 {/* Header */}
 <div className="sticky top-0 bg-card border-b border-border border-border px-6 py-4 z-10">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold ">
 Adicionar Produto
 </h2>
 <p className="text-sm mt-1">
 Preencha os dados do novo produto
 </p>
 </div>
 <button
 onClick={onClose}
 className="p-2 hover:bg-muted rounded-lg transition-colors"
 >
 <span className="material-symbols-outlined">close</span>
 </button>
 </div>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
 {/* Error Message */}
 {error && (
 <div className="p-4 bg-destructive/10 bg-red-900/20 border border-destructive border-red-800 rounded-lg">
 <p className="text-sm text-red-700 text-red-400">{error}</p>
 </div>
 )}

 {/* Product Name */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="name">
 Nome do Produto
 </label>
 <input
 {...register('name')}
 id="name"
 placeholder="Ex: Tênis Nike Air Max"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.name && (
 <span className="text-xs text-destructive text-red-400">{errors.name.message}</span>
 )}
 </div>

 {/* Description */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="description">
 Descrição
 </label>
 <textarea
 {...register('description')}
 id="description"
 placeholder="Descreva as características e benefícios do produto"
 rows={4}
 className="w-full px-4 py-3 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
 />
 {errors.description && (
 <span className="text-xs text-destructive text-red-400">{errors.description.message}</span>
 )}
 </div>

 {/* Price and Stock */}
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="price">
 Preço (R$)
 </label>
 <input
 {...register('price', { valueAsNumber: true })}
 id="price"
 placeholder="0,00"
 type="number"
 step="0.01"
 min="0"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.price && (
 <span className="text-xs text-destructive text-red-400">{errors.price.message}</span>
 )}
 </div>

 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="stockQuantity">
 Estoque
 </label>
 <input
 {...register('stockQuantity', { valueAsNumber: true })}
 id="stockQuantity"
 placeholder="0"
 type="number"
 min="0"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.stockQuantity && (
 <span className="text-xs text-destructive text-red-400">{errors.stockQuantity.message}</span>
 )}
 </div>
 </div>

 {/* SKU and Category */}
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="sku">
 SKU (Opcional)
 </label>
 <input
 {...register('sku')}
 id="sku"
 placeholder="SKU-1234"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.sku && (
 <span className="text-xs text-destructive text-red-400">{errors.sku.message}</span>
 )}
 </div>

 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="categoryId">
 Categoria (Opcional)
 </label>
 <div className="relative">
 <select
 {...register('categoryId')}
 id="categoryId"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
 >
 <option value="">Selecione</option>
 {/* These should be fetched from the backend, but for now using placeholder values */}
 <option value="1">Eletrônicos</option>
 <option value="2">Calçados</option>
 <option value="3">Acessórios</option>
 <option value="4">Vestuário</option>
 <option value="5">Casa</option>
 <option value="6">Esportes</option>
 <option value="7">Beleza</option>
 </select>
 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-text">
 <span className="material-symbols-outlined">expand_more</span>
 </div>
 </div>
 {errors.categoryId && (
 <span className="text-xs text-destructive text-red-400">{errors.categoryId.message}</span>
 )}
 </div>
 </div>

 {/* Images */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground">
 Imagens do Produto
 </label>
 <input
 ref={imageInputRef}
 type="file"
 accept="image/*"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 // Simulate upload - in production, upload to cloud storage
 const url = URL.createObjectURL(e.target.files[0]);
 handleImageUpload(url);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => imageInputRef.current?.click()}
 className="h-32 rounded-lg border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 "
 >
 <span className="material-symbols-outlined text-3xl">cloud_upload</span>
 <span className="text-sm font-medium">Clique para adicionar imagens</span>
 </button>
  {/* Image Preview */}
 {uploadedImages.length > 0 && (
 <div className="grid grid-cols-3 gap-2 mt-2">
 {uploadedImages.map((url, index) => (
 <div key={index} className="relative group">
 <img
 src={url}
 alt={`Preview ${index + 1}`}
 className="w-full h-24 object-cover rounded-lg border border-border border-border"
 />
 <button
 type="button"
 onClick={() => removeImage(index)}
 className="absolute top-1 right-1 p-1 bg-destructive/100 text-card-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
 >
 <span className="material-symbols-outlined text-[16px]">close</span>
 </button>
 </div>
 ))}
 </div>
 )}
 {errors.images && (
 <span className="text-xs text-destructive text-red-400">{errors.images.message}</span>
 )}
 </div>

 {/* Active Toggle */}
 <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
 <div>
 <p className="text-sm font-medium text-foreground text-card-foreground">Produto Ativo</p>
 <p className="text-xs mt-0.5">
 O produto ficará visível na loja
 </p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input
 {...register('isActive')}
 type="checkbox"
 className="sr-only peer"
 defaultChecked
 />
 <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-border after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
 </label>
 </div>

 {/* Actions */}
 <div className="flex gap-3 pt-4 border-t border-border border-border">
 <button
 type="button"
 onClick={onClose}
 className="flex-1 h-12 rounded-lg border-2 border-border text-foreground text-card-foreground font-medium hover:bg-muted transition-all"
 disabled={isLoading}
 >
 Cancelar
 </button>
 <button
 type="submit"
 className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary-dark text-card-foreground font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
 disabled={isLoading}
 >
 {isLoading ? 'Criando...' : 'Criar Produto'}
 </button>
 </div>
 </form>
 </div>
 </>
 );
}

