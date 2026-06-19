import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Order } from '../../types/order';

const STATUS_CONFIG: Record<Order['status'], { label: string; color: string; bg: string }> = {
  confirmed: { label: 'Confirmed', color: COLORS.green700, bg: COLORS.green100 },
  picking: { label: 'Picking', color: COLORS.earth700, bg: COLORS.earth100 },
  en_route: { label: 'On the way', color: '#0369A1', bg: '#E0F2FE' },
  delivered: { label: 'Delivered', color: COLORS.gray400, bg: COLORS.gray100 },
};

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const status = STATUS_CONFIG[order.status];
  const itemSummary = order.items
    .map((i) => `${i.quantity}× ${i.product.name}`)
    .join(', ');

  const date = new Date(order.placedAt);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id.replace('ord-', '')}</Text>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>
      <Text style={styles.items} numberOfLines={1}>{itemSummary}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{dateStr} · {order.slot.label}</Text>
        <Text style={styles.total}>${order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  orderId: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green900,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
  },
  items: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
  },
  total: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green700,
  },
});
