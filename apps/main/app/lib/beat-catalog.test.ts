import { describe, expect, it } from 'vitest';
import beats from '../../public/beats.json';
import { calculateTotal, deserializeOrderItems, getBeat, parseOrderItems, serializeOrderItems } from './beat-catalog';

describe('beat catalog', () => {
  it('prices an order on the server, ignoring any client price', () => {
    const items = parseOrderItems([
      { id: 'uberblack', type: 'lease', quantity: 2, price: 0.01 },
      { id: 'toptier', type: 'purchase', quantity: 1 },
    ]);
    expect(calculateTotal(items!)).toBe(3);
  });

  it.each([
    [[]],
    ['uberblack'],
    [[{ id: 'not-a-beat', type: 'lease', quantity: 1 }]],
    [[{ id: 'uberblack', type: 'free', quantity: 1 }]],
    [[{ id: 'uberblack', type: 'lease', quantity: 0 }]],
    [[{ id: 'uberblack', type: 'lease', quantity: 1.5 }]],
    [[null]],
  ])('rejects invalid items: %j', (items) => {
    expect(parseOrderItems(items)).toBeNull();
  });

  it('round-trips items through metadata within the Stripe limit', () => {
    const items = beats.map((beat) => ({ id: beat.id, type: 'purchase' as const, quantity: 1 }));
    const serialized = serializeOrderItems(items);
    expect(serialized.length).toBeLessThanOrEqual(500);
    expect(deserializeOrderItems(serialized)).toEqual(items.map(({ id, type }) => ({ id, type })));
  });

  it('finds the purchased file by id', () => {
    expect(getBeat('uberblack')?.filename).toBe('Uber Black.m4a');
  });
});
