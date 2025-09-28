import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { FontText } from '../components/FontText';

const BookingConfirmationScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.success + '20' }]}>
          <Ionicons name="checkmark-circle" size={80} color={theme.colors.success} />
        </View>
        
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          {t('booking.bookingConfirmed')}
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {t('booking.confirmationMessage')}
        </Text>
        
        <View style={[styles.bookingInfo, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.bookingNumber, { color: theme.colors.textPrimary }]}>
            {t('booking.bookingNumber')}: #AL123456
          </Text>
        </View>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.buttonText, { color: theme.colors.white }]}>
            View My Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg},
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl},
  title: {
    fontSize: FontSizes.xxxl,
    textAlign: 'center',
    marginBottom: Spacing.md},
  subtitle: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24},
  bookingInfo: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl},
  bookingNumber: {
    fontSize: FontSizes.lg},
  button: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg},
  buttonText: {
    fontSize: FontSizes.lg}});

export default BookingConfirmationScreen;


