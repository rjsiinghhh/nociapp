import type { DeliverySlot } from '../types/order';

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: 'slot-today-1', label: 'Today, 12–2 PM', date: '2026-06-19', startTime: '12:00', endTime: '14:00' },
  { id: 'slot-today-2', label: 'Today, 2–4 PM', date: '2026-06-19', startTime: '14:00', endTime: '16:00' },
  { id: 'slot-today-3', label: 'Today, 4–6 PM', date: '2026-06-19', startTime: '16:00', endTime: '18:00' },
  { id: 'slot-tmrw-1', label: 'Tomorrow, 10 AM–12 PM', date: '2026-06-20', startTime: '10:00', endTime: '12:00' },
  { id: 'slot-tmrw-2', label: 'Tomorrow, 12–2 PM', date: '2026-06-20', startTime: '12:00', endTime: '14:00' },
  { id: 'slot-tmrw-3', label: 'Tomorrow, 2–4 PM', date: '2026-06-20', startTime: '14:00', endTime: '16:00' },
];
