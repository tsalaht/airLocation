import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { FontText } from '../components/FontText';

const sampleBookings = [
  { id: '1', title: 'Renault Clio 2022', date: '2025-10-20', status: 'confirmed' },
  { id: '2', title: 'Peugeot 208 2021', date: '2025-11-02', status: 'pending' },
];

const MyBookingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <FontText fontStyle="h2" style={[styles.headerTitle, { color: theme.colors.text }]}>
          {t('profile.myBookings')}
        </FontText>
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={sampleBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: theme.colors.border }]}> 
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>{item.date} • {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  headerTitle: { textAlign: 'left' },
  listContent: { padding: 16 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 16, marginBottom: 6 },
  cardSubtitle: { fontSize: 12 },
});

export default MyBookingsScreen;


