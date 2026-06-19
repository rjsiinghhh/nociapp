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
import { Divider } from '../../components/common/Divider';

const SETTINGS = [
  { icon: '🔔', label: 'Notifications' },
  { icon: '💳', label: 'Payment methods' },
  { icon: '📍', label: 'Saved addresses' },
  { icon: '🌿', label: 'About noci' },
  { icon: '📋', label: 'Terms & privacy' },
];

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.green50} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.avatarCard}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsList}>
            {SETTINGS.map((item, i) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
                  <Text style={styles.settingsIcon}>{item.icon}</Text>
                  <Text style={styles.settingsLabel}>{item.label}</Text>
                  <Text style={styles.settingsChevron}>›</Text>
                </TouchableOpacity>
                {i < SETTINGS.length - 1 && <Divider margin={0} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={styles.missionBox}>
          <Text style={styles.missionTitle}>🌱 Our mission</Text>
          <Text style={styles.missionText}>
            noci connects you with the freshest local produce, picked up from nearby farms every
            morning and delivered straight to your door. No middlemen. Just good food from good
            people.
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
    backgroundColor: COLORS.green50,
  },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  header: {
    paddingTop: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.headingLg,
    color: COLORS.green900,
  },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: SPACING.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.green700,
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
    color: COLORS.green900,
  },
  userEmail: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray400,
  },
  editBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.green700,
  },
  editBtnText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.green700,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.green900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  settingsIcon: {
    fontSize: 20,
  },
  settingsLabel: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.green900,
    flex: 1,
  },
  settingsChevron: {
    fontSize: 20,
    color: COLORS.gray400,
  },
  missionBox: {
    backgroundColor: COLORS.green50,
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.green200,
    gap: SPACING.sm,
  },
  missionTitle: {
    ...TYPOGRAPHY.headingSm,
    color: COLORS.green900,
  },
  missionText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.gray600,
    lineHeight: 22,
  },
  signOutBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  signOutText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.error,
  },
});
