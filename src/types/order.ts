import type { CartItem } from './cart';

export type OrderStatus = 'confirmed' | 'picking' | 'en_route' | 'delivered';

export interface DeliverySlot {
  id: string;
  label: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  slot: DeliverySlot;
  deliveryAddress: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
}
