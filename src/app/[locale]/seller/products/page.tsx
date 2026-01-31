import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, MoreVertical } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

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

import { use } from 'react';

export default function SellerProductsPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = use(params);
 const { data, loading, error, refetch } = useQuery(SELLER_PRODUCTS_QUERY) as any;
 const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

 const handleDelete = async (id: string) => {
 if (!confirm('Tem certeza que deseja excluir este produto?')) return;
 try {
 await deleteProduct({ variables: { id } });
 toast.success('Produto excluído com sucesso');
 refetch();
 } catch (err) {
 toast.error('Erro ao excluir produto');
 }
 };

 if (loading) return <div>Carregando produtos...</div>;
 if (error) return <div className="text-red-500">Erro ao carregar produtos: {error.message}</div>;

 const products = data?.sellerProducts?.products || [];

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-900">Meus Produtos</h1>
 <p className="text-gray-500">Gerencie seu catálogo de produtos</p>
 </div>
 <Link href={`/${locale}/seller/products/new`}>
 <Button className="bg-primary flex items-center gap-2">
 <Plus className="w-4 h-4" />
 Adicionar Produto
 </Button>
 </Link>
 </div>

 <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
 <div className="p-4 border-b flex gap-4">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 placeholder="Buscar produtos..."
 className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:border-primary"
 />
 </div>
 {/* Filters could go here */}
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-gray-50 border-b text-xs uppercase">
 <th className="px-6 py-4 font-semibold">Produto</th>
 <th className="px-6 py-4 font-semibold">Preço</th>
 <th className="px-6 py-4 font-semibold">Estoque</th>
 <th className="px-6 py-4 font-semibold">Status</th>
 <th className="px-6 py-4 font-semibold text-right">Ações</th>
 </tr>
 </thead>
 <tbody>
 {products.length === 0 ? (
 <tr>
 <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
 Nenhum produto encontrado. Adicione seu primeiro produto!
 </td>
 </tr>
 ) : (
 products.map((product: any) => (
 <tr key={product.id} className="border-b hover:bg-accent50/50 transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
 {product.images?.[0] && <img src={product.images[0]} className="w-full h-full object-cover" />}
 </div>
 <span className="font-medium max-w-xs truncate">{product.name}</span>
 </div>
 </td>
 <td className="px-6 py-4 text-gray-600">R$ {product.price.toFixed(2)}</td>
 <td className="px-6 py-4">
 <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
 {product.stockQuantity} un
 </span>
 </td>
 <td className="px-6 py-4">
 <div className="flex flex-col gap-1">
 {product.isNew && <span className="text-[10px] leading-tight bg-primary50 text-primary px-1.5 py-0.5 rounded w-fit">Novo</span>}
 {product.isTrending && <span className="text-[10px] leading-tight bg-primary50 text-primary600 px-1.5 py-0.5 rounded w-fit">Destaque</span>}
 </div>
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <Link href={`/${locale}/seller/products/${product.id}/edit`}>
 <Button variant="outline" className="h-8 w-8 p-0">
 <Edit className="w-4 h-4 text-gray-600" />
 </Button>
 </Link>
 <Button
 variant="outline"
 className="h-8 w-8 p-0 hover:bg-destructive/10 hover:border-destructive"
 onClick={() => handleDelete(product.id)}
 >
 <Trash2 className="w-4 h-4 text-red-500" />
 </Button>
 </div>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
