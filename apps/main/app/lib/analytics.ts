// Custom Analytics Utility for Music Page
// Tracks user interactions, checkout flow, and page behavior

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface PageViewData {
  page: string;
  referrer?: string;
  timestamp?: number;
}

interface CheckoutStepData {
  step: 'cart_opened' | 'checkout_started' | 'payment_form_shown' | 'payment_completed' | 'payment_failed' | 'checkout_abandoned';
  cartItems?: any[];
  total?: number;
  timestamp?: number;
}

interface ClickData {
  element: string;
  elementType: 'button' | 'link' | 'play_button' | 'cart_button' | 'checkout_button';
  beatId?: string;
  beatTitle?: string;
  action?: string;
  timestamp?: number;
}

class MusicAnalytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private startTime: number;
  private pageStartTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.pageStartTime = Date.now();
    this.trackPageView();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private addEvent(event: AnalyticsEvent): void {
    const eventWithTimestamp = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      sessionDuration: Date.now() - this.startTime,
      pageDuration: Date.now() - this.pageStartTime
    };
    
    this.events.push(eventWithTimestamp);
    
    // Log to console for development (you can replace this with actual analytics service)
    console.log('🎵 Music Analytics Event:', eventWithTimestamp);
    
    // Send to external analytics service (implement based on your chosen provider)
    this.sendToAnalytics(eventWithTimestamp);
  }

  private async sendToAnalytics(event: any): Promise<void> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
      }

      // For now, we'll just store in localStorage for persistence
      // You can replace this with calls to Plausible, Matomo, or other services
      const storedEvents = JSON.parse(localStorage.getItem('music_analytics') || '[]');
      storedEvents.push(event);
      
      // Keep only last 100 events to prevent storage bloat
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100);
      }
      
      localStorage.setItem('music_analytics', JSON.stringify(storedEvents));
      
      // Example: Send to external service
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
      
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Page tracking
  trackPageView(data?: Partial<PageViewData>): void {
    this.addEvent({
      event: 'page_view',
      properties: {
        page: data?.page || '/music',
        referrer: data?.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screenResolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
        viewportSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
        ...data
      }
    });
  }

  // Click tracking
  trackClick(data: ClickData): void {
    this.addEvent({
      event: 'click',
      properties: {
        element: data.element,
        elementType: data.elementType,
        beatId: data.beatId,
        beatTitle: data.beatTitle,
        action: data.action,
        ...data
      }
    });
  }

  // Beat interaction tracking
  trackBeatPreview(beatId: string, beatTitle: string): void {
    this.addEvent({
      event: 'beat_preview_started',
      properties: {
        beatId,
        beatTitle,
        action: 'preview_start'
      }
    });
  }

  trackBeatPreviewEnd(beatId: string, beatTitle: string, duration: number): void {
    this.addEvent({
      event: 'beat_preview_ended',
      properties: {
        beatId,
        beatTitle,
        duration,
        action: 'preview_end'
      }
    });
  }

  // Cart tracking
  trackAddToCart(beatId: string, beatTitle: string, type: 'lease' | 'purchase', price: number): void {
    this.addEvent({
      event: 'add_to_cart',
      properties: {
        beatId,
        beatTitle,
        licenseType: type,
        price,
        action: 'add_to_cart'
      }
    });
  }

  trackRemoveFromCart(beatId: string, beatTitle: string, type: 'lease' | 'purchase'): void {
    this.addEvent({
      event: 'remove_from_cart',
      properties: {
        beatId,
        beatTitle,
        licenseType: type,
        action: 'remove_from_cart'
      }
    });
  }

  trackCartOpened(cartItems: any[]): void {
    this.addEvent({
      event: 'cart_opened',
      properties: {
        cartItemCount: cartItems.length,
        cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        action: 'cart_opened'
      }
    });
  }

  // Checkout flow tracking
  trackCheckoutStep(data: CheckoutStepData): void {
    this.addEvent({
      event: 'checkout_step',
      properties: {
        step: data.step,
        cartItems: data.cartItems,
        total: data.total,
        action: data.step
      }
    });
  }

  trackCheckoutAbandoned(step: string, cartItems: any[]): void {
    this.addEvent({
      event: 'checkout_abandoned',
      properties: {
        abandonedAtStep: step,
        cartItemCount: cartItems.length,
        cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        action: 'checkout_abandoned'
      }
    });
  }

  // Search and filter tracking
  trackSearch(query: string, resultsCount: number): void {
    this.addEvent({
      event: 'search',
      properties: {
        query,
        resultsCount,
        action: 'search'
      }
    });
  }

  trackFilter(genre: string, resultsCount: number): void {
    this.addEvent({
      event: 'filter',
      properties: {
        genre,
        resultsCount,
        action: 'filter'
      }
    });
  }

  // Help and contact tracking
  trackHelpOpened(): void {
    this.addEvent({
      event: 'help_opened',
      properties: {
        action: 'help_opened'
      }
    });
  }

  trackContactClick(): void {
    this.addEvent({
      event: 'contact_clicked',
      properties: {
        action: 'contact_clicked'
      }
    });
  }

  // Session tracking
  trackSessionEnd(): void {
    const sessionDuration = Date.now() - this.startTime;
    this.addEvent({
      event: 'session_end',
      properties: {
        sessionDuration,
        totalEvents: this.events.length,
        action: 'session_end'
      }
    });
  }

  // Get analytics data (for debugging or admin panel)
  getAnalyticsData(): AnalyticsEvent[] {
    return this.events;
  }

  // Export analytics data
  exportAnalyticsData(): string {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return JSON.stringify([], null, 2);
    }
    const allEvents = JSON.parse(localStorage.getItem('music_analytics') || '[]');
    return JSON.stringify(allEvents, null, 2);
  }

  // Clear analytics data
  clearAnalyticsData(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('music_analytics');
    }
    this.events = [];
  }
}

// Create singleton instance
export const musicAnalytics = new MusicAnalytics();

// Export types for use in components
export type { AnalyticsEvent, PageViewData, CheckoutStepData, ClickData };
