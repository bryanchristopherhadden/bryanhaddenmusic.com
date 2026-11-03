import beats from '../../public/beats.json';

export type LicenseType = 'lease' | 'purchase';

export interface OrderItem {
  id: string;
  type: LicenseType;
  quantity: number;
}

// Prices in dollars. These match what the storefront cart currently charges.
export const PRICES: Record<LicenseType, number> = {
  lease: 0.5,
  purchase: 2,
};

export function getBeat(id: string) {
  return beats.find((beat) => beat.id === id && beat.active && beat.forsale);
}

// Rejects anything malformed or not for sale, so prices never come from the client
export function parseOrderItems(items: unknown): OrderItem[] | null {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const parsed: OrderItem[] = [];
  for (const item of items) {
    const { id, type, quantity } = item ?? {};
    if (typeof id !== 'string' || !getBeat(id)) return null;
    if (type !== 'lease' && type !== 'purchase') return null;
    if (!Number.isInteger(quantity) || quantity < 1) return null;
    parsed.push({ id, type, quantity });
  }
  return parsed;
}

export function calculateTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + PRICES[item.type] * item.quantity, 0);
}

// Compact form for Stripe metadata, whose values are limited to 500 characters
export function serializeOrderItems(items: OrderItem[]): string {
  return items.map((item) => `${item.id}:${item.type}`).join(',');
}

export function deserializeOrderItems(value: string): Pick<OrderItem, 'id' | 'type'>[] {
  return value
    .split(',')
    .filter(Boolean)
    .map((entry) => {
      const [id, type] = entry.split(':');
      return { id, type: type as LicenseType };
    });
}
