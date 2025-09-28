import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { Car } from '../types';
import { FontText } from '../components/FontText';
import { useRTL } from '../utils/rtlUtils';
import { useRoute, useNavigation } from '@react-navigation/native';

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
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
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

const CarDetailsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const { flexDirection } = useRTL();
  const route = useRoute();
  const navigation = useNavigation();
  const car = (route.params as any)?.car || mockCar;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderImageItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity onPress={() => setCurrentImageIndex(index)}>
      <Image source={{ uri: item }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const renderFeature = (feature: string) => (
    <View key={feature} style={[styles.featureTag, { backgroundColor: theme.colors.surface }]}>
      <FontText 
        fontStyle="caption" 
        style={[styles.featureText, { color: theme.colors.textPrimary }]}
      >
        {feature}
      </FontText>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: car.images[currentImageIndex] }} style={styles.mainImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.imageIndicators}>
          {car.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentImageIndex 
                    ? theme.colors.white 
                    : 'rgba(255, 255, 255, 0.3)'},
              ]}
            />
          ))}
        </View>
      </View>

      {/* Car Info */}
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.carHeader, { flexDirection: flexDirection }]}>
          <View>
            <FontText 
              fontStyle="h1" 
              style={[styles.carTitle, { color: theme.colors.textPrimary }]}
            >
              {car.brand} {car.model}
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.carYear, { color: theme.colors.textSecondary }]}
            >
              {car.year} • {car.mileage.toLocaleString()} km
            </FontText>
          </View>
          <View style={[styles.carRating, { flexDirection: flexDirection }]}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <FontText 
              fontStyle="body" 
              style={[styles.ratingText, { color: theme.colors.textPrimary }]}
            >
              {car.rating}
            </FontText>
            <FontText 
              fontStyle="caption" 
              style={[styles.reviewCount, { color: theme.colors.textSecondary }]}
            >
              ({car.reviewCount} {t('car.reviews')})
            </FontText>
          </View>
        </View>

        {/* Price */}
        <View style={[styles.priceContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.priceItem}>
            <FontText 
              fontStyle="caption" 
              style={[styles.priceLabel, { color: theme.colors.textSecondary }]}
            >
              {t('car.pricePerDay')}
            </FontText>
            <FontText 
              fontStyle="h2" 
              style={[styles.priceValue, { color: theme.colors.primary }]}
            >
              {car.pricePerDay} DA
            </FontText>
          </View>
          <View style={styles.priceItem}>
            <FontText 
              fontStyle="caption" 
              style={[styles.priceLabel, { color: theme.colors.textSecondary }]}
            >
              {t('car.pricePerWeek')}
            </FontText>
            <FontText 
              fontStyle="h2" 
              style={[styles.priceValue, { color: theme.colors.primary }]}
            >
              {car.pricePerWeek} DA
            </FontText>
          </View>
        </View>

        {/* Car Details */}
        <View style={styles.detailsSection}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            {t('car.details')}
          </FontText>
          
          <View style={styles.detailsGrid}>
            <View style={[styles.detailItem, { flexDirection: flexDirection }]}>
              <Ionicons name="settings-outline" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <FontText 
                  fontStyle="caption" 
                  style={[styles.detailLabel, { color: theme.colors.textSecondary }]}
                >
                  {t('car.gearbox')}
                </FontText>
                <FontText 
                  fontStyle="body" 
                  style={[styles.detailValue, { color: theme.colors.textPrimary }]}
                >
                  {t(`car.${car.gearbox}`)}
                </FontText>
              </View>
            </View>

            <View style={[styles.detailItem, { flexDirection: flexDirection }]}>
              <Ionicons name="flash-outline" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <FontText 
                  fontStyle="caption" 
                  style={[styles.detailLabel, { color: theme.colors.textSecondary }]}
                >
                  {t('car.fuelType')}
                </FontText>
                <FontText 
                  fontStyle="body" 
                  style={[styles.detailValue, { color: theme.colors.textPrimary }]}
                >
                  {t(`car.${car.fuelType}`)}
                </FontText>
              </View>
            </View>

            <View style={[styles.detailItem, { flexDirection: flexDirection }]}>
              <Ionicons name="checkmark-circle-outline" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <FontText 
                  fontStyle="caption" 
                  style={[styles.detailLabel, { color: theme.colors.textSecondary }]}
                >
                  {t('car.availability')}
                </FontText>
                <FontText 
                  fontStyle="body" 
                  style={[styles.detailValue, { color: theme.colors.success }]}
                >
                  {t(`car.${car.availability}`)}
                </FontText>
              </View>
            </View>

            <View style={[styles.detailItem, { flexDirection: flexDirection }]}>
              <Ionicons name="construct-outline" size={20} color={theme.colors.primary} />
              <View style={styles.detailContent}>
                <FontText 
                  fontStyle="caption" 
                  style={[styles.detailLabel, { color: theme.colors.textSecondary }]}
                >
                  {t('car.condition')}
                </FontText>
                <FontText 
                  fontStyle="body" 
                  style={[styles.detailValue, { color: theme.colors.textPrimary }]}
                >
                  {t(`car.${car.condition}`)}
                </FontText>
              </View>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            {t('car.features')}
          </FontText>
          <View style={styles.featuresGrid}>
            {car.features.map(renderFeature)}
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            {t('car.description')}
          </FontText>
          <FontText 
            fontStyle="body" 
            style={[styles.descriptionText, { color: theme.colors.textSecondary }]}
          >
            {car.description}
          </FontText>
        </View>

         <View style={[styles.ownerSection, { backgroundColor: theme.colors.surface, flexDirection: flexDirection }]}>
          <View style={[styles.ownerInfo, { flexDirection: flexDirection }]}>
            <View style={[styles.ownerAvatar, { backgroundColor: theme.colors.primary }]}>
              <FontText 
                fontStyle="button" 
                style={[styles.ownerInitial, { color: theme.colors.white }]}
              >
                {car.owner.name.charAt(0)}
              </FontText>
            </View>
            <View style={styles.ownerDetails}>
              <FontText 
                fontStyle="body" 
                style={[styles.ownerName, { color: theme.colors.textPrimary }]}
              >
                {car.owner.name}
              </FontText>
              <View style={[styles.ownerRating, { flexDirection: flexDirection }]}>
                <Ionicons name="star" size={16} color={Colors.warning} />
                <FontText 
                  fontStyle="caption" 
                  style={[styles.ownerRatingText, { color: theme.colors.textSecondary }]}
                >
                  {car.owner.rating}
                </FontText>
              </View>
            </View>
          </View>
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}>
            <FontText 
              fontStyle="button" 
              style={[styles.contactButtonText, { color: theme.colors.white }]}
            >
              {t('car.contactOwner')}
            </FontText>
          </TouchableOpacity>
        </View> 
   

        {/* Location */}
        <View style={styles.locationSection}>
          <View style={[styles.locationHeader, { flexDirection: flexDirection }]}>
            <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
            <FontText 
              fontStyle="h3" 
              style={[styles.locationTitle, { color: theme.colors.textPrimary }]}
            >
              {car.location.city}
            </FontText>
          </View>
          <FontText 
            fontStyle="body" 
            style={[styles.locationAddress, { color: theme.colors.textSecondary }]}
          >
            {car.location.address}
          </FontText>
        </View>

        {/* Image Thumbnails */}
        <View style={styles.thumbnailsSection}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            Photos
          </FontText>
          <FlatList
            data={car.images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsList}
          />
        </View>
      </View>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.card, flexDirection: flexDirection }]}>
        <View style={styles.priceInfo}>
          <FontText 
            fontStyle="caption" 
            style={[styles.bottomPriceLabel, { color: theme.colors.textSecondary }]}
          >
            {t('car.pricePerDay')}
          </FontText>
          <FontText 
            fontStyle="h2" 
            style={[styles.bottomPriceValue, { color: theme.colors.primary }]}
          >
            {car.pricePerDay} DA
          </FontText>
        </View>
        <TouchableOpacity 
          style={[styles.bookButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => (navigation as any).navigate('Booking', { car })}
        >
          <FontText 
            fontStyle="button" 
            style={[styles.bookButtonText, { color: theme.colors.white }]}
          >
            {t('car.bookNow')}
          </FontText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  imageContainer: {
    position: 'relative',
    height: 300},
  mainImage: {
    width: '100%',
    height: '100%'},
  backButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'},
  favoriteButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'},
  imageIndicators: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'},
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4},
  content: {
    flex: 1,
    padding: Spacing.lg,
    marginTop: -Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl},
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg},
  carTitle: {
    fontSize: FontSizes.xxl,
    marginBottom: Spacing.xs},
  carYear: {
    fontSize: FontSizes.md},
  carRating: {
    flexDirection: 'row',
    alignItems: 'center'},
  ratingText: {
    fontSize: FontSizes.lg,
    marginLeft: Spacing.xs},
  reviewCount: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs},
  priceContainer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg},
  priceItem: {
    flex: 1,
    alignItems: 'center'},
  priceLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  priceValue: {
    fontSize: FontSizes.xl},
  detailsSection: {
    marginBottom: Spacing.xl},
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.md},
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'},
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: Spacing.md},
  detailContent: {
    marginLeft: Spacing.sm},
  detailLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  detailValue: {
    fontSize: FontSizes.md},
  featuresSection: {
    marginBottom: Spacing.xl},
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'},
  featureTag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm},
  featureText: {
    fontSize: FontSizes.sm},
  descriptionSection: {
    marginBottom: Spacing.xl},
  descriptionText: {
    fontSize: FontSizes.md,
    lineHeight: 22},
  ownerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl},
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md},
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md},
  ownerInitial: {
    fontSize: FontSizes.lg},
  ownerDetails: {
    flex: 1,
    marginLeft: Spacing.sm},
  ownerName: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  ownerRating: {
    flexDirection: 'row',
    alignItems: 'center'},
  ownerRatingText: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs},
  contactButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center'},
  contactButtonText: {
    fontSize: FontSizes.sm},
  locationSection: {
    marginBottom: Spacing.xl},
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm},
  locationTitle: {
    fontSize: FontSizes.lg,
    marginLeft: Spacing.sm},
  locationAddress: {
    fontSize: FontSizes.md},
  thumbnailsSection: {
    marginBottom: Spacing.xl},
  thumbnailsList: {
    paddingRight: Spacing.lg},
  thumbnailImage: {
    width: 80,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm},
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border},
  priceInfo: {
    flex: 1},
  bottomPriceLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  bottomPriceValue: {
    fontSize: FontSizes.xl},
  bookButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg},
  bookButtonText: {
    fontSize: FontSizes.lg}});

export default CarDetailsScreen;


