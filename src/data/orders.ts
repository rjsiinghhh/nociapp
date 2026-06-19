import type { Order } from '../types/order';
import { PRODUCTS } from './products';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    items: [
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[3], quantity: 1 },
      { product: PRODUCTS[8], quantity: 1 },
    ],
    status: 'en_route',
    slot: {
      id: 'slot-1',
      label: 'Today, 2–4 PM',
      date: '2026-06-19',
      startTime: '14:00',
      endTime: '16:00',
    },
    deliveryAddress: '142 Maple Street, Apt 3, Burlington, VT 05401',
    subtotal: 20.5,
    deliveryFee: 3.99,
    total: 24.49,
    placedAt: '2026-06-19T09:32:00Z',
  },
  {
    id: 'ord-002',
    items: [
      { product: PRODUCTS[1], quantity: 1 },
      { product: PRODUCTS[5], quantity: 1 },
      { product: PRODUCTS[10], quantity: 1 },
    ],
    status: 'delivered',
    slot: {
      id: 'slot-2',
      label: 'Yesterday, 4–6 PM',
      date: '2026-06-18',
      startTime: '16:00',
      endTime: '18:00',
    },
    deliveryAddress: '142 Maple Street, Apt 3, Burlington, VT 05401',
    subtotal: 16.5,
    deliveryFee: 3.99,
    total: 20.49,
    placedAt: '2026-06-18T08:15:00Z',
  },
];
