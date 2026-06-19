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
  { label: 'Confirmed', emoji: '✓' },
  { label: 'Picking', emoji: '○' },
  { label: 'On the way', emoji: '○' },
  { label: 'Delivered', emoji: '○' },
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
      <StatusBar barStyle="light-content" />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Order #{order.id.replace('ord-', '')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Status hero — solid black, matching noci.farm CTA button style */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>
            {order.status === 'delivered' ? 'Delivered.' : 'On its way.'}
          </Text>
          <Text style={styles.slotText}>{order.slot.label}</Text>
          <Text style={styles.addressText}>{order.deliveryAddress}</Text>
        </View>

        <View style={styles.stepperCard}>
          <StatusStepper steps={STATUS_STEPS} currentIndex={currentIndex} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
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
          <Text style={styles.sectionTitle}>Details</Text>
          <DetailRow label="Placed" value={placedDate} />
          <DetailRow label="Subtotal" value={`$${order.subtotal.toFixed(2)}`} />
          <DetailRow label="Delivery fee" value={`$${order.deliveryFee.toFixed(2)}`} />
          <DetailRow label="Total" value={`$${order.total.toFixed(2)}`} bold />
        </View>

        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpText}>Need help? Contact us →</Text>
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
    backgroundColor: COLORS.white,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.xLightGray,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.black,
  },
  navTitle: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.black,
  },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  // Solid black status card — mirrors the "Add to Cart" button aesthetic
  statusCard: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    padding: SPACING.xl,
    gap: SPACING.xs,
  },
  statusLabel: {
    fontFamily: TYPOGRAPHY.displaySm.fontFamily,
    fontSize: 32,
    color: COLORS.white,
  },
  slotText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.lightGray,
  },
  addressText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  stepperCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    padding: SPACING.lg,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.midGray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.xs,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    borderRadius: 8,
    padding: SPACING.md,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: COLORS.offWhite,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.black,
    fontSize: 14,
  },
  itemOrigin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemQty: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  itemPrice: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.black,
  },
  helpBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  helpText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.accent,
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
    color: COLORS.midGray,
  },
  value: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
  },
  bold: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.black,
    fontSize: 16,
  },
});
