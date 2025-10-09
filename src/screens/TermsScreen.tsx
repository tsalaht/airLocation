import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { FontText } from '../components/FontText';

const TermsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <FontText fontStyle="h2" style={[styles.headerTitle, { color: theme.colors.text }]}>
          {t('profile.terms')}
        </FontText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          These are placeholder Terms of Service. Replace with your legal terms.
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          By using this app, you agree to comply with these terms.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  headerTitle: { textAlign: 'left' },
  content: { padding: 16 },
  paragraph: { fontSize: 14, lineHeight: 22, marginBottom: 12 },
});

export default TermsScreen;


