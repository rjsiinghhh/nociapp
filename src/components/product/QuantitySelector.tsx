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
    // Accent-outlined selector — matches noci.farm size/option button style
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={onDecrement}
        disabled={quantity <= min}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[styles.btnText, quantity <= min && styles.btnDisabled]}>−</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{quantity}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={onIncrement}
        disabled={quantity >= max}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[styles.btnText, quantity >= max && styles.btnDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
  },
  btn: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.accent,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
  btnDisabled: {
    opacity: 0.25,
  },
  count: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.black,
    minWidth: 32,
    textAlign: 'center',
  },
});
