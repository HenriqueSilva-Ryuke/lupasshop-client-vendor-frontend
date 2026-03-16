'use client';

import React from 'react';
import { ShoppingCart, Package, Heart, Store, Search, FileText, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@lupa/design-system';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { EmptyState } from '../ErrorIllustration';

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
              <Link href={action.href}>
                <Button variant="default" size="lg">
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button onClick={action.onClick} variant="default" size="lg">
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              </Link>
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
  const t = useTranslations('error.emptyStates.cart');
  return (
    <EmptyStateWrapper
      icon={<ShoppingCart className="h-12 w-12" />}
      title={t('title')}
      description={t('description')}
      action={{
        label: t('action'),
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyOrders() {
  const locale = useLocale();
  const t = useTranslations('error.emptyStates.orders');
  return (
    <EmptyStateWrapper
      icon={<Package className="h-12 w-12" />}
      title={t('title')}
      description={t('description')}
      action={{
        label: t('action'),
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyWishlist() {
  const locale = useLocale();
  const t = useTranslations('error.emptyStates.wishlist');
  return (
    <EmptyStateWrapper
      icon={<Heart className="h-12 w-12" />}
      title={t('title')}
      description={t('description')}
      action={{
        label: t('action'),
        href: `/${locale}/marketplace`,
      }}
    />
  );
}

export function EmptyProducts() {
  const locale = useLocale();
  const t = useTranslations('error.emptyStates.products');
  return (
    <EmptyStateWrapper
      icon={<Package className="h-12 w-12" />}
      title={t('title')}
      description={t('description')}
      action={{
        label: t('action'),
        href: `/${locale}/seller/products/new`,
      }}
    />
  );
}

export function EmptyStores() {
  const locale = useLocale();
  const t = useTranslations('error.emptyStates.stores');
  return (
    <EmptyStateWrapper
      icon={<Store className="h-12 w-12" />}
      title={t('title')}
      description={t('description')}
      action={{
        label: t('action'),
        onClick: () => window.location.reload(),
      }}
    />
  );
}

export function EmptySearchResults({ query }: { query: string }) {
  const t = useTranslations('error.emptyStates.searchResults');
  return (
    <EmptyStateWrapper
      icon={<Search className="h-12 w-12" />}
      title={t('title')}
      description={t('description', { query })}
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
