import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { useFonts } from '../hooks/useFonts';
import { FontText } from '../components/FontText';
import { useRTL } from '../utils/rtlUtils';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

// Mock data with real car images - Enhanced with more cars
const featuredCars: Car[] = [
  {
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
    features: ['AC', 'Bluetooth', 'GPS', 'Backup Camera', 'Cruise Control'],
    location: {
      city: 'Algiers',
      address: 'Downtown, Near Central Station',
      coordinates: { latitude: 36.7538, longitude: 3.0588 }},
    owner: { id: '1', name: 'Ahmed Benali', rating: 4.5 },
    rating: 4.5,
    reviewCount: 25},
  {
    id: '2',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    pricePerDay: 300,
    pricePerWeek: 1800,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Luxury SUV with premium features, perfect for family trips and business travel. Includes all modern amenities.',
    mileage: 5000,
    gearbox: 'automatic',
    fuelType: 'gasoline',
    category: 'suv',
    availability: 'available',
    condition: 'new',
    features: ['AC', 'Bluetooth', 'GPS', 'Leather Seats', 'Sunroof', 'Navigation'],
    location: {
      city: 'Algiers',
      address: 'Airport Terminal',
      coordinates: { latitude: 36.7538, longitude: 3.0588 }},
    owner: { id: '2', name: 'Fatima Zohra', rating: 4.8 },
    rating: 4.8,
    reviewCount: 12},
  {
    id: '3',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2021,
    pricePerDay: 250,
    pricePerWeek: 1500,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Elegant luxury sedan with premium interior and advanced safety features. Perfect for business and special occasions.',
    mileage: 12000,
    gearbox: 'automatic',
    fuelType: 'gasoline',
    category: 'luxury',
    availability: 'available',
    condition: 'good',
    features: ['AC', 'Bluetooth', 'GPS', 'Leather Seats', 'Premium Audio', 'Heated Seats'],
    location: {
      city: 'Oran',
      address: 'City Center',
      coordinates: { latitude: 35.6969, longitude: -0.6331 }},
    owner: { id: '3', name: 'Omar Cherif', rating: 4.7 },
    rating: 4.7,
    reviewCount: 18},
  {
    id: '4',
    brand: 'Renault',
    model: 'Clio',
    year: 2020,
    pricePerDay: 80,
    pricePerWeek: 480,
    images: [
      'https://images.unsplash.com/photo-1549317331-3f43a5a0a1f0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Economical and efficient compact car, perfect for city driving. Great fuel economy and easy to park.',
    mileage: 25000,
    gearbox: 'manual',
    fuelType: 'gasoline',
    category: 'economy',
    availability: 'available',
    condition: 'good',
    features: ['AC', 'Bluetooth', 'Radio'],
    location: {
      city: 'Constantine',
      address: 'University Area',
      coordinates: { latitude: 36.3650, longitude: 6.6147 }},
    owner: { id: '4', name: 'Yasmine Khelil', rating: 4.2 },
    rating: 4.2,
    reviewCount: 15},
  {
    id: '5',
    brand: 'Audi',
    model: 'A4',
    year: 2022,
    pricePerDay: 200,
    pricePerWeek: 1200,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Premium sedan with advanced technology and sporty performance. Perfect for business professionals.',
    mileage: 8000,
    gearbox: 'automatic',
    fuelType: 'gasoline',
    category: 'luxury',
    availability: 'available',
    condition: 'new',
    features: ['AC', 'Bluetooth', 'GPS', 'Leather Seats', 'Premium Audio', 'Sport Mode'],
    location: {
      city: 'Algiers',
      address: 'Business District',
      coordinates: { latitude: 36.7538, longitude: 3.0588 }},
    owner: { id: '5', name: 'Karim Boudjema', rating: 4.9 },
    rating: 4.9,
    reviewCount: 8},
  {
    id: '6',
    brand: 'Peugeot',
    model: '208',
    year: 2021,
    pricePerDay: 90,
    pricePerWeek: 540,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Modern compact car with great fuel efficiency and stylish design. Perfect for young professionals.',
    mileage: 18000,
    gearbox: 'manual',
    fuelType: 'gasoline',
    category: 'compact',
    availability: 'available',
    condition: 'good',
    features: ['AC', 'Bluetooth', 'Radio', 'USB Port'],
    location: {
      city: 'Annaba',
      address: 'Port Area',
      coordinates: { latitude: 36.9000, longitude: 7.7500 }},
    owner: { id: '6', name: 'Nour El Houda', rating: 4.3 },
    rating: 4.3,
    reviewCount: 22},
  {
    id: '7',
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    pricePerDay: 120,
    pricePerWeek: 720,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Reliable and comfortable sedan with modern features and excellent value for money. Great for daily commuting.',
    mileage: 20000,
    gearbox: 'automatic',
    fuelType: 'gasoline',
    category: 'sedan',
    availability: 'available',
    condition: 'good',
    features: ['AC', 'Bluetooth', 'GPS', 'Backup Camera', 'USB Port'],
    location: {
      city: 'Blida',
      address: 'Industrial Zone',
      coordinates: { latitude: 36.4700, longitude: 2.8300 }},
    owner: { id: '7', name: 'Mohamed Amine', rating: 4.4 },
    rating: 4.4,
    reviewCount: 30},
  {
    id: '8',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    pricePerDay: 180,
    pricePerWeek: 1080,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    description: 'Sporty and efficient hatchback with premium build quality. Perfect for urban driving and weekend trips.',
    mileage: 10000,
    gearbox: 'automatic',
    fuelType: 'gasoline',
    category: 'compact',
    availability: 'available',
    condition: 'good',
    features: ['AC', 'Bluetooth', 'GPS', 'Leather Seats', 'Sport Mode', 'USB Port'],
    location: {
      city: 'Tizi Ouzou',
      address: 'University Campus',
      coordinates: { latitude: 36.7167, longitude: 4.0500 }},
    owner: { id: '8', name: 'Lila Boukhelifa', rating: 4.6 },
    rating: 4.6,
    reviewCount: 14},
];

const categories = [
  { id: 'economy', name: 'Economy', icon: 'car-outline', color: Colors.primary },
  { id: 'compact', name: 'Compact', icon: 'car-sport-outline', color: Colors.secondary },
  { id: 'sedan', name: 'Sedan', icon: 'car-outline', color: Colors.success },
  { id: 'suv', name: 'SUV', icon: 'car-sport-outline', color: Colors.warning },
  { id: 'luxury', name: 'Luxury', icon: 'diamond-outline', color: Colors.error },
  { id: 'sports', name: 'Sports', icon: 'flash-outline', color: Colors.info },
];

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const { fontStyles } = useFonts();
  const { flexDirection } = useRTL();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupDateObj, setPickupDateObj] = useState<Date | undefined>(undefined);
  const [returnDateObj, setReturnDateObj] = useState<Date | undefined>(undefined);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const formatDate = (date: Date) => {
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredCars = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesQuery = (car: Car) => {
      if (!normalizedQuery) return true;
      const haystack = [
        car.brand,
        car.model,
        String(car.year),
        car.category,
        car.location?.city,
        car.location?.address,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    };

    // Date filtering placeholder: ensure valid range if both selected.
    const validDateRange = !pickupDateObj || !returnDateObj || pickupDateObj <= returnDateObj;

    return validDateRange ? featuredCars.filter(matchesQuery) : [];
  }, [searchQuery, pickupDateObj, returnDateObj]);

  const renderFeaturedCar = ({ item }: { item: Car }) => (
    <TouchableOpacity 
      style={[styles.carCard, { backgroundColor: theme.colors.card }]}
      onPress={() => (navigation as any).navigate('CarDetails', { car: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <FontText 
          fontStyle="h3" 
          style={[styles.carTitle, { color: theme.colors.textPrimary }]}
        >
          {item.brand} {item.model}
        </FontText>
        <FontText 
          fontStyle="caption" 
          style={[styles.carYear, { color: theme.colors.textSecondary }]}
        >
          {item.year}
        </FontText>
        <View style={styles.carRating}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <FontText 
            fontStyle="caption" 
            style={[styles.ratingText, { color: theme.colors.textSecondary }]}
          >
            {item.rating} ({item.reviewCount})
          </FontText>
        </View>
        <FontText 
          fontStyle="button" 
          style={[styles.carPrice, { color: theme.colors.primary }]}
        >
          {item.pricePerDay} DA {t('car.pricePerDay')}
        </FontText>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <FontText 
        fontStyle="body" 
        style={[styles.categoryText, { color: theme.colors.textPrimary }]}
      >
        {t(`home.${item.id}`)}
      </FontText>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={{alignItems: 'center',justifyContent: 'center',width: 50,height: 50,backgroundColor: theme.colors.white,borderRadius: 99999,marginRight: Spacing.md}}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
            </View>
     
            <View style={styles.headerText}>
              <FontText 
                fontStyle="h1" 
                style={[styles.greeting, { color: theme.colors.white }]}
              >
                {t('home.title')}
              </FontText>
              <FontText 
                fontStyle="body" 
                style={[styles.subtitle, { color: theme.colors.white }]}
              >
                Find your perfect ride
              </FontText>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={[styles.searchSection, { backgroundColor: theme.colors.background }]}>
        {/* <View style={[
          styles.searchContainer, 
          { 
            backgroundColor: theme.colors.surface,
            flexDirection: flexDirection
          }
        ]}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[
              styles.searchInput, 
              { 
                color: theme.colors.textPrimary,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View> */}

        <View style={[styles.dateContainer, { flexDirection: flexDirection }]}>
          <TouchableOpacity style={[
            styles.dateButton, 
            { 
              backgroundColor: theme.colors.surface,
              flexDirection: flexDirection
            }
          ]}
          onPress={() => setShowPickupPicker(true)}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.primary} />
            <FontText 
              fontStyle="body" 
              style={[styles.dateText, { color: theme.colors.textPrimary }]}
            >
              {pickupDate || t('home.pickupDate')}
            </FontText>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.dateButton, 
            { 
              backgroundColor: theme.colors.surface,
              flexDirection: flexDirection
            }
          ]}
          onPress={() => setShowReturnPicker(true)}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.primary} />
            <FontText 
              fontStyle="body" 
              style={[styles.dateText, { color: theme.colors.textPrimary }]}
            >
              {returnDate || t('home.returnDate')}
            </FontText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <FontText 
          fontStyle="h2" 
          style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
        >
          {t('home.categories')}
        </FontText>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Featured Cars */}
      <View style={styles.section}>
        <View style={[styles.sectionHeader, { flexDirection: flexDirection }]}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            {t('home.featuredCars')}
          </FontText>
          <TouchableOpacity>
            <FontText 
              fontStyle="button" 
              style={[styles.seeAllText, { color: theme.colors.primary }]}
            >
              {t('home.seeAll')}
            </FontText>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredCars}
          renderItem={renderFeaturedCar}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carsList}
        />
      </View>

      {/* Company Statistics */}
      <View style={[styles.statsSection, { backgroundColor: theme.colors.surface }]}>
        <FontText 
          fontStyle="h2" 
          style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
        >
          Why Choose AirLocation?
        </FontText>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <FontText 
              fontStyle="h1" 
              style={[styles.statNumber, { color: theme.colors.primary }]}
            >
              500+
            </FontText>
            <FontText 
              fontStyle="caption" 
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Cars Available
            </FontText>
          </View>
          <View style={styles.statItem}>
            <FontText 
              fontStyle="h1" 
              style={[styles.statNumber, { color: theme.colors.primary }]}
            >
              10K+
            </FontText>
            <FontText 
              fontStyle="caption" 
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Happy Customers
            </FontText>
          </View>
          <View style={styles.statItem}>
            <FontText 
              fontStyle="h1" 
              style={[styles.statNumber, { color: theme.colors.primary }]}
            >
              50+
            </FontText>
            <FontText 
              fontStyle="caption" 
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Cities Covered
            </FontText>
          </View>
          <View style={styles.statItem}>
            <FontText 
              fontStyle="h1" 
              style={[styles.statNumber, { color: theme.colors.primary }]}
            >
              4.8★
            </FontText>
            <FontText 
              fontStyle="caption" 
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Average Rating
            </FontText>
          </View>
        </View>
      </View>

      {/* Company Features */}
      <View style={styles.section}>
        <FontText 
          fontStyle="h2" 
          style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
        >
          Our Services
        </FontText>
        <View style={styles.featuresGrid}>
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="shield-checkmark" size={32} color={theme.colors.primary} />
            <FontText 
              fontStyle="h3" 
              style={[styles.featureTitle, { color: theme.colors.textPrimary }]}
            >
              Safe & Secure
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.featureDescription, { color: theme.colors.textSecondary }]}
            >
              All cars are verified and insured for your peace of mind
            </FontText>
          </View>
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="time" size={32} color={theme.colors.primary} />
            <FontText 
              fontStyle="h3" 
              style={[styles.featureTitle, { color: theme.colors.textPrimary }]}
            >
              24/7 Support
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.featureDescription, { color: theme.colors.textSecondary }]}
            >
              Round-the-clock customer support for all your needs
            </FontText>
          </View>
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="card" size={32} color={theme.colors.primary} />
            <FontText 
              fontStyle="h3" 
              style={[styles.featureTitle, { color: theme.colors.textPrimary }]}
            >
              Easy Payment
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.featureDescription, { color: theme.colors.textSecondary }]}
            >
              Multiple payment options with secure transactions
            </FontText>
          </View>
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="location" size={32} color={theme.colors.primary} />
            <FontText 
              fontStyle="h3" 
              style={[styles.featureTitle, { color: theme.colors.textPrimary }]}
            >
              Wide Coverage
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.featureDescription, { color: theme.colors.textSecondary }]}
            >
              Available in major cities across Algeria
            </FontText>
          </View>
        </View>
      </View>

      {/* Recent Reviews */}
      <View style={styles.section}>
        <FontText 
          fontStyle="h2" 
          style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
        >
          What Our Customers Say
        </FontText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewsContainer}>
          <View style={[styles.reviewCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.reviewHeader}>
              <View style={[styles.reviewerAvatar, { backgroundColor: theme.colors.primary }]}>
                <FontText 
                  fontStyle="button" 
                  style={[styles.reviewerInitial, { color: theme.colors.white }]}
                >
                  A
                </FontText>
              </View>
              <View style={styles.reviewerInfo}>
                <FontText 
                  fontStyle="body" 
                  style={[styles.reviewerName, { color: theme.colors.textPrimary }]}
                >
                  Ahmed Benali
                </FontText>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                </View>
              </View>
            </View>
            <FontText 
              fontStyle="body" 
              style={[styles.reviewText, { color: theme.colors.textSecondary }]}
            >
              "Excellent service! The car was clean and exactly as described. Very easy booking process."
            </FontText>
          </View>
          
          <View style={[styles.reviewCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.reviewHeader}>
              <View style={[styles.reviewerAvatar, { backgroundColor: theme.colors.secondary }]}>
                <FontText 
                  fontStyle="button" 
                  style={[styles.reviewerInitial, { color: theme.colors.white }]}
                >
                  F
                </FontText>
              </View>
              <View style={styles.reviewerInfo}>
                <FontText 
                  fontStyle="body" 
                  style={[styles.reviewerName, { color: theme.colors.textPrimary }]}
                >
                  Fatima Zohra
                </FontText>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                  <Ionicons name="star" size={16} color={Colors.warning} />
                </View>
              </View>
            </View>
            <FontText 
              fontStyle="body" 
              style={[styles.reviewText, { color: theme.colors.textSecondary }]}
            >
              "Great experience! The owner was very helpful and the car was perfect for our family trip."
            </FontText>
          </View>
        </ScrollView>
      </View>
      {/* Date Pickers */}
      {showPickupPicker && (
        <DateTimePicker
          value={pickupDateObj ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            if (Platform.OS !== 'ios') setShowPickupPicker(false);
            if (selectedDate) {
              setPickupDateObj(selectedDate);
              setPickupDate(formatDate(selectedDate));
              // Reset return if it is before pickup
              if (returnDateObj && selectedDate > returnDateObj) {
                setReturnDateObj(undefined);
                setReturnDate('');
              }
            }
          }}
        />
      )}
      {showReturnPicker && (
        <DateTimePicker
          value={returnDateObj ?? (pickupDateObj ? pickupDateObj : new Date())}
          mode="date"
          minimumDate={pickupDateObj}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            if (Platform.OS !== 'ios') setShowReturnPicker(false);
            if (selectedDate) {
              setReturnDateObj(selectedDate);
              setReturnDate(formatDate(selectedDate));
            }
          }}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center'},
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1},
  headerLogo: {
    width: 40,
    height: 40,
},
  headerText: {
    flex: 1},
  greeting: {
    fontSize: FontSizes.xxl},
  subtitle: {
    fontSize: FontSizes.md,
    opacity: 0.9},
  notificationButton: {
    padding: Spacing.sm},
  searchSection: {
    padding: Spacing.lg,
    marginTop: -Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md},
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md},
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'},
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.xs},
  dateText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm},
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md},
  sectionTitle: {
    fontSize: FontSizes.xl},
  seeAllText: {
    fontSize: FontSizes.sm},
  categoriesList: {
    paddingRight: Spacing.lg},
  categoryItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 80},
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm},
  categoryText: {
    fontSize: FontSizes.sm,
    textAlign: 'center'},
  carsList: {
    paddingRight: Spacing.lg},
  carCard: {
    width: 200,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  carImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg},
  carInfo: {
    padding: Spacing.md},
  carTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  carYear: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  carRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm},
  ratingText: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs},
  carPrice: {
    fontSize: FontSizes.md},
  statsSection: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg},
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.md},
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: Spacing.lg},
  statNumber: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.xs},
  statLabel: {
    fontSize: FontSizes.sm,
    textAlign: 'center'},
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'},
  featureCard: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  featureTitle: {
    fontSize: FontSizes.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    textAlign: 'center'},
  featureDescription: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    lineHeight: 18},
  reviewsContainer: {
    marginTop: Spacing.md},
  reviewCard: {
    width: 280,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md},
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md},
  reviewerInitial: {
    fontSize: FontSizes.lg},
  reviewerInfo: {
    flex: 1},
  reviewerName: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  reviewRating: {
    flexDirection: 'row'},
  reviewText: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    fontStyle: 'italic'}});

export default HomeScreen;

