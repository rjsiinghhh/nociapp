import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { MOCK_ORDERS } from '../../data/orders';
import { StatusStepper } from '../../components/tracking/StatusStepper';
import { Divider } from '../../components/common/Divider';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

const STATUS_STEPS = [
  { label: 'Confirmed', emoji: '✅' },
  { label: 'Picking fresh', emoji: '🧺' },
  { label: 'On the way', emoji: '🚗' },
  { label: 'Delivered', emoji: '🏠' },
];

const STATUS_INDEX: Record<string, number> = {
  confirmed: 0,
  picking: 1,
  en_route: 2,
  delivered: 3,
};

export function OrderTrackingScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const order = MOCK_ORDERS.find((o) => o.id === orderId) ?? MOCK_ORDERS[0];
  const currentIndex = STATUS_INDEX[order.status] ?? 0;

  const placedDate = new Date(order.placedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Order #{order.id.replace('ord-', '')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>
            {order.status === 'delivered' ? '🎉 Delivered!' : '📦 Your order is on its way'}
          </Text>
          <Text style={styles.slotText}>{order.slot.label}</Text>
          <Text style={styles.addressText}>{order.deliveryAddress}</Text>
        </View>

        <View style={styles.stepperCard}>
          <StatusStepper steps={STATUS_STEPS} currentIndex={currentIndex} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items in this order</Text>
          {order.items.map((item) => (
            <View key={item.product.id} style={styles.itemRow}>
              <Image
                source={{ uri: item.product.imageUrl }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemOrigin}>{item.product.farmOrigin}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemQty}>×{item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ${(item.product.pricePerUnit * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Divider />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order details</Text>
          <DetailRow label="Placed" value={placedDate} />
          <DetailRow label="Subtotal" value={`$${order.subtotal.toFixed(2)}`} />
          <DetailRow label="Delivery fee" value={`$${order.deliveryFee.toFixed(2)}`} />
          <DetailRow label="Total" value={`$${order.total.toFixed(2)}`} bold />
        </View>

        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpText}>Need help with this order? Contact us →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={[detailStyles.value, bold && detailStyles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.green50,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray200,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.green900,
  },
  navTitle: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
  },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  statusCard: {
    backgroundColor: COLORS.green700,
    borderRadius: 18,
    padding: SPACING.xl,
  },
  statusLabel: {
    ...TYPOGRAPHY.headingMd,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  slotText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.green200,
    marginBottom: SPACING.xs,
  },
  addressText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.green200,
  },
  stepperCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    marginBottom: SPACING.xs,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    fontSize: 14,
  },
  itemOrigin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemQty: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
  },
  itemPrice: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green700,
  },
  helpBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  helpText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.green700,
    textDecorationLine: 'underline',
  },
});

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
  },
  value: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
  },
  bold: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green900,
    fontSize: 16,
  },
});
