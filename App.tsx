import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { CartProvider } from './src/context/CartContext';
import { RootNavigator } from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    // SK Glypher — display / headlines (matches noci.farm hero text)
    'SKGlypher-Regular': require('./assets/fonts/SKGlypher-Regular.ttf'),
    'SKGlypher-Medium':  require('./assets/fonts/SKGlypher-Medium.ttf'),
    'SKGlypher-Bold':    require('./assets/fonts/SKGlypher-Bold.ttf'),
    'SKGlypher-Heavy':   require('./assets/fonts/SKGlypher-Heavy.ttf'),
    // Now — body / UI text (matches noci.farm body font)
    'Now-Regular':  require('./assets/fonts/Now-Regular.ttf'),
    'Now-Medium':   require('./assets/fonts/Now-Medium.ttf'),
    'Now-SemiBold': require('./assets/fonts/Now-SemiBold.ttf'),
    'Now-Bold':     require('./assets/fonts/Now-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
