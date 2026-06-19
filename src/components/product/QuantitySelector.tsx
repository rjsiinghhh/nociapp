import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, quantity <= min && styles.btnDisabled]}
        onPress={onDecrement}
        disabled={quantity <= min}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[styles.btnText, quantity <= min && styles.btnTextDisabled]}>−</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{quantity}</Text>
      <TouchableOpacity
        style={[styles.btn, quantity >= max && styles.btnDisabled]}
        onPress={onIncrement}
        disabled={quantity >= max}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[styles.btnText, quantity >= max && styles.btnTextDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.green200,
    paddingHorizontal: SPACING.sm,
  },
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.3,
  },
  btnText: {
    ...TYPOGRAPHY.headingMd,
    color: COLORS.green700,
    lineHeight: 24,
  },
  btnTextDisabled: {
    color: COLORS.gray400,
  },
  count: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    minWidth: 32,
    textAlign: 'center',
  },
});
