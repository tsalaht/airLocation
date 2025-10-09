import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FontText } from '../components/FontText';

const PersonalInfoScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <FontText fontStyle="h2" style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
          {t('profile.personalInfo')}
        </FontText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.item, { borderColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{t('profile.name')}</Text>
          <Text style={[styles.value, { color: theme.colors.textPrimary }]}>John Doe</Text>
        </View>
        <View style={[styles.item, { borderColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{t('profile.phone')}</Text>
          <Text style={[styles.value, { color: theme.colors.textPrimary }]}>+213 555 123 456</Text>
        </View>
        <View style={[styles.item, { borderColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{t('profile.email')}</Text>
          <Text style={[styles.value, { color: theme.colors.textPrimary }]}>john@example.com</Text>
        </View>

        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.primary }]}>
          <Ionicons name="create-outline" size={20} color={theme.colors.white} />
          <Text style={[styles.editText, { color: theme.colors.white }]}>{t('common.edit')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1},
  headerTitle: {
    textAlign: 'left'},
  content: {
    padding: 16},
  item: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12},
  label: {
    fontSize: 12,
    marginBottom: 6},
  value: {
    fontSize: 16},
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8},
  editText: {
    marginLeft: 8,
    fontSize: 16},
});

export default PersonalInfoScreen;


