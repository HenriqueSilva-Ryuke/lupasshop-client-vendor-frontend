'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { PackageX, AlertTriangle, PackageSearch, Search, ChevronUp, ChevronDown, Edit2, Save, X } from 'lucide-react';
import { SELLER_PRODUCTS } from '@/graphql/queries';
import { UPDATE_PRODUCT } from '@/graphql/mutations';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  images: string[];
};

export default function StockPage() {
  const { user } = useAuth();
  const { data: store } = useSellerStore(user?.id);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQty, setEditingQty] = useState<number>(0);
  const [lowStockThreshold] = useState(5);

  const { data, loading, refetch } = useQuery<any>(SELLER_PRODUCTS, {
    variables: {
      limit: 100,
      offset: 0,
      search: debouncedSearch || undefined,
    },
    skip: !store?.id,
    fetchPolicy: 'cache-and-network',
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast.success('Estoque actualizado');
      setEditingId(null);
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const products: Product[] = data?.sellerProducts?.products ?? [];

  const totalStock = products.reduce((s, p) => s + p.stockQuantity, 0);
  const lowStock = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= lowStockThreshold);
  const outOfStock = products.filter(p => p.stockQuantity === 0);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditingQty(product.stockQuantity);
  };

  const handleSave = useCallback(
    (productId: string) => {
      updateProduct({
        variables: { id: productId, input: { stockQuantity: editingQty } },
      });
    },
    [updateProduct, editingQty]
  );

  const handleCancel = () => setEditingId(null);

  const stockStatus = (qty: number) => {
    if (qty === 0) return { label: 'Esgotado', color: 'text-red-600 bg-red-50 border-red-200' };
    if (qty <= lowStockThreshold) return { label: 'Baixo', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { label: 'OK', color: 'text-green-700 bg-green-50 border-green-200' };
  };

  return (
    <div className="w-full bg-background-light min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Gestão de Stock</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Monitorize e actualize as quantidades dos seus produtos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1100px] mx-auto space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <PackageSearch className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total em Stock</p>
              <p className="text-2xl font-bold">{loading ? '—' : totalStock.toLocaleString('pt-AO')}</p>
              <p className="text-xs text-muted-foreground">unidades • {products.length} produtos</p>
            </div>
          </div>

          <div className={`bg-card border rounded-xl p-5 flex items-center gap-4 ${lowStock.length > 0 ? 'border-orange-200' : 'border-border'}`}>
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-orange-700 uppercase tracking-wide">Stock Baixo</p>
              <p className="text-2xl font-bold text-orange-600">{loading ? '—' : lowStock.length}</p>
              <p className="text-xs text-orange-600/80">≤ {lowStockThreshold} unidades</p>
            </div>
          </div>

          <div className={`bg-card border rounded-xl p-5 flex items-center gap-4 ${outOfStock.length > 0 ? 'border-red-200' : 'border-border'}`}>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <PackageX className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-700 uppercase tracking-wide">Esgotados</p>
              <p className="text-2xl font-bold text-red-600">{loading ? '—' : outOfStock.length}</p>
              <p className="text-xs text-red-600/80">sem stock</p>
            </div>
          </div>
        </div>

        {/* Alerts strip */}
        {(lowStock.length > 0 || outOfStock.length > 0) && (
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2">
            <p className="text-sm font-semibold text-orange-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Alertas de Stock
            </p>
            {outOfStock.slice(0, 3).map(p => (
              <div key={p.id} className="flex justify-between items-center bg-white/70 rounded-lg px-3 py-2 border border-red-100 text-sm">
                <span className="text-red-800">🔴 <strong>Esgotado:</strong> {p.name}{p.sku ? ` (${p.sku})` : ''}</span>
                <button
                  onClick={() => handleEdit(p)}
                  className="text-xs px-3 py-1.5 bg-white border border-border rounded-md hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  Repor
                </button>
              </div>
            ))}
            {lowStock.slice(0, 3).map(p => (
              <div key={p.id} className="flex justify-between items-center bg-white/70 rounded-lg px-3 py-2 border border-orange-100 text-sm">
                <span className="text-orange-800">🟠 <strong>Baixo:</strong> {p.name}{p.sku ? ` (${p.sku})` : ''} — {p.stockQuantity} un.</span>
                <button
                  onClick={() => handleEdit(p)}
                  className="text-xs px-3 py-1.5 bg-white border border-border rounded-md hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  Actualizar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Products table */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar produto..."
                className="w-full pl-9 pr-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{products.length} produtos</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">A carregar...</div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
              <PackageSearch className="w-10 h-10 opacity-30" />
              <p className="text-sm">{search ? 'Nenhum produto encontrado' : 'Ainda não tem produtos'}</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {/* Table header */}
              <div className="px-4 py-2 grid grid-cols-[1fr_auto_auto_auto] gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                <span>Produto</span>
                <span className="text-right hidden sm:block">Preço (AOA)</span>
                <span className="text-right">Stock</span>
                <span className="text-right">Estado</span>
              </div>

              {products.map(product => {
                const { label, color } = stockStatus(product.stockQuantity);
                const isEditing = editingId === product.id;

                return (
                  <div key={product.id} className="px-4 py-3 grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center hover:bg-muted/20 transition-colors">
                    {/* Product info */}
                    <div className="flex items-center gap-3 min-w-0">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-9 h-9 rounded-lg object-cover border border-border shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <PackageSearch className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        {product.sku && <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>}
                      </div>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-semibold text-right hidden sm:block">
                      {product.price.toLocaleString('pt-AO')}
                    </span>

                    {/* Stock edit */}
                    <div className="flex items-center justify-end gap-1">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingQty(q => Math.max(0, q - 1))} className="p-0.5 rounded hover:bg-muted"><ChevronDown className="w-4 h-4" /></button>
                          <input
                            type="number"
                            value={editingQty}
                            onChange={e => setEditingQty(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-14 text-center border border-primary rounded-md py-0.5 text-sm font-bold focus:outline-none"
                            min={0}
                          />
                          <button onClick={() => setEditingQty(q => q + 1)} className="p-0.5 rounded hover:bg-muted"><ChevronUp className="w-4 h-4" /></button>
                          <button
                            onClick={() => handleSave(product.id)}
                            disabled={updating}
                            className="p-1 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors ml-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={handleCancel} className="p-1 rounded-md hover:bg-muted transition-colors">
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold w-10 text-right">{product.stockQuantity}</span>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${color}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
