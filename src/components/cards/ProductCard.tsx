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

  const handleAdd = (e: any) => {
    e.stopPropagation?.();
    addItem(product, 1);
  };

  const handleInc = (e: any) => {
    e.stopPropagation?.();
    updateQuantity(product.id, qty + 1);
  };

  const handleDec = (e: any) => {
    e.stopPropagation?.();
    updateQuantity(product.id, qty - 1);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
        {!product.inStock && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutText}>Sold Out</Text>
          </View>
        )}
        {product.badges.includes('organic') && (
          <View style={styles.organicBadge}>
            <Text style={styles.organicText}>🌿 Organic</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.origin} numberOfLines={1}>{product.farmOrigin}</Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>${product.pricePerUnit.toFixed(2)}</Text>
            <Text style={styles.unit}>per {product.unit}</Text>
          </View>

          {product.inStock && (
            qty === 0 ? (
              <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.8}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={handleDec}>
                  <Text style={styles.qtyBtnText}>−</Text>
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
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flex: 1,
    margin: SPACING.xs,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.gray100,
  },
  soldOutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldOutText: {
    color: COLORS.white,
    ...TYPOGRAPHY.labelLg,
  },
  organicBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.green700,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  organicText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  info: {
    padding: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
    marginBottom: 2,
  },
  origin: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    ...TYPOGRAPHY.price,
    color: COLORS.green700,
  },
  unit: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.earth700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '500',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green50,
    borderRadius: 10,
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
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
  qtyCount: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.green900,
    minWidth: 22,
    textAlign: 'center',
  },
});
