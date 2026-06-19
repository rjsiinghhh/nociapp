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
              <View style={[styles.circle, isDone && styles.circleDone, isActive && styles.circleActive]}>
                <Text style={styles.emoji}>{isDone ? '✓' : step.emoji}</Text>
              </View>
              {i < steps.length - 1 && (
                <View style={[styles.line, isDone && styles.lineDone]} />
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive, isDone && styles.labelDone]}>
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
    paddingHorizontal: SPACING.xs,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray100,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: COLORS.green700,
    borderColor: COLORS.green700,
  },
  circleActive: {
    backgroundColor: COLORS.earth100,
    borderColor: COLORS.earth700,
    borderWidth: 2.5,
  },
  emoji: {
    fontSize: 18,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.gray200,
    marginHorizontal: -2,
  },
  lineDone: {
    backgroundColor: COLORS.green700,
  },
  label: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: 2,
  },
  labelActive: {
    color: COLORS.earth700,
    fontWeight: '600',
  },
  labelDone: {
    color: COLORS.green700,
  },
});
