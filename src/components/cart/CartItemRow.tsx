import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { CartItem } from '../../types/cart';
import { useCart } from '../../hooks/useCart';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <View style={styles.row}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.origin}>{product.farmOrigin}</Text>
        <Text style={styles.unitPrice}>${product.pricePerUnit.toFixed(2)} / {product.unit}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.subtotal}>${(product.pricePerUnit * quantity).toFixed(2)}</Text>
        {/* Accent-outlined qty adjuster — matches noci.farm option button style */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(product.id, quantity - 1)}
          >
            <Text style={styles.qtyBtnText}>{quantity === 1 ? '×' : '−'}</Text>
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 6,
    backgroundColor: COLORS.offWhite,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.black,
    marginBottom: 2,
  },
  origin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
    marginBottom: 2,
  },
  unitPrice: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  subtotal: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 26,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  qty: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.black,
    minWidth: 20,
    textAlign: 'center',
  },
});
