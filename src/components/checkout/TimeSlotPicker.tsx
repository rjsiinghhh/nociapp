import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SPACING } from '../../theme';
import { Button } from '../common/Button';
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
      {slots.map((slot) => (
        <Button
          key={slot.id}
          label={slot.label}
          onPress={() => onSelect(slot)}
          variant="option"
          selected={selectedId === slot.id}
          size="sm"
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    paddingHorizontal: 2,
  },
});
