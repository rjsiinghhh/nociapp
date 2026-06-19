import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { MOCK_ORDERS } from '../../data/orders';
import { OrderCard } from '../../components/cards/OrderCard';
import { EmptyState } from '../../components/common/EmptyState';
import type { Order } from '../../types/order';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function OrdersScreen({ navigation }: Props) {
  if (MOCK_ORDERS.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <EmptyState
          emoji="📦"
          title="No orders yet"
          subtitle="Place your first order and track it right here."
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
        <Text style={styles.title}>My Orders</Text>
      </View>

      <FlatList<Order>
        data={MOCK_ORDERS}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.headingLg,
    color: COLORS.green900,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
