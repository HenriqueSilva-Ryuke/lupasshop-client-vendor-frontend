'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { LIST_ORDERS } from '@/graphql/queries';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { Search, Mail, Phone, Calendar, ChevronRight, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function CustomersPage() {
  const locale = useLocale();
  const t = useTranslations('seller');
  const { user } = useAuth();
  const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['seller-orders-for-customers', store?.id],
    queryFn: async () => {
      if (!store?.id) return null;
      const { data } = await apolloClient.query<any>({
        query: LIST_ORDERS,
        variables: { storeId: store.id, limit: 100 },
        fetchPolicy: 'network-only',
      });
      return data.listOrders;
    },
    enabled: !!store?.id,
  });

  // Extract unique customers from orders
  const customers = (ordersData?.orders || []).reduce((acc: any[], order: any) => {
    if (!order.user) return acc;
    const existing = acc.find((c) => c.id === order.user.id);
    if (!existing) {
      acc.push({
        id: order.user.id,
        fullName: order.user.fullName || 'Cliente',
        email: order.user.email,
        phone: order.user.phone,
        avatar: order.user.avatarUrl,
        ordersCount: 1,
        totalSpent: order.totalAmount || 0,
        lastOrderDate: order.createdAt,
      });
    } else {
      existing.ordersCount += 1;
      existing.totalSpent += order.totalAmount || 0;
      if (existing.lastOrderDate < order.createdAt) {
        existing.lastOrderDate = order.createdAt;
      }
    }
    return acc;
  }, []) || [];

  const filteredCustomers = customers.filter((c: any) => 
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading = storeLoading || ordersLoading;

  return (
    <div className="w-full relative bg-background-light min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em]">
                Meus Clientes
              </h1>
              <p className="text-sm lg:text-base font-normal text-muted-foreground">
                Visualize e gerencie os clientes que compraram na sua loja
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1200px] mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredCustomers.length > 0 ? (
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4 font-semibold">Cliente</th>
                    <th className="px-6 py-4 font-semibold">Contato</th>
                    <th className="px-6 py-4 font-semibold">Pedidos</th>
                    <th className="px-6 py-4 font-semibold">Total Gasto</th>
                    <th className="px-6 py-4 font-semibold">Último Pedido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((customer: any) => (
                    <tr key={customer.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {customer.avatar ? (
                            <Image src={customer.avatar} alt={customer.fullName} width={40} height={40} className="rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <UserCircle className="w-6 h-6" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">{customer.fullName}</span>
                            <span className="text-xs text-muted-foreground">Cliente desde {new Date(parseInt(customer.lastOrderDate)).getFullYear() || ''}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            <Mail className="w-3.5 h-3.5" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                              <Phone className="w-3.5 h-3.5" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {customer.ordersCount} pedido{customer.ordersCount > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(customer.totalSpent)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(parseInt(customer.lastOrderDate)).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-card rounded-xl border border-border shadow-sm">
            <UserCircle className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm 
                ? "Nenhum cliente corresponde à sua busca. Tente buscar por outro nome ou e-mail." 
                : "Sua loja ainda não tem nenhum cliente. Os clientes aparecerão aqui assim que fizerem o primeiro pedido."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
