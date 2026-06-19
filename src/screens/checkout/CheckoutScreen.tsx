import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { TimeSlotPicker } from '../../components/checkout/TimeSlotPicker';
import { CartSummary } from '../../components/cart/CartSummary';
import { Button } from '../../components/common/Button';
import { DELIVERY_SLOTS } from '../../data/deliverySlots';
import type { DeliverySlot } from '../../types/order';
import { Divider } from '../../components/common/Divider';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const DELIVERY_FEE = 3.99;

export function CheckoutScreen({ navigation }: Props) {
  const { subtotal, clearCart } = useCart();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<DeliverySlot | null>(null);
  const [placing, setPlacing] = useState(false);

  const canPlace = street.trim() && city.trim() && zip.trim() && selectedSlot;

  const handlePlaceOrder = () => {
    if (!canPlace) {
      Alert.alert('Missing info', 'Please fill in your address and pick a delivery time.');
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      setPlacing(false);
      navigation.replace('OrderTracking', { orderId: 'ord-001' });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Section title="Delivery address">
          <Field
            placeholder="Street address"
            value={street}
            onChange={setStreet}
            autoCapitalize="words"
          />
          <View style={styles.row}>
            <Field
              placeholder="City"
              value={city}
              onChange={setCity}
              autoCapitalize="words"
              flex={1}
            />
            <View style={{ width: SPACING.sm }} />
            <Field
              placeholder="ZIP"
              value={zip}
              onChange={setZip}
              keyboardType="numeric"
              maxLength={5}
              flex={0.5}
            />
          </View>
        </Section>

        <Section title="Delivery time">
          <Text style={styles.slotHint}>
            Orders placed by 10 PM deliver the next morning.
          </Text>
          <TimeSlotPicker
            slots={DELIVERY_SLOTS}
            selectedId={selectedSlot?.id ?? null}
            onSelect={setSelectedSlot}
          />
        </Section>

        <Section title="Order summary">
          <CartSummary subtotal={subtotal} deliveryFee={DELIVERY_FEE} />
        </Section>

        <View style={styles.ctaWrapper}>
          <Button
            label="Place Order"
            onPress={handlePlaceOrder}
            fullWidth
            size="lg"
            loading={placing}
            disabled={!canPlace}
          />
          <Text style={styles.legalText}>
            By placing your order you agree to our terms of service.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.wrapper}>
      <Text style={sectionStyles.title}>{title}</Text>
      {children}
    </View>
  );
}

interface FieldProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
  keyboardType?: 'default' | 'numeric';
  maxLength?: number;
  flex?: number;
}

function Field({ placeholder, value, onChange, autoCapitalize = 'none', keyboardType = 'default', maxLength, flex }: FieldProps) {
  return (
    <TextInput
      style={[fieldStyles.input, flex !== undefined && { flex }]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray400}
      value={value}
      onChangeText={onChange}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
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
  row: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },
  slotHint: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
    marginBottom: SPACING.sm,
  },
  ctaWrapper: {
    gap: SPACING.md,
  },
  legalText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
    textAlign: 'center',
  },
});

const sectionStyles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    marginBottom: SPACING.xs,
  },
});

const fieldStyles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.green900,
  },
});
