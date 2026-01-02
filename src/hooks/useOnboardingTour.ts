'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

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
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Configurar Perfil',
      description: 'Defina a identidade da sua marca, adicione seu logotipo e preencha as informações de contato essenciais.',
      icon: 'storefront',
      status: 'completed',
      action: 'edit-profile',
      actionLabel: 'Editar Detalhes',
    },
    {
      id: 'product',
      title: 'Adicionar Primeiro Produto',
      description: 'Cadastre o primeiro item que você vai vender. Adicione fotos atraentes, uma descrição detalhada e o preço.',
      icon: 'shopping_bag',
      status: 'active',
      action: 'add-product',
      actionLabel: 'Começar Agora',
    },
    {
      id: 'dashboard',
      title: 'Entender o Painel',
      description: 'Faça um tour guiado pelo dashboard para aprender a gerenciar seus pedidos, estoque e visualizar relatórios.',
      icon: 'monitoring',
      status: 'locked',
      action: 'dashboard-tour',
      actionLabel: 'Aguardando etapa anterior',
    },
  ]);

  const [completedSteps, setCompletedSteps] = useState<string[]>(['profile']);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Load tour state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('onboarding-tour-state');
    if (saved) {
      try {
        const { completed, seen } = JSON.parse(saved);
        setCompletedSteps(completed || ['profile']);
        setHasSeenTour(seen === true);
      } catch (e) {
        console.error('Failed to load onboarding state:', e);
      }
    }
  }, []);

  // Update steps based on completed steps
  useEffect(() => {
    const updatedSteps = steps.map((step, index) => {
      if (completedSteps.includes(step.id)) {
        return { ...step, status: 'completed' as const };
      }
      
      // Check if all previous steps are completed
      const allPreviousCompleted = steps
        .slice(0, index)
        .every(s => completedSteps.includes(s.id));
      
      if (allPreviousCompleted && !completedSteps.includes(step.id)) {
        return { ...step, status: 'active' as const };
      }
      
      return { ...step, status: 'locked' as const };
    });

    setSteps(updatedSteps);
  }, [completedSteps]);

  const completeStep = (stepId: string) => {
    const updated = [...completedSteps, stepId];
    setCompletedSteps(updated);
    localStorage.setItem('onboarding-tour-state', JSON.stringify({
      completed: updated,
      seen: hasSeenTour,
    }));
  };

  const skipTour = () => {
    localStorage.setItem('onboarding-tour-state', JSON.stringify({
      completed: completedSteps,
      seen: true,
    }));
    router.push(`/${locale}/seller/dashboard`);
  };

  const handleStepAction = (stepId: string, action: string) => {
    if (action === 'edit-profile') {
      router.push(`/${locale}/seller/profile`);
    } else if (action === 'add-product') {
      router.push(`/${locale}/seller/products/new`);
    } else if (action === 'dashboard-tour') {
      router.push(`/${locale}/seller/dashboard`);
    }
  };

  const completionPercentage = Math.round(
    (completedSteps.length / steps.length) * 100
  );

  return {
    steps,
    completedSteps,
    completionPercentage,
    hasSeenTour,
    completeStep,
    skipTour,
    handleStepAction,
  };
}
