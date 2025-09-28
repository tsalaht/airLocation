import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { FontText } from '../components/FontText';

const AboutScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const contactMethods = [
    {
      icon: 'call-outline',
      title: t('about.phone'),
      value: '+213 123 456 789',
      onPress: () => Linking.openURL('tel:+213123456789')},
    {
      icon: 'mail-outline',
      title: t('about.email'),
      value: 'contact@airlocation.dz',
      onPress: () => Linking.openURL('mailto:contact@airlocation.dz')},
    {
      icon: 'logo-whatsapp',
      title: t('about.whatsapp'),
      value: '+213 123 456 789',
      onPress: () => Linking.openURL('https://wa.me/213123456789')},
    {
      icon: 'location-outline',
      title: t('about.address'),
      value: 'Algiers, Algeria',
      onPress: () => {}},
  ];

  const renderContactMethod = (method: typeof contactMethods[0], index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.contactItem, { backgroundColor: theme.colors.card }]}
      onPress={method.onPress}
    >
      <View style={[styles.contactIcon, { backgroundColor: theme.colors.primary + '20' }]}>
        <Ionicons name={method.icon as any} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactTitle, { color: theme.colors.textPrimary }]}>
          {method.title}
        </Text>
        <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
          {method.value}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
          {t('about.title')}
        </Text>
      </View>

      {/* Content */}
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        {/* Logo and Description */}
        <View style={[styles.logoSection, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.logoText, { color: theme.colors.white }]}>
              AL
            </Text>
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {t('about.description')}
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            {t('about.contact')}
          </Text>
          {contactMethods.map(renderContactMethod)}
        </View>

        {/* App Info */}
        <View style={[styles.appInfo, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.appInfoTitle, { color: theme.colors.textPrimary }]}>
            AirLocation v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: theme.colors.textSecondary }]}>
            Made with ❤️ in Algeria
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  header: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg},
  headerTitle: {
    fontSize: FontSizes.xxl},
  content: {
    flex: 1,
    marginTop: -Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl},
  logoSection: {
    alignItems: 'center',
    padding: Spacing.xl,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg},
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg},
  logoText: {
    fontSize: FontSizes.xxxl},
  description: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22},
  contactSection: {
    padding: Spacing.lg},
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.lg},
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg},
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md},
  contactInfo: {
    flex: 1},
  contactTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  contactValue: {
    fontSize: FontSizes.sm},
  appInfo: {
    alignItems: 'center',
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg},
  appInfoTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  appInfoText: {
    fontSize: FontSizes.sm}});

export default AboutScreen;


