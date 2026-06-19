import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface Step {
  label: string;
  emoji: string;
}

interface StatusStepperProps {
  steps: Step[];
  currentIndex: number;
}

export function StatusStepper({ steps, currentIndex }: StatusStepperProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        return (
          <View key={step.label} style={styles.stepWrapper}>
            <View style={styles.stepRow}>
              <View style={[
                styles.circle,
                isDone && styles.circleDone,
                isActive && styles.circleActive,
              ]}>
                <Text style={[styles.circleText, (isDone || isActive) && styles.circleTextActive]}>
                  {isDone ? '✓' : String(i + 1)}
                </Text>
              </View>
              {i < steps.length - 1 && (
                <View style={[styles.line, isDone && styles.lineDone]} />
              )}
            </View>
            <Text style={[
              styles.label,
              isActive && styles.labelActive,
              isDone && styles.labelDone,
            ]}>
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.xLightGray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  // Active step uses accent color (the changeable brand color)
  circleActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  circleText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.lightGray,
  },
  circleTextActive: {
    color: COLORS.white,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: COLORS.xLightGray,
    marginHorizontal: -2,
  },
  lineDone: {
    backgroundColor: COLORS.black,
  },
  label: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: 2,
    fontSize: 10,
  },
  labelActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  labelDone: {
    color: COLORS.midGray,
  },
});
