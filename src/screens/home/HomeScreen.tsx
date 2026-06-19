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

  const pairs: Product[][] = [];
  for (let i = 0; i < filtered.length; i += 2) {
    pairs.push(filtered.slice(i, i + 2));
  }

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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <FlatList
        data={pairs}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* noci wordmark — Caveat Bold red, all-caps, matching noci.farm */}
            <View style={styles.header}>
              <Text style={styles.wordmark}>NOCI</Text>
            </View>

            {/* Hero headline — Caveat display, dark */}
            <View style={styles.heroBlock}>
              <Text style={styles.heroText}>{"FRESH.\nLOCAL.\n& DELIVERED."}</Text>
              <Text style={styles.heroSub}>
                Picked up from nearby farms each morning, delivered to your door.
              </Text>
            </View>

            {/* 10 PM cutoff notice */}
            <View style={styles.cutoffBanner}>
              <Text style={styles.cutoffText}>
                Order by <Text style={styles.cutoffBold}>10 PM</Text> — delivered tomorrow morning.
              </Text>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>◎</Text>
                <TextInput
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search produce or farm..."
                  placeholderTextColor={COLORS.lightGray}
                  returnKeyType="search"
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Category filter */}
            <CategoryRow selectedId={selectedCategory} onSelect={setSelectedCategory} />

            <Text style={styles.count}>
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} today
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nothing here yet.</Text>
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
    backgroundColor: COLORS.white,
  },
  list: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  wordmark: {
    fontFamily: TYPOGRAPHY.displayLg.fontFamily,
    fontSize: 36,
    color: COLORS.accent,
    letterSpacing: 1,
  },
  heroBlock: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.xLightGray,
    marginBottom: SPACING.lg,
  },
  heroText: {
    fontFamily: TYPOGRAPHY.displayLg.fontFamily,
    fontSize: 44,
    color: COLORS.black,
    lineHeight: 50,
    marginBottom: SPACING.md,
  },
  heroSub: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
    lineHeight: 20,
  },
  cutoffBanner: {
    marginHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  cutoffText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  cutoffBold: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  searchRow: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
  },
  searchIcon: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.black,
    padding: 0,
  },
  clearIcon: {
    color: COLORS.lightGray,
    fontSize: 13,
    paddingLeft: SPACING.sm,
  },
  count: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.lightGray,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
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
  emptyTitle: {
    fontFamily: TYPOGRAPHY.displaySm.fontFamily,
    fontSize: 28,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
    textAlign: 'center',
  },
});
