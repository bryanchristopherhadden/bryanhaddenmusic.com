// Google Analytics 4 E-commerce Tracking Utility
// Tracks music purchases, cart interactions, and user behavior

interface GA4Event {
  event_name: string;
  parameters?: Record<string, any>;
}

interface PurchaseItem {
  item_id: string;
  item_name: string;
  item_category: string;
  item_brand?: string;
  price: number;
  quantity: number;
}

interface PurchaseEvent {
  transaction_id: string;
  value: number;
  currency: string;
  items: PurchaseItem[];
  customer_email?: string;
}

// Check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
};

// Track page view
export const trackPageView = (page_title: string, page_location: string): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'page_view', {
    page_title,
    page_location,
  });
};

// Track beat preview start
export const trackBeatPreviewStart = (beatId: string, beatTitle: string, beatGenre: string): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'view_item', {
    currency: 'USD',
    value: 0, // Preview has no value
    items: [{
      item_id: beatId,
      item_name: beatTitle,
      item_category: beatGenre,
      item_brand: 'Bryan Hadden',
      price: 0,
      quantity: 1,
    }],
  });
};

// Track add to cart
export const trackAddToCart = (
  beatId: string, 
  beatTitle: string, 
  beatGenre: string, 
  licenseType: 'lease' | 'purchase',
  price: number
): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: price,
    items: [{
      item_id: `${beatId}-${licenseType}`,
      item_name: `${beatTitle} (${licenseType})`,
      item_category: beatGenre,
      item_brand: 'Bryan Hadden',
      price: price,
      quantity: 1,
    }],
  });
};

// Track remove from cart
export const trackRemoveFromCart = (
  beatId: string, 
  beatTitle: string, 
  beatGenre: string, 
  licenseType: 'lease' | 'purchase',
  price: number
): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value: price,
    items: [{
      item_id: `${beatId}-${licenseType}`,
      item_name: `${beatTitle} (${licenseType})`,
      item_category: beatGenre,
      item_brand: 'Bryan Hadden',
      price: price,
      quantity: 1,
    }],
  });
};

// Track view cart
export const trackViewCart = (cartItems: any[], totalValue: number): void => {
  if (!isGtagAvailable()) return;
  
  const items = cartItems.map(item => ({
    item_id: `${item.id}-${item.type}`,
    item_name: `${item.title} (${item.type})`,
    item_category: item.genre,
    item_brand: 'Bryan Hadden',
    price: item.price,
    quantity: item.quantity,
  }));

  (window as any).gtag('event', 'view_cart', {
    currency: 'USD',
    value: totalValue,
    items: items,
  });
};

// Track begin checkout
export const trackBeginCheckout = (cartItems: any[], totalValue: number): void => {
  if (!isGtagAvailable()) return;
  
  const items = cartItems.map(item => ({
    item_id: `${item.id}-${item.type}`,
    item_name: `${item.title} (${item.type})`,
    item_category: item.genre,
    item_brand: 'Bryan Hadden',
    price: item.price,
    quantity: item.quantity,
  }));

  (window as any).gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items: items,
  });
};

// Track purchase completion
export const trackPurchase = (purchaseData: PurchaseEvent): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'purchase', {
    transaction_id: purchaseData.transaction_id,
    value: purchaseData.value,
    currency: purchaseData.currency,
    items: purchaseData.items,
    customer_email: purchaseData.customer_email,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Track filter
export const trackFilter = (filterType: string, filterValue: string, resultsCount: number): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'filter', {
    filter_type: filterType,
    filter_value: filterValue,
    results_count: resultsCount,
  });
};

// Track custom event
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', eventName, parameters);
};

// Google Ads Conversion Tracking
export const trackGoogleAdsConversion = (
  conversionId: string, 
  conversionLabel: string, 
  value?: number, 
  currency: string = 'USD'
): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'conversion', {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value,
    currency: currency,
  });
};

// Enhanced E-commerce: Track user engagement
export const trackUserEngagement = (engagementType: string, details?: Record<string, any>): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'user_engagement', {
    engagement_type: engagementType,
    ...details,
  });
};

// Track session duration
export const trackSessionDuration = (duration: number): void => {
  if (!isGtagAvailable()) return;
  
  (window as any).gtag('event', 'session_duration', {
    duration: duration,
  });
};

// Export types for use in components
export type { PurchaseEvent, PurchaseItem, GA4Event };
