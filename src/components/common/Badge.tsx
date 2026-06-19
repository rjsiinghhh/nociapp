import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { ProductBadge } from '../../types/product';

const BADGE_CONFIG: Record<ProductBadge, { bg: string; text: string; label: string }> = {
  organic: { bg: COLORS.green200, text: COLORS.green900, label: 'Organic' },
  seasonal: { bg: COLORS.earth100, text: COLORS.earth700, label: 'Seasonal' },
  heirloom: { bg: '#EDE9FE', text: '#5B21B6', label: 'Heirloom' },
  local: { bg: '#FEF3C7', text: '#92400E', label: 'Local' },
};

interface BadgeProps {
  type: ProductBadge;
}

export function Badge({ type }: BadgeProps) {
  const config = BADGE_CONFIG[type];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  text: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
  },
});
