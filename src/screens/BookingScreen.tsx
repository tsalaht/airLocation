import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { Car } from '../types';
import { FontText } from '../components/FontText';

const { width } = Dimensions.get('window');

// Mock car data with real images
const mockCar: Car = {
  id: '1',
  brand: 'Toyota',
  model: 'Camry',
  year: 2022,
  pricePerDay: 150,
  pricePerWeek: 900,
  images: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  ],
  description: 'Comfortable and reliable sedan perfect for city driving and long trips. Features modern amenities and excellent fuel efficiency.',
  mileage: 15000,
  gearbox: 'automatic',
  fuelType: 'gasoline',
  category: 'sedan',
  availability: 'available',
  condition: 'good',
  features: ['AC', 'Bluetooth', 'GPS', 'Backup Camera', 'Cruise Control', 'Leather Seats'],
  location: {
    city: 'Algiers',
    address: 'Downtown, Near Central Station',
    coordinates: { latitude: 36.7538, longitude: 3.0588 }},
  owner: { id: '1', name: 'Ahmed Benali', rating: 4.5 },
  rating: 4.5,
  reviewCount: 25};

const BookingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [car] = useState<Car>(mockCar);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const calculateTotalDays = () => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * car.pricePerDay;
  };

  const handleBooking = () => {
    if (!pickupDate || !returnDate || !pickupLocation || !dropoffLocation) {
      Alert.alert(t('common.error'), 'Please fill in all required fields');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert(t('common.error'), 'Please fill in all payment details');
      return;
    }

    // Simulate booking process
    Alert.alert(
      t('booking.bookingConfirmed'),
      t('booking.confirmationMessage'),
      [
        {
          text: t('common.confirm'),
          onPress: () => {
            // Navigate to confirmation screen
          }},
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
            {t('booking.title')}
          </Text>
        </View>
      </View>

      {/* Car Summary */}
      <View style={[styles.carSummary, { backgroundColor: theme.colors.card }]}>
        <Image source={{ uri: car.images[0] }} style={styles.carImage} />
        <View style={styles.carInfo}>
          <Text style={[styles.carTitle, { color: theme.colors.textPrimary }]}>
            {car.brand} {car.model}
          </Text>
          <Text style={[styles.carYear, { color: theme.colors.textSecondary }]}>
            {car.year} • {car.mileage.toLocaleString()} km • {car.gearbox}
          </Text>
          <View style={styles.carFeatures}>
            {car.features.slice(0, 3).map((feature, index) => (
              <View key={index} style={[styles.featureTag, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={Colors.warning} />
            <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
              {car.rating} ({car.reviewCount} reviews)
            </Text>
          </View>
        </View>
        <View style={styles.carPrice}>
          <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
            {t('car.pricePerDay')}
          </Text>
          <Text style={[styles.priceValue, { color: theme.colors.primary }]}>
            {car.pricePerDay} DA
          </Text>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          {t('booking.title')}
        </Text>

        {/* Dates */}
        <View style={styles.datesContainer}>
          <View style={styles.dateInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.pickupDate')}
            </Text>
            <TouchableOpacity style={[styles.dateButton, { backgroundColor: theme.colors.surface }]}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.dateText, { color: theme.colors.textPrimary }]}>
                {pickupDate || 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.returnDate')}
            </Text>
            <TouchableOpacity style={[styles.dateButton, { backgroundColor: theme.colors.surface }]}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
              <Text style={[styles.dateText, { color: theme.colors.textPrimary }]}>
                {returnDate || 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.locationsContainer}>
          <View style={styles.locationInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.pickupLocation')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border},
              ]}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="Enter pickup location"
              placeholderTextColor={theme.colors.textLight}
            />
          </View>

          <View style={styles.locationInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.dropoffLocation')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border},
              ]}
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
              placeholder="Enter dropoff location"
              placeholderTextColor={theme.colors.textLight}
            />
          </View>
        </View>
      </View>

      {/* Price Summary */}
      <View style={[styles.priceSummary, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Price Summary
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
            {t('booking.pricePerDay')}
          </Text>
          <Text style={[styles.priceValue, { color: theme.colors.textPrimary }]}>
            {car.pricePerDay} DA
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
            {t('booking.totalDays')}
          </Text>
          <Text style={[styles.priceValue, { color: theme.colors.textPrimary }]}>
            {calculateTotalDays()} days
          </Text>
        </View>

        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, { color: theme.colors.textPrimary }]}>
            {t('booking.totalPrice')}
          </Text>
          <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
            {calculateTotalPrice()} DA
          </Text>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          {t('booking.payment')}
        </Text>

        <View style={styles.paymentContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
            {t('booking.cardNumber')}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
                borderColor: theme.colors.border},
            ]}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={theme.colors.textLight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.paymentRow}>
          <View style={styles.paymentInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.expiryDate')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border},
              ]}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
              placeholderTextColor={theme.colors.textLight}
            />
          </View>

          <View style={styles.paymentInput}>
            <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
              {t('booking.cvv')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border},
              ]}
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
              placeholderTextColor={theme.colors.textLight}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={[styles.inputLabel, { color: theme.colors.textPrimary }]}>
            {t('booking.cardholderName')}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
                borderColor: theme.colors.border},
            ]}
            value={cardholderName}
            onChangeText={setCardholderName}
            placeholder="John Doe"
            placeholderTextColor={theme.colors.textLight}
          />
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.confirmButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleBooking}
      >
        <Text style={[styles.confirmButtonText, { color: theme.colors.white }]}>
          {t('booking.confirmBooking')}
        </Text>
      </TouchableOpacity>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'},
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: Spacing.md},
  headerTitle: {
    fontSize: FontSizes.xxl,
    flex: 1},
  carSummary: {
    flexDirection: 'row',
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  carImage: {
    width: 80,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md},
  carInfo: {
    flex: 1},
  carTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.xs},
  carYear: {
    fontSize: FontSizes.sm},
  carPrice: {
    alignItems: 'flex-end'},
  priceLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  priceValue: {
    fontSize: FontSizes.lg},
  section: {
    padding: Spacing.lg},
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.lg},
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg},
  dateInput: {
    flex: 1,
    marginHorizontal: Spacing.xs},
  inputLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm},
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg},
  dateText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md},
  locationsContainer: {
    marginBottom: Spacing.lg},
  locationInput: {
    marginBottom: Spacing.md},
  textInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md},
  priceSummary: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg},
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm},
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    marginTop: Spacing.sm},
  totalLabel: {
    fontSize: FontSizes.lg},
  totalValue: {
    fontSize: FontSizes.xl},
  paymentContainer: {
    marginBottom: Spacing.md},
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'},
  paymentInput: {
    flex: 1,
    marginHorizontal: Spacing.xs},
  confirmButton: {
    margin: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center'},
  confirmButtonText: {
    fontSize: FontSizes.lg},
  carFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm},
  featureTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs},
  featureText: {
    fontSize: FontSizes.xs},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'},
  ratingText: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs}});

export default BookingScreen;


