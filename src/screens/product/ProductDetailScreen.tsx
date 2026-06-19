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
        <Text style={styles.notFound}>Product not found</Text>
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

  const subtotal = (product.pricePerUnit * qty).toFixed(2);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{product.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.origin}>From {product.farmOrigin}</Text>

          <View style={styles.badgeRow}>
            {product.badges.map((b) => (
              <Badge key={b} type={b} />
            ))}
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {product.stockCount !== undefined && product.stockCount <= 5 && product.inStock && (
            <View style={styles.lowStockBanner}>
              <Text style={styles.lowStockText}>
                ⚡ Only {product.stockCount} left today
              </Text>
            </View>
          )}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.price}>${product.pricePerUnit.toFixed(2)}</Text>
          <Text style={styles.unit}>per {product.unit}</Text>
        </View>

        <QuantitySelector
          quantity={qty}
          onIncrement={() => setQty((q) => q + 1)}
          onDecrement={() => setQty((q) => Math.max(1, q - 1))}
          min={1}
          max={product.stockCount ?? 99}
        />

        <Button
          label={`Add · $${subtotal}`}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray200,
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.sm,
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: COLORS.gray100,
  },
  body: {
    padding: SPACING.lg,
  },
  name: {
    ...TYPOGRAPHY.headingLg,
    color: COLORS.green900,
    marginBottom: SPACING.xs,
  },
  origin: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray400,
    marginBottom: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  description: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.gray600,
    lineHeight: 26,
  },
  lowStockBanner: {
    backgroundColor: COLORS.earth100,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.lg,
  },
  lowStockText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.earth700,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray200,
    backgroundColor: COLORS.white,
  },
  footerLeft: {
    marginRight: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.price,
    color: COLORS.green700,
  },
  unit: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.gray400,
  },
  notFound: {
    padding: SPACING.xl,
    color: COLORS.gray400,
  },
});
