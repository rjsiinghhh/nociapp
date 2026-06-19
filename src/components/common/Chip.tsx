import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface ChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress: () => void;
}

export function Chip({ label, emoji, selected = false, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.chip, selected && styles.selected]}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.xLightGray,
    marginRight: SPACING.sm,
  },
  selected: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  emoji: {
    fontSize: 13,
    marginRight: 5,
  },
  label: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.midGray,
    letterSpacing: 0.2,
  },
  selectedLabel: {
    color: COLORS.white,
  },
});
