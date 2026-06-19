import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { LandingScreen } from '../screens/landing/LandingScreen';
import { TabNavigator } from './TabNavigator';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { CheckoutScreen } from '../screens/checkout/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/tracking/OrderTrackingScreen';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.white },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
