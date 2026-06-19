import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { DeliverySlot } from '../../types/order';

interface TimeSlotPickerProps {
  slots: DeliverySlot[];
  selectedId: string | null;
  onSelect: (slot: DeliverySlot) => void;
}

export function TimeSlotPicker({ slots, selectedId, onSelect }: TimeSlotPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {slots.map((slot) => {
        const isSelected = selectedId === slot.id;
        return (
          <TouchableOpacity
            key={slot.id}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelect(slot)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{slot.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: 2,
  },
  card: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.white,
    minWidth: 160,
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: COLORS.green700,
    backgroundColor: COLORS.green50,
  },
  label: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  labelSelected: {
    color: COLORS.green700,
    fontWeight: '600',
  },
});
