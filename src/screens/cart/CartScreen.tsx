import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartSummary } from '../../components/cart/CartSummary';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import type { CartItem } from '../../types/cart';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

const DELIVERY_FEE = 3.99;

export function CartScreen({ navigation }: Props) {
  const { cart, subtotal, clearCart, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.green50} />
        <View style={styles.header}>
          <Text style={styles.title}>Your Basket</Text>
        </View>
        <EmptyState
          emoji="🧺"
          title="Your basket is empty"
          subtitle="Browse today's menu and add some fresh produce."
          actionLabel="Browse menu"
          onAction={() => navigation.navigate('Home')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.green50} />

      <View style={styles.header}>
        <Text style={styles.title}>Your Basket</Text>
        <TouchableOpacity onPress={clearCart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.clearAll}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <FlatList<CartItem>
        data={cart.items}
        keyExtractor={(i) => i.product.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <CartSummary subtotal={subtotal} deliveryFee={DELIVERY_FEE} />
            <View style={styles.cutoff}>
              <Text style={styles.cutoffText}>
                ⏰ Orders placed after <Text style={styles.cutoffBold}>10 PM</Text> deliver the following day
              </Text>
            </View>
            <Button
              label={`Place Order · $${(subtotal + DELIVERY_FEE).toFixed(2)}`}
              onPress={() => navigation.navigate('Checkout')}
              fullWidth
              size="lg"
            />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.headingLg,
    color: COLORS.green900,
  },
  clearAll: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.error,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  footer: {
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  cutoff: {
    backgroundColor: COLORS.earth100,
    borderRadius: 10,
    padding: SPACING.md,
  },
  cutoffText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.earth700,
    textAlign: 'center',
  },
  cutoffBold: {
    fontWeight: '700',
  },
});
