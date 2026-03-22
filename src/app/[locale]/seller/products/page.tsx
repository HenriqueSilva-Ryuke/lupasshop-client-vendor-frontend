'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthProtection } from '@/hooks/useAuthProtection';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Upload, Download, FileDown, Loader2, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { SkeletonProductCard } from '@/components/ui/SkeletonLoaders';
import { EmptyProducts } from '@/components/ui/EmptyStates';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useAuth } from '@/hooks/useAuth';

const SELLER_PRODUCTS_QUERY = gql`
  query SellerProducts($search: String, $limit: Int, $offset: Int) {
    sellerProducts(search: $search, limit: $limit, offset: $offset) {
      products {
        id
        name
        price
        stockQuantity
        isNew
        isTrending
        isActive
        sku
        createdAt
        rating
        images
      }
      total
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const BULK_IMPORT_MUTATION = gql`
  mutation BulkImportProducts($storeId: ID!, $products: [CreateProductInput!]!) {
    bulkImportProducts(storeId: $storeId, products: $products) {
      id
      name
    }
  }
`;

const BULK_EXPORT_QUERY = gql`
  query BulkExportProducts($storeId: ID!) {
    bulkExportProducts: bulkExportProducts(storeId: $storeId)
  }
`;

const BULK_EXPORT_MUTATION = gql`
  mutation BulkExportProducts($storeId: ID!) {
    bulkExportProducts(storeId: $storeId)
  }
`;

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n').filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
  });
}

function toCSV(rows: Record<string, any>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
  ].join('\n');
}

export default function SellerProductsPage() {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const { data: store } = useSellerStore(user?.id);
  const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection(['SELLER', 'ADMIN']);
  const [search, setSearch] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data, loading, error, refetch } = useQuery<any>(SELLER_PRODUCTS_QUERY, {
    variables: { search: search || undefined, limit: 100 },
    skip: !isAuthorized,
  });

  const [deleteProduct] = useMutation<any>(DELETE_PRODUCT_MUTATION);
  const [bulkImport] = useMutation<any>(BULK_IMPORT_MUTATION);
  const [bulkExport] = useMutation<any>(BULK_EXPORT_MUTATION);

  useEffect(() => {
    if (!isAuthLoading && !isAuthorized) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [isAuthLoading, isAuthorized, router, locale]);

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteProduct({ variables: { id } });
      toast.success(`"${name}" eliminado`);
      refetch();
    } catch {
      toast.error('Erro ao eliminar produto');
    }
  };

  const handleExport = async () => {
    if (!store?.id) return;
    setExporting(true);
    try {
      const { data: exportData } = await bulkExport({ variables: { storeId: store.id } });
      const rows = exportData?.bulkExportProducts ?? [];
      const csv = toCSV(
        rows.map((p: any) => ({
          name: p.name,
          sku: p.sku ?? '',
          price: p.price,
          originalPrice: p.originalPrice ?? '',
          currency: p.currency,
          description: p.description,
          stockQuantity: p.stockQuantity,
          isActive: p.isActive,
          isNew: p.isNew,
          isTrending: p.isTrending,
          categoryId: p.categoryId ?? '',
          images: (p.images ?? []).join('|'),
        })),
      );
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `produtos_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${rows.length} produtos exportados`);
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao exportar');
    } finally {
      setExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !store?.id) return;
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (rows.length === 0) { toast.error('CSV vazio ou inválido'); return; }

      const products = rows.map(r => ({
        storeId: store.id,
        name: r.name || r.Nome || '',
        sku: r.sku || r.SKU || undefined,
        price: parseFloat(r.price || r.Preço || '0'),
        originalPrice: r.originalPrice ? parseFloat(r.originalPrice) : undefined,
        currency: r.currency || 'AOA',
        description: r.description || r.Descrição || '',
        stockQuantity: parseInt(r.stockQuantity || r.Stock || '0', 10),
        isActive: r.isActive !== 'false',
        isNew: r.isNew === 'true',
        isTrending: r.isTrending === 'true',
        images: r.images ? r.images.split('|').filter(Boolean) : [],
        categoryId: r.categoryId || undefined,
      })).filter(p => p.name);

      if (products.length === 0) { toast.error('Nenhum produto válido no ficheiro'); return; }

      const { data: importData } = await bulkImport({ variables: { storeId: store.id, products } });
      const count = importData?.bulkImportProducts?.length ?? 0;
      toast.success(`${count} produto${count !== 1 ? 's' : ''} importado${count !== 1 ? 's' : ''}`);
      setShowImport(false);
      refetch();
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao importar CSV');
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const template = toCSV([{
      name: 'Exemplo de Produto',
      sku: 'SKU-001',
      price: '1500',
      originalPrice: '2000',
      currency: 'AOA',
      description: 'Descrição do produto',
      stockQuantity: '10',
      isActive: 'true',
      isNew: 'false',
      isTrending: 'false',
      categoryId: '',
      images: 'https://exemplo.com/imagem.jpg',
    }]);
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modelo_importacao.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Meus Produtos</h1>
            <p className="text-muted-foreground">Gerencie o seu catálogo de produtos</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonProductCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-destructive p-6">Erro ao carregar produtos: {error.message}</div>;

  const products = data?.sellerProducts?.products || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Produtos</h1>
          <p className="text-muted-foreground">Gerencie o seu catálogo de produtos</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowImport(v => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:border-primary/40 transition-colors"
          >
            <Upload className="w-4 h-4" /> Importar CSV
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || !store?.id}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:border-primary/40 transition-colors disabled:opacity-50"
          >
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Exportar CSV
          </button>
          <Link href={`/${locale}/seller/products/new`}>
            <Button className="bg-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar Produto
            </Button>
          </Link>
        </div>
      </div>

      {/* Import panel */}
      {showImport && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Importar Produtos via CSV</h2>
            <button onClick={() => setShowImport(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            O ficheiro CSV deve ter as colunas: <code className="bg-muted px-1 rounded text-xs">name, sku, price, originalPrice, currency, description, stockQuantity, isActive, isNew, isTrending, categoryId, images</code>.
            As imagens devem ser separadas por <code className="bg-muted px-1 rounded text-xs">|</code>.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-muted hover:bg-muted/70 transition-colors"
            >
              <FileDown className="w-4 h-4" /> Baixar Modelo CSV
            </button>
            <label className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer ${importing ? 'opacity-50 pointer-events-none' : ''}`}>
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {importing ? 'A importar...' : 'Seleccionar ficheiro CSV'}
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileChange}
                disabled={importing}
              />
            </label>
          </div>
        </div>
      )}

      {products.length === 0 && !loading ? (
        <EmptyProducts />
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-4 border-b flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border outline-none focus:border-primary bg-background text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b text-xs uppercase">
                  <th className="px-6 py-4 font-semibold">Produto</th>
                  <th className="px-6 py-4 font-semibold">Preço</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold text-right">Acções</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                          {product.images?.[0] && (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium max-w-xs truncate block">{product.name}</span>
                          {product.sku && <span className="text-xs text-muted-foreground">{product.sku}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">
                      AOA {Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.stockQuantity === 0 ? 'bg-red-100 text-red-700' :
                        product.stockQuantity <= 5 ? 'bg-orange-100 text-orange-700' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {product.stockQuantity} un
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {!product.isActive && (
                          <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded w-fit">Inactivo</span>
                        )}
                        {product.isNew && (
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded w-fit">Novo</span>
                        )}
                        {product.isTrending && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded w-fit">Destaque</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/${locale}/seller/products/${product.id}/edit`}>
                          <Button variant="outline" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:border-destructive"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
