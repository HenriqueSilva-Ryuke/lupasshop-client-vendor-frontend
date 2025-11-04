"use client";

import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Função para calcular os breakpoints
    const updateResponsiveState = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;

      setState({
        isMobile: width < 768, // md breakpoint
        isTablet: width >= 768 && width < 1024, // md to lg
        isDesktop: width >= 1024, // lg+
      });
    };

    // Atualizar estado inicial
    updateResponsiveState();

    // Adicionar listener para resize
    window.addEventListener('resize', updateResponsiveState);

    // Cleanup
    return () => window.removeEventListener('resize', updateResponsiveState);
  }, []);

  return state;
}