import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { PRODUCTS } from '../../data/products';
import { CategoryRow } from '../../components/home/CategoryRow';
import { ProductCard } from '../../components/cards/ProductCard';
import type { Product } from '../../types/product';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.farmOrigin.toLowerCase().includes(q),
      );
    }
    return list;
  }, [search, selectedCategory]);

  const renderItem: ListRenderItem<Product[]> = ({ item: pair }) => (
    <View style={styles.row}>
      <ProductCard
        product={pair[0]}
        onPress={() => navigation.navigate('ProductDetail', { productId: pair[0].id })}
      />
      {pair[1] ? (
        <ProductCard
          product={pair[1]}
          onPress={() => navigation.navigate('ProductDetail', { productId: pair[1].id })}
        />
      ) : (
        <View style={styles.rowSpacer} />
      )}
    </View>
  );

  const pairs: Product[][] = [];
  for (let i = 0; i < filtered.length; i += 2) {
    pairs.push(filtered.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.green50} />

      <FlatList
        data={pairs}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Good morning 🌱</Text>
                <Text style={styles.title}>Today's menu</Text>
              </View>
            </View>

            <View style={styles.cutoffBanner}>
              <Text style={styles.cutoffEmoji}>⏰</Text>
              <Text style={styles.cutoffText}>
                Order by <Text style={styles.cutoffBold}>10 PM tonight</Text> for tomorrow morning delivery
              </Text>
            </View>

            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search produce or farm..."
                  placeholderTextColor={COLORS.gray400}
                  returnKeyType="search"
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <CategoryRow selectedId={selectedCategory} onSelect={setSelectedCategory} />

            <Text style={styles.sectionLabel}>
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} available
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🥬</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyText}>Try a different category or check back tomorrow.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.green50,
  },
  list: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  greeting: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray400,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: COLORS.green900,
  },
  cutoffBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.earth100,
    marginHorizontal: SPACING.lg,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cutoffEmoji: {
    fontSize: 16,
  },
  cutoffText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.earth700,
    flex: 1,
  },
  cutoffBold: {
    fontWeight: '700',
  },
  searchRow: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: SPACING.md,
    height: 46,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.green900,
    padding: 0,
  },
  clearIcon: {
    color: COLORS.gray400,
    fontSize: 14,
    paddingLeft: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.gray400,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
  },
  rowSpacer: {
    flex: 1,
    margin: SPACING.xs,
  },
  empty: {
    alignItems: 'center',
    paddingTop: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    ...TYPOGRAPHY.headingMd,
    color: COLORS.green900,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray400,
    textAlign: 'center',
  },
});
