import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  /**
   * primary  — solid black, white text (matches "Add to Cart" on noci.farm)
   * option   — accent-outlined when idle, accent-filled when selected
   *            (matches size/variant selectors on noci.farm)
   * ghost    — no fill, black text (for less prominent actions)
   */
  variant?: 'primary' | 'option' | 'ghost';
  selected?: boolean;   // for variant="option" only
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  selected = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  size = 'md',
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'option' && (selected ? styles.optionSelected : styles.option),
        variant === 'ghost' && styles.ghost,
        size === 'sm' && styles.sm,
        size === 'lg' && styles.lg,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || (variant === 'option' && selected) ? COLORS.white : COLORS.black}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.primaryLabel,
            variant === 'option' && (selected ? styles.optionSelectedLabel : styles.optionLabel),
            variant === 'ghost' && styles.ghostLabel,
            size === 'sm' && styles.smLabel,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: SPACING.xxl,
    borderRadius: 8,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },

  // Solid black — "Add to Cart", "Place Order", primary actions
  primary: {
    backgroundColor: COLORS.black,
  },
  primaryLabel: {
    color: COLORS.white,
    ...TYPOGRAPHY.labelLg,
    letterSpacing: 0.4,
  },

  // Outlined with accent border — idle option/selector state (matches noci.farm size buttons)
  option: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  optionLabel: {
    color: COLORS.accent,
    ...TYPOGRAPHY.labelLg,
  },

  // Filled accent — selected option state
  optionSelected: {
    backgroundColor: COLORS.accent,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  optionSelectedLabel: {
    color: COLORS.white,
    ...TYPOGRAPHY.labelLg,
  },

  ghost: {
    backgroundColor: 'transparent',
  },
  ghostLabel: {
    color: COLORS.black,
    ...TYPOGRAPHY.labelLg,
  },

  disabled: {
    opacity: 0.35,
  },
  label: {
    ...TYPOGRAPHY.labelLg,
  },
  smLabel: {
    ...TYPOGRAPHY.labelSm,
  },
});
