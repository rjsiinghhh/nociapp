import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

const SETTINGS = [
  { icon: '🔔', label: 'Notifications' },
  { icon: '💳', label: 'Payment methods' },
  { icon: '📍', label: 'Saved addresses' },
  { icon: '○', label: 'About noci' },
  { icon: '📋', label: 'Terms & privacy' },
];

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Profile</Text>

        {/* User card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>RJ</Text>
            <Text style={styles.userEmail}>rj@noci.farm</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.settingsList}>
          {SETTINGS.map((item, i) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
                <Text style={styles.settingsIcon}>{item.icon}</Text>
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {i < SETTINGS.length - 1 && <View style={styles.rowDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Mission */}
        <View style={styles.missionBox}>
          <Text style={styles.missionHeading}>noci.</Text>
          <Text style={styles.missionText}>
            Picked up from nearby farms each morning, delivered to your door. No middlemen — just
            good food from good people.
          </Text>
        </View>

        <TouchableOpacity style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  title: {
    fontFamily: TYPOGRAPHY.displaySm.fontFamily,
    fontSize: 34,
    color: COLORS.black,
    paddingTop: SPACING.sm,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    borderRadius: 8,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.headingLg,
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.headingMd,
    color: COLORS.black,
  },
  userEmail: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
  },
  editBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.xLightGray,
  },
  editBtnText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.midGray,
  },
  sectionLabel: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  settingsList: {
    borderWidth: 1,
    borderColor: COLORS.xLightGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  settingsIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  settingsLabel: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.black,
    flex: 1,
  },
  chevron: {
    fontSize: 18,
    color: COLORS.lightGray,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.xLightGray,
    marginLeft: SPACING.lg + 24 + SPACING.md,
  },
  missionBox: {
    borderTopWidth: 1,
    borderTopColor: COLORS.xLightGray,
    paddingTop: SPACING.lg,
    gap: SPACING.sm,
  },
  missionHeading: {
    fontFamily: TYPOGRAPHY.displaySm.fontFamily,
    fontSize: 28,
    color: COLORS.accent,
  },
  missionText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
    lineHeight: 22,
  },
  signOutBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  signOutText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.midGray,
  },
});
