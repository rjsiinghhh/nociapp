import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { CartItem } from '../../types/cart';
import { useCart } from '../../hooks/useCart';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <View style={styles.row}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.origin}>{product.farmOrigin}</Text>
        <Text style={styles.unitPrice}>${product.pricePerUnit.toFixed(2)} / {product.unit}</Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.subtotal}>${(product.pricePerUnit * quantity).toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(product.id, quantity - 1)}
          >
            <Text style={styles.qtyBtnText}>{quantity === 1 ? '🗑' : '−'}</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(product.id, quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: COLORS.gray100,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    marginBottom: 2,
  },
  origin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
    marginBottom: 2,
  },
  unitPrice: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray600,
  },
  controls: {
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  subtotal: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.green700,
    marginBottom: SPACING.sm,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.green200,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: COLORS.green700,
    fontSize: 15,
    fontWeight: '600',
  },
  qty: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.green900,
    minWidth: 20,
    textAlign: 'center',
  },
});
