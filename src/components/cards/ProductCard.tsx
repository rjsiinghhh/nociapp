import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const { cart, addItem, updateQuantity } = useCart();
  const cartItem = cart.items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => addItem(product, 1);
  const handleInc = () => updateQuantity(product.id, qty + 1);
  const handleDec = () => updateQuantity(product.id, qty - 1);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
        {!product.inStock && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutText}>Sold out</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.origin} numberOfLines={1}>{product.farmOrigin}</Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>${product.pricePerUnit.toFixed(2)}</Text>
            <Text style={styles.unit}>/ {product.unit}</Text>
          </View>

          {product.inStock && (
            qty === 0 ? (
              // Black "+" button matching noci.farm CTA style
              <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.8}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            ) : (
              // Inline qty adjuster
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={handleDec}>
                  <Text style={styles.qtyBtnText}>{qty === 1 ? '×' : '−'}</Text>
                </TouchableOpacity>
                <Text style={styles.qtyCount}>{qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={handleInc}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    flex: 1,
    margin: SPACING.xs,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.offWhite,
  },
  soldOutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldOutText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.midGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    padding: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.black,
    marginBottom: 2,
  },
  origin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    ...TYPOGRAPHY.price,
    color: COLORS.black,
  },
  unit: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  // Solid black add button — matches noci.farm CTA style
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
  },
  // Qty adjuster uses accent-outlined style matching noci.farm option buttons
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
  qtyCount: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.black,
    minWidth: 20,
    textAlign: 'center',
  },
});
