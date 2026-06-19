import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

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
      <View style={styles.divider} />
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    padding: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.xLightGray,
    marginVertical: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
  },
  value: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
  },
  bold: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.black,
    fontSize: 16,
  },
});
