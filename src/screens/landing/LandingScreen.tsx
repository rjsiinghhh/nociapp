import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { COLORS, TYPOGRAPHY } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const { height } = Dimensions.get('window');

export function LandingScreen({ navigation }: Props) {
  const wordmarkY = useRef(new Animated.Value(80)).current;
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Slide wordmark up + fade in
      Animated.parallel([
        Animated.spring(wordmarkY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 45,
          friction: 9,
        }),
        Animated.timing(wordmarkOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // 2. Short pause, then fade in tagline
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // 3. Hold
      Animated.delay(1000),
      // 4. Fade out entire screen
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Tabs');
    });
  }, []);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.center}>
        {/* Wordmark slides up */}
        <Animated.Text
          style={[
            styles.wordmark,
            {
              opacity: wordmarkOpacity,
              transform: [{ translateY: wordmarkY }],
            },
          ]}
        >
          NOCI
        </Animated.Text>

        {/* Tagline fades in beneath */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Fresh. Local. Delivered.
        </Animated.Text>
      </View>

      {/* Bottom domain — fades in with tagline */}
      <Animated.Text style={[styles.domain, { opacity: taglineOpacity }]}>
        noci.farm
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: TYPOGRAPHY.displayLg.fontFamily,
    fontSize: 72,
    color: COLORS.accent,
    letterSpacing: 2,
    lineHeight: 80,
  },
  tagline: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
    letterSpacing: 0.5,
    marginTop: 12,
  },
  domain: {
    position: 'absolute',
    bottom: 52,
    ...TYPOGRAPHY.bodySm,
    color: COLORS.lightGray,
    letterSpacing: 0.5,
  },
});
