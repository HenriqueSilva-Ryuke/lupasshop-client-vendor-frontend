'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery, useMutation } from '@apollo/client/react';
import { LIST_STORES } from '@/graphql/queries';
import { CREATE_STORE } from '@/graphql/mutations';
import { useClientAuth } from '@/hooks/useClientAuth';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'active' | 'locked';
  action: string;
  actionLabel: string;
}

export function useOnboardingTour() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('seller');
  const { user } = useClientAuth();

  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Check if the seller already has a store
  const { data: storesData, loading: storesLoading } = useQuery<any>(LIST_STORES, {
    variables: { ownerId: user?.id },
    skip: !user?.id,
    fetchPolicy: 'network-only',
  });

  const hasStore = !storesLoading && (storesData?.listStores?.length ?? 0) > 0;

  // Create store mutation (used when seller has no store yet)
  const [storeName, setStoreName] = useState('');
  const [createStoreError, setCreateStoreError] = useState<string | null>(null);
  const [createStoreMutation, { loading: creatingStore }] = useMutation(CREATE_STORE, {
    onCompleted: () => {
      completeStep('store');
      setCreateStoreError(null);
    },
    onError: (err) => {
      setCreateStoreError(err.message);
    },
  });

  const handleCreateStore = () => {
    if (!storeName.trim() || !user?.id) return;
    
    // Generate slug from store name
    const slug = storeName
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    createStoreMutation({
      variables: {
        input: {
          ownerId: user.id,
          name: storeName.trim(),
          slug: slug,
        },
      },
    });
  };

  // Initialize steps based on whether the seller has a store
  useEffect(() => {
    if (storesLoading) return;

    const storeStep: OnboardingStep = {
      id: 'store',
      title: t('onboarding.steps.store.title'),
      description: t('onboarding.steps.store.description'),
      icon: 'storefront',
      status: hasStore ? 'completed' : 'active',
      action: 'create-store',
      actionLabel: hasStore
        ? t('onboarding.steps.store.actionLabelDone')
        : t('onboarding.steps.store.actionLabel'),
    };

    const productStep: OnboardingStep = {
      id: 'product',
      title: t('onboarding.steps.product.title'),
      description: t('onboarding.steps.product.description'),
      icon: 'shopping_bag',
      status: hasStore ? 'active' : 'locked',
      action: 'add-product',
      actionLabel: t('onboarding.steps.product.actionLabel'),
    };

    const dashboardStep: OnboardingStep = {
      id: 'dashboard',
      title: t('onboarding.steps.dashboard.title'),
      description: t('onboarding.steps.dashboard.description'),
      icon: 'monitoring',
      status: 'locked',
      action: 'dashboard-tour',
      actionLabel: t('onboarding.steps.dashboard.actionLabel'),
    };

    setSteps([storeStep, productStep, dashboardStep]);

    // Seed completedSteps from localStorage + store presence
    const saved = localStorage.getItem('onboarding-tour-state');
    let savedCompleted: string[] = [];
    let savedSeen = false;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        savedCompleted = parsed.completed || [];
        savedSeen = parsed.seen === true;
      } catch {
        // ignore
      }
    }
    // Always mark 'store' as completed if the seller has one
    if (hasStore && !savedCompleted.includes('store')) {
      savedCompleted = [...savedCompleted, 'store'];
    }
    setCompletedSteps(savedCompleted);
    setHasSeenTour(savedSeen);
  }, [storesLoading, hasStore, t]);

  // Recompute step statuses whenever completedSteps changes
  useEffect(() => {
    if (steps.length === 0) return;
    const updatedSteps = steps.map((step, index) => {
      if (completedSteps.includes(step.id)) {
        return { ...step, status: 'completed' as const };
      }
      const allPreviousCompleted = steps
        .slice(0, index)
        .every(s => completedSteps.includes(s.id));
      if (allPreviousCompleted) {
        return { ...step, status: 'active' as const };
      }
      return { ...step, status: 'locked' as const };
    });
    setSteps(updatedSteps);
  }, [completedSteps]);

  const completeStep = (stepId: string) => {
    const updated = completedSteps.includes(stepId)
      ? completedSteps
      : [...completedSteps, stepId];
    setCompletedSteps(updated);
    localStorage.setItem(
      'onboarding-tour-state',
      JSON.stringify({ completed: updated, seen: hasSeenTour })
    );
  };

  const skipTour = () => {
    localStorage.setItem(
      'onboarding-tour-state',
      JSON.stringify({ completed: completedSteps, seen: true })
    );
    router.push(`/${locale}/seller/dashboard`);
  };

  const handleStepAction = (stepId: string, action: string) => {
    if (action === 'create-store') {
      // handled inline in the component
    } else if (action === 'add-product') {
      completeStep('product');
      router.push(`/${locale}/seller/products/new`);
    } else if (action === 'dashboard-tour') {
      router.push(`/${locale}/seller/dashboard`);
    }
  };

  const completionPercentage =
    steps.length > 0
      ? Math.round((completedSteps.filter(id => steps.some(s => s.id === id)).length / steps.length) * 100)
      : 0;

  return {
    steps,
    completedSteps,
    completionPercentage,
    hasSeenTour,
    storesLoading,
    hasStore,
    storeName,
    setStoreName,
    createStoreError,
    creatingStore,
    handleCreateStore,
    completeStep,
    skipTour,
    handleStepAction,
  };
}
