import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { Divider } from '../common/Divider';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
}

export function CartSummary({ subtotal, deliveryFee }: CartSummaryProps) {
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
      <Row label="Delivery fee" value={`$${deliveryFee.toFixed(2)}`} />
      <Divider margin={SPACING.md} />
      <Row label="Total" value={`$${total.toFixed(2)}`} bold />
    </View>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.lg,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
  },
  value: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
  },
  bold: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green900,
    fontSize: 16,
  },
});
