'use client';

import React from 'react';
import { ShoppingCart, Package, Heart, Store, Search, FileText, CreditCard, MapPin } from 'lucide-react';
import { EmptyState } from './ErrorIllustration';
import { Button } from '@lupa/design-system';
import Link from 'next/link';
import { useLocale } from 'next-intl';

/**
 * Empty state illustrations for different contexts
 * (UX pattern: Empty States Are Opportunities, Not Gaps)
 */

interface EmptyStateWrapperProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

function EmptyStateWrapper({ icon, title, description, action, secondaryAction }: EmptyStateWrapperProps) {
  return (
    <EmptyState
      illustration={
        <div className="w-24 h-24 rounded-full bg-muted/60 flex items-center justify-center mb-4">
          <div className="text-muted-foreground">{icon}</div>
        </div>
      }
      title={title}
      description={description}
    >
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {action && (
            action.href ? (
              <Button asChild variant="default" size="lg">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button onClick={action.onClick} variant="default" size="lg">
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button onClick={secondaryAction.onClick} variant="outline" size="lg">
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </EmptyState>
  );
}

export function EmptyCart() {
  const locale = useLocale();
  return (
    <EmptyStateWrapper
      icon={<ShoppingCart className="h-12 w-12" />}
      title="Seu carrinho está vazio"
      description="Adicione produtos ao carrinho para continuar comprando e finalizar seu pedido."
      action={{
        label: 'Explorar Marketplace',
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyOrders() {
  const locale = useLocale();
  return (
    <EmptyStateWrapper
      icon={<Package className="h-12 w-12" />}
      title="Nenhum pedido ainda"
      description="Você ainda não fez nenhum pedido. Explore o marketplace e encontre produtos incríveis!"
      action={{
        label: 'Começar a comprar',
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyWishlist() {
  const locale = useLocale();
  return (
    <EmptyStateWrapper
      icon={<Heart className="h-12 w-12" />}
      title="Lista de desejos vazia"
      description="Adicione produtos à sua lista de desejos para salvá-los e comprá-los depois."
      action={{
        label: 'Explorar produtos',
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyProducts() {
  const locale = useLocale();
  return (
    <EmptyStateWrapper
      icon={<Package className="h-12 w-12" />}
      title="Nenhum produto cadastrado"
      description="Comece adicionando seu primeiro produto para começar a vender no marketplace."
      action={{
        label: 'Adicionar produto',
        href: `/${locale}/seller/products/new`,
      }}
    />
  );
}

export function EmptyStores() {
  const locale = useLocale();
  return (
    <EmptyStateWrapper
      icon={<Store className="h-12 w-12" />}
      title="Nenhuma loja encontrada"
      description="Não encontramos lojas correspondentes à sua busca. Tente ajustar os filtros."
      action={{
        label: 'Limpar filtros',
        onClick: () => window.location.reload(),
      }}
    />
  );
}

export function EmptySearchResults({ query }: { query: string }) {
  return (
    <EmptyStateWrapper
      icon={<Search className="h-12 w-12" />}
      title="Nenhum resultado encontrado"
      description={`Não encontramos resultados para "${query}". Tente usar termos diferentes ou mais genéricos.`}
    />
  );
}

export function EmptyAddresses() {
  return (
    <EmptyStateWrapper
      icon={<MapPin className="h-12 w-12" />}
      title="Nenhum endereço cadastrado"
      description="Adicione um endereço de entrega para facilitar suas compras futuras."
      action={{
        label: 'Adicionar endereço',
        onClick: () => {}, // Will be handled by parent component
      }}
    />
  );
}

export function EmptyPaymentMethods() {
  return (
    <EmptyStateWrapper
      icon={<CreditCard className="h-12 w-12" />}
      title="Nenhum método de pagamento"
      description="Adicione um cartão de crédito ou débito para facilitar seus pagamentos."
      action={{
        label: 'Adicionar cartão',
        onClick: () => {}, // Will be handled by parent component
      }}
    />
  );
}

export function EmptyInvoices() {
  return (
    <EmptyStateWrapper
      icon={<FileText className="h-12 w-12" />}
      title="Nenhuma nota fiscal"
      description="Suas notas fiscais aparecerão aqui após realizar compras."
    />
  );
}
