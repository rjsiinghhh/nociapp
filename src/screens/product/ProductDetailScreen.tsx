import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { PRODUCTS } from '../../data/products';
import { Badge } from '../../components/common/Badge';
import { QuantitySelector } from '../../components/product/QuantitySelector';
import { Button } from '../../components/common/Button';
import { useCart } from '../../hooks/useCart';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem, cart, updateQuantity } = useCart();

  const cartItem = cart.items.find((i) => i.product.id === productId);
  const [qty, setQty] = useState(cartItem?.quantity ?? 1);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product.id, qty);
    } else {
      addItem(product, qty);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Full-width product image */}
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          {/* Two-column row: meta on left, big product name on right (mirrors noci.farm layout) */}
          <View style={styles.topRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>From</Text>
              <Text style={styles.metaValue}>{product.farmOrigin}</Text>

              <Text style={[styles.metaLabel, { marginTop: SPACING.md }]}>Unit</Text>
              <Text style={styles.metaValue}>{product.unit}</Text>

              {product.badges.length > 0 && (
                <>
                  <Text style={[styles.metaLabel, { marginTop: SPACING.md }]}>Tags</Text>
                  <View style={styles.badges}>
                    {product.badges.map((b) => <Badge key={b} type={b} />)}
                  </View>
                </>
              )}
            </View>

            <View style={styles.nameCol}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Low stock warning in accent color */}
          {product.stockCount !== undefined && product.stockCount <= 5 && product.inStock && (
            <Text style={styles.lowStock}>Only {product.stockCount} left today.</Text>
          )}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Sticky footer: price + qty + Add to Cart */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <Text style={styles.price}>${product.pricePerUnit.toFixed(2)}</Text>
          <Text style={styles.unit}>per {product.unit}</Text>
        </View>

        <View style={styles.footerActions}>
          <QuantitySelector
            quantity={qty}
            onIncrement={() => setQty((q) => q + 1)}
            onDecrement={() => setQty((q) => Math.max(1, q - 1))}
            min={1}
            max={product.stockCount ?? 99}
          />
          <View style={styles.addBtnWrapper}>
            <Button
              label={`Add to Cart · $${(product.pricePerUnit * qty).toFixed(2)}`}
              onPress={handleAddToCart}
              disabled={!product.inStock}
              fullWidth
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navBar: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.black,
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.offWhite,
  },
  body: {
    padding: SPACING.lg,
  },
  topRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.xLightGray,
  },
  metaCol: {
    width: 110,
  },
  metaLabel: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValue: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.darkGray,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  nameCol: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  productName: {
    ...TYPOGRAPHY.headingLg,
    fontSize: 28,
    color: COLORS.black,
    lineHeight: 34,
  },
  description: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.darkGray,
    lineHeight: 26,
    marginBottom: SPACING.md,
  },
  lowStock: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.accent,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.xLightGray,
    backgroundColor: COLORS.white,
    gap: SPACING.md,
  },
  footerTop: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.price,
    fontSize: 22,
    color: COLORS.black,
  },
  unit: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.midGray,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  addBtnWrapper: {
    flex: 1,
  },
  notFound: {
    padding: SPACING.xl,
    color: COLORS.midGray,
  },
});
