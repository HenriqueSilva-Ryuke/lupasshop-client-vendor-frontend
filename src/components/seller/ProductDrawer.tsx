'use client';

import { useProductForm } from '@/hooks/forms/useProductForm';
import { useRef } from 'react';

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ProductDrawer({ isOpen, onClose, onSuccess }: ProductDrawerProps) {
  const {
    form,
    handleSubmit,
    handleImageUpload,
    removeImage,
    uploadedImages,
    isLoading,
    error,
  } = useProductForm(() => {
    onSuccess?.();
    onClose();
  });

  const {
    register,
    formState: { errors },
  } = form;

  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white dark:bg-card-dark z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                Adicionar Produto
              </h2>
              <p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-1">
                Preencha os dados do novo produto
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Product Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="name">
              Nome do Produto
            </label>
            <input
              {...register('name')}
              id="name"
              placeholder="Ex: Tênis Nike Air Max"
              type="text"
              className="w-full h-12 px-4 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.name && (
              <span className="text-xs text-red-600 dark:text-red-400">{errors.name.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="description">
              Descrição
            </label>
            <textarea
              {...register('description')}
              id="description"
              placeholder="Descreva as características e benefícios do produto"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
            {errors.description && (
              <span className="text-xs text-red-600 dark:text-red-400">{errors.description.message}</span>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="price">
                Preço (R$)
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                id="price"
                placeholder="0,00"
                type="number"
                step="0.01"
                min="0"
                className="w-full h-12 px-4 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.price && (
                <span className="text-xs text-red-600 dark:text-red-400">{errors.price.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="stock">
                Estoque
              </label>
              <input
                {...register('stock', { valueAsNumber: true })}
                id="stock"
                placeholder="0"
                type="number"
                min="0"
                className="w-full h-12 px-4 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.stock && (
                <span className="text-xs text-red-600 dark:text-red-400">{errors.stock.message}</span>
              )}
            </div>
          </div>

          {/* SKU and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="sku">
                SKU
              </label>
              <input
                {...register('sku')}
                id="sku"
                placeholder="SKU-1234"
                type="text"
                className="w-full h-12 px-4 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {errors.sku && (
                <span className="text-xs text-red-600 dark:text-red-400">{errors.sku.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground dark:text-gray-200" htmlFor="category">
                Categoria
              </label>
              <div className="relative">
                <select
                  {...register('category')}
                  id="category"
                  className="w-full h-12 px-4 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                >
                  <option value="">Selecione</option>
                  <option value="eletronicos">Eletrônicos</option>
                  <option value="calcados">Calçados</option>
                  <option value="acessorios">Acessórios</option>
                  <option value="vestuario">Vestuário</option>
                  <option value="casa">Casa</option>
                  <option value="esportes">Esportes</option>
                  <option value="beleza">Beleza</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-text">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              {errors.category && (
                <span className="text-xs text-red-600 dark:text-red-400">{errors.category.message}</span>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground dark:text-gray-200">
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
              className="h-32 rounded-lg border-2 border-dashed border-[#dbe1e6] dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-text-sub-light dark:text-text-sub-dark"
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
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <span className="text-xs text-red-600 dark:text-red-400">{errors.images.message}</span>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground dark:text-white">Produto Ativo</p>
              <p className="text-xs text-text-sub-light dark:text-text-sub-dark mt-0.5">
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-foreground dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
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
