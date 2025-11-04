/**
 * Analytics Event Tracking System
 * Integrates Google Analytics 4 and Facebook Pixel events
 */

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

class AnalyticsTracker {
  private gaId: string | undefined;
  private fbPixelId: string | undefined;

  constructor() {
    this.gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
    this.fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  }

  /**
   * Track a custom event with GA4 and Facebook Pixel
   */
  trackEvent(eventName: string, properties?: EventProperties) {
    // Google Analytics 4 event tracking
    if (this.gaId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }

    // Facebook Pixel event tracking
    if (this.fbPixelId && typeof window !== 'undefined' && window.fbq) {
      // Map custom event names to Facebook standard events if applicable
      const fbEventName = this.mapToFBEvent(eventName);
      window.fbq('track', fbEventName);
    }
  }

  /**
   * Track a page view (for SPA navigation)
   */
  trackPageView(pagePath: string, pageTitle?: string) {
    if (this.gaId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.gaId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }

    if (this.fbPixelId && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }

  /**
   * Track user authentication events
   */
  trackAuthEvent(eventType: 'login' | 'register' | 'logout', userId?: string) {
    this.trackEvent(`auth_${eventType}`, {
      user_id: userId,
      timestamp: Date.now(),
    });

    // Set user ID in GA4 for cross-session tracking
    if (this.gaId && userId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.gaId, {
        user_id: userId,
      });
    }
  }

  /**
   * Track e-commerce events
   */
  trackEcommerceEvent(
    eventType: 'view_item' | 'add_to_cart' | 'purchase' | 'view_cart',
    properties: EventProperties
  ) {
    this.trackEvent(eventType, properties);
  }

  /**
   * Track error events for debugging
   */
  trackError(errorMessage: string, errorCode?: string) {
    this.trackEvent('error_occurred', {
      error_message: errorMessage,
      error_code: errorCode,
    });
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName: string, success: boolean = true) {
    this.trackEvent('form_submit', {
      form_name: formName,
      success,
    });
  }

  /**
   * Track click events
   */
  trackClick(elementName: string, category?: string) {
    this.trackEvent('click', {
      element_name: elementName,
      category,
    });
  }

  /**
   * Track video or content engagement
   */
  trackEngagement(contentType: string, contentId: string, timeSpent?: number) {
    this.trackEvent('engagement', {
      content_type: contentType,
      content_id: contentId,
      time_spent: timeSpent,
    });
  }

  /**
   * Map custom event names to Facebook standard events
   */
  private mapToFBEvent(eventName: string): string {
    const fbEventMap: Record<string, string> = {
      auth_login: 'Login',
      auth_register: 'CompleteRegistration',
      auth_logout: 'CustomLogout',
      form_submit: 'Lead',
      purchase: 'Purchase',
      add_to_cart: 'AddToCart',
      view_item: 'ViewContent',
      click: 'Click',
      error_occurred: 'CustomError',
    };

    return fbEventMap[eventName] || eventName;
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();

// Declare window types for analytics
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type { EventProperties };
