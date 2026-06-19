import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { ProductBadge } from '../../types/product';

const BADGE_LABEL: Record<ProductBadge, string> = {
  organic: 'Organic',
  seasonal: 'Seasonal',
  heirloom: 'Heirloom',
  local: 'Local',
};

// noci aesthetic: simple outlined tags in dark ink — no colored pills
interface BadgeProps {
  type: ProductBadge;
}

export function Badge({ type }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{BADGE_LABEL[type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  text: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.midGray,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
