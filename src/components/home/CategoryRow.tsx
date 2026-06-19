import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SPACING } from '../../theme';
import { Chip } from '../common/Chip';
import { CATEGORIES } from '../../data/categories';

interface CategoryRowProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CategoryRow({ selectedId, onSelect }: CategoryRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.row}
    >
      {CATEGORIES.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.label}
          emoji={cat.emoji}
          selected={selectedId === cat.id}
          onPress={() => onSelect(cat.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
});
