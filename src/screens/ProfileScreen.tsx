import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { useFonts } from '../hooks/useFonts';
import { FontText } from '../components/FontText';
import { useRTL } from '../utils/rtlUtils';
import { Language } from '../types';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { fontStyles } = useFonts();
  const { flexDirection } = useRTL();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
  ];

  const menuItems = [
    {
      icon: 'person-outline',
      title: t('profile.personalInfo'),
      onPress: () => {}},
    {
      icon: 'notifications-outline',
      title: t('profile.notifications'),
      onPress: () => {}},
    {
      icon: 'calendar-outline',
      title: t('profile.myBookings'),
      onPress: () => {}},
    {
      icon: 'information-circle-outline',
      title: t('profile.about'),
      onPress: () => {}},
    {
      icon: 'call-outline',
      title: t('profile.contact'),
      onPress: () => {}},
    {
      icon: 'shield-outline',
      title: t('profile.privacy'),
      onPress: () => {}},
    {
      icon: 'document-text-outline',
      title: t('profile.terms'),
      onPress: () => {}},
  ];

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
      onPress={item.onPress}
    >
      <View style={[styles.menuItemLeft, { flexDirection: flexDirection }]}>
        <Ionicons name={item.icon as any} size={24} color={theme.colors.primary} />
        <FontText 
          fontStyle="body" 
          style={[styles.menuItemText, { color: theme.colors.textPrimary }]}
        >
          {item.title}
        </FontText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.white }]}>
              <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <FontText 
                fontStyle="h2" 
                style={[styles.userName, { color: theme.colors.white }]}
              >
                {user?.name || 'User'}
              </FontText>
              <FontText 
                fontStyle="body" 
                style={[styles.userPhone, { color: theme.colors.white }]}
              >
                {user?.phone || '+213 000 000 000'}
              </FontText>
            </View>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View style={[styles.settingsSection, { backgroundColor: theme.colors.background }]}>
        {/* Language Selection */}
        <View style={[styles.settingItem, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.settingLeft, { flexDirection: flexDirection }]}>
            <Ionicons name="language-outline" size={24} color={theme.colors.primary} />
            <FontText 
              fontStyle="body" 
              style={[styles.settingText, { color: theme.colors.textPrimary }]}
            >
              {t('profile.language')}
            </FontText>
          </View>
          <View style={styles.languageButtons}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor: currentLanguage === lang.code 
                      ? theme.colors.primary 
                      : theme.colors.surface},
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View style={[styles.settingItem, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.settingLeft, { flexDirection: flexDirection }]}>
            <Ionicons 
              name={isDark ? "moon" : "sunny-outline"} 
              size={24} 
              color={theme.colors.primary} 
            />
            <FontText 
              fontStyle="body" 
              style={[styles.settingText, { color: theme.colors.textPrimary }]}
            >
              {t('profile.darkMode')}
            </FontText>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: Colors.lightGray, true: theme.colors.primary }}
            thumbColor={theme.colors.white}
          />
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map(renderMenuItem)}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[
          styles.logoutButton, 
          { 
            backgroundColor: theme.colors.error,
            flexDirection: flexDirection
          }
        ]}
        onPress={logout}
      >
        <Ionicons name="log-out-outline" size={24} color={theme.colors.white} />
        <FontText 
          fontStyle="button" 
          style={[styles.logoutText, { color: theme.colors.white }]}
        >
          {t('profile.logout')}
        </FontText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  header: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg},
  headerContent: {
    alignItems: 'center'},
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg},
  avatarText: {
    fontSize: FontSizes.xxxl},
  userDetails: {
    flex: 1},
  userName: {
    fontSize: FontSizes.xl,
    marginBottom: Spacing.xs},
  userPhone: {
    fontSize: FontSizes.md,
    opacity: 0.9},
  settingsSection: {
    marginTop: -Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl},
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg},
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1},
  settingText: {
    fontSize: FontSizes.md,
    marginLeft: Spacing.md},
  languageButtons: {
    flexDirection: 'row'},
  languageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm},
  languageFlag: {
    fontSize: 20},
  menuSection: {
    padding: Spacing.lg},
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg},
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1},
  menuItemText: {
    fontSize: FontSizes.md,
    marginLeft: Spacing.md},
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg},
  logoutText: {
    fontSize: FontSizes.lg,
    marginLeft: Spacing.sm}});

export default ProfileScreen;

