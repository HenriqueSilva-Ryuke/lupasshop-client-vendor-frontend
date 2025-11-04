'use client';

import { useEffect } from 'react';
import { analytics, type EventProperties } from '@/lib/analytics';

/**
 * Hook para rastrear eventos de analytics
 * Deve ser usado em componentes cliente
 */
export function useAnalytics() {
  useEffect(() => {
    // Rastrear carregamento de página
    if (typeof window !== 'undefined') {
      analytics.trackPageView(window.location.pathname, document.title);
    }
  }, []);

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackAuthEvent: analytics.trackAuthEvent.bind(analytics),
    trackEcommerceEvent: analytics.trackEcommerceEvent.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackClick: analytics.trackClick.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
  };
}
