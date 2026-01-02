/**
 * Web Vitals Reporting
 * Monitoramento de métricas de performance
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

type WebVitalMetric = {
  name: string;
  value: number;
  id?: string;
};

/**
 * Envia métricas para analytics
 */
function sendToAnalytics(metric: WebVitalMetric) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value);
  }

  // Aqui você pode enviar para seu backend/APM
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  // });
}

/**
 * Reporta todas as métricas Web Vitals
 */
export function reportWebVitals() {
  try {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  } catch (error) {
    console.error('Error reporting web vitals:', error);
  }
}

/**
 * Métricas esperadas (targets):
 * - LCP (Largest Contentful Paint): < 2.5s
 * - FID (First Input Delay): < 100ms
 * - CLS (Cumulative Layout Shift): < 0.1
 * - FCP (First Contentful Paint): < 1.8s
 * - TTFB (Time to First Byte): < 600ms
 */
