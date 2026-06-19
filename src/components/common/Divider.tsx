import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../theme';

export function Divider({ margin = SPACING.lg }: { margin?: number }) {
  return <View style={[styles.divider, { marginVertical: margin }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.gray200,
  },
});
