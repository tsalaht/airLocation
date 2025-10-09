import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { FontText } from '../components/FontText';

const ContactScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const openPhone = () => Linking.openURL('tel:+213555123456');
  const openEmail = () => Linking.openURL('mailto:support@airlocation.app');
  const openWhatsApp = () => Linking.openURL('https://wa.me/213555123456');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <FontText fontStyle="h2" style={[styles.headerTitle, { color: theme.colors.text }]}>
          {t('profile.contact')}
        </FontText>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.item, { backgroundColor: theme.colors.card }]}
          onPress={openPhone}
        >
          <Ionicons name="call-outline" size={22} color={theme.colors.primary} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>+213 555 123 456</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: theme.colors.card }]}
          onPress={openEmail}
        >
          <Ionicons name="mail-outline" size={22} color={theme.colors.primary} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>support@airlocation.app</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: theme.colors.card }]}
          onPress={openWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={22} color={theme.colors.primary} />
          <Text style={[styles.itemText, { color: theme.colors.text }]}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  headerTitle: { textAlign: 'left' },
  content: { padding: 16 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 12 },
  itemText: { marginLeft: 12, fontSize: 16 },
});

export default ContactScreen;


