import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Switch,
  ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { Car, FilterOptions } from '../types';
import { FontText } from '../components/FontText';
import { useNavigation } from '@react-navigation/native';

// Mock data with real car images
const mockCars: Car[] = [
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
];

const CarListScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const navigation = useNavigation();
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'year'>('price');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    gearbox: [],
    fuelType: [],
    availability: [],
    condition: [],
    features: [],
    wilayas: []});

  const sortOptions = [
    { key: 'price', label: t('common.price') },
    { key: 'rating', label: t('car.rating') },
    { key: 'year', label: t('car.year') },
  ];

  const filterCategories = [
    { key: 'economy', label: t('home.economy') },
    { key: 'compact', label: t('home.compact') },
    { key: 'sedan', label: t('home.sedan') },
    { key: 'suv', label: t('home.suv') },
    { key: 'luxury', label: t('home.luxury') },
    { key: 'sports', label: t('home.sports') },
  ];

  const filterGearbox = [
    { key: 'manual', label: t('car.manual') },
    { key: 'automatic', label: t('car.automatic') },
  ];

  const filterFuelType = [
    { key: 'gasoline', label: t('car.gasoline') },
    { key: 'diesel', label: t('car.diesel') },
    { key: 'electric', label: t('car.electric') },
    { key: 'hybrid', label: t('car.hybrid') },
  ];

  // Algeria wilayas (subset based on mock data; extend as needed)
  const filterWilayas = [
    { key: 'Algiers', label: 'Algiers' },
    { key: 'Oran', label: 'Oran' },
    { key: 'Constantine', label: 'Constantine' },
    { key: 'Annaba', label: 'Annaba' },
    { key: 'Blida', label: 'Blida' },
    { key: 'Tizi Ouzou', label: 'Tizi Ouzou' },
  ];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.wilayas && filters.wilayas.length > 0) {
        if (!filters.wilayas.includes(car.location.city)) return false;
      }
      // Optional: basic search by model/brand
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const hay = `${car.brand} ${car.model} ${car.year} ${car.location.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cars, filters.wilayas, searchQuery]);

  const renderCarGrid = ({ item }: { item: Car }) => (
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
          {item.model}
        </FontText>
        <FontText 
          fontStyle="caption" 
          style={[styles.carYear, { color: theme.colors.textSecondary }]}
        >
          {item.year}
        </FontText>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={[styles.locationText, { color: theme.colors.textSecondary }]}>
            {item.location.city}
          </Text>
        </View>
        <View style={styles.carFooter}>
          <Text style={[styles.carPrice, { color: theme.colors.primary }]}>
            {item.pricePerDay} DA
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCarList = ({ item }: { item: Car }) => (
    <TouchableOpacity 
      style={[styles.carListItem, { backgroundColor: theme.colors.card }]}
      onPress={() => (navigation as any).navigate('CarDetails', { car: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.carListImage} />
      <View style={styles.carListInfo}>
        <Text style={[styles.carListTitle, { color: theme.colors.textPrimary }]}>
          {item.model}
        </Text>
        <Text style={[styles.carListYear, { color: theme.colors.textSecondary }]}>
          {item.year}
        </Text>
        <View style={styles.carListDetails}>
          <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={[styles.carListDetail, { color: theme.colors.textSecondary }]}> {item.location.city}</Text>
        </View>
        <View style={styles.carListFooter}>
          <Text style={[styles.carListPrice, { color: theme.colors.primary }]}>
            {item.pricePerDay} DA/day
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.filterModal, { backgroundColor: theme.colors.background }]}>
        <View style={styles.filterHeader}>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={[styles.filterCancel, { color: theme.colors.primary }]}>
              {t('common.cancel')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.filterTitle, { color: theme.colors.textPrimary }]}>
            {t('common.filter')}
          </Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={[styles.filterApply, { color: theme.colors.primary }]}>
              {t('common.confirm')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterContent}>
          {/* Categories */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: theme.colors.textPrimary }]}>
              {t('home.categories')}
            </Text>
            <View style={styles.filterOptions}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.categories.includes(category.key)
                        ? theme.colors.primary
                        : theme.colors.surface},
                  ]}
                  onPress={() => {
                    const newCategories = filters.categories.includes(category.key)
                      ? filters.categories.filter(c => c !== category.key)
                      : [...filters.categories, category.key];
                    setFilters({ ...filters, categories: newCategories });
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      {
                        color: filters.categories.includes(category.key)
                          ? theme.colors.white
                          : theme.colors.textPrimary},
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Wilayas */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: theme.colors.textPrimary }]}>Wilaya</Text>
            <View style={styles.filterOptions}>
              {filterWilayas.map((wilaya) => (
                <TouchableOpacity
                  key={wilaya.key}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: (filters.wilayas || []).includes(wilaya.key)
                        ? theme.colors.primary
                        : theme.colors.surface},
                  ]}
                  onPress={() => {
                    const current = filters.wilayas || [];
                    const newWilayas = current.includes(wilaya.key)
                      ? current.filter(w => w !== wilaya.key)
                      : [...current, wilaya.key];
                    setFilters({ ...filters, wilayas: newWilayas });
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      {
                        color: (filters.wilayas || []).includes(wilaya.key)
                          ? theme.colors.white
                          : theme.colors.textPrimary},
                    ]}
                  >
                    {wilaya.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gearbox */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: theme.colors.textPrimary }]}>
              {t('car.gearbox')}
            </Text>
            <View style={styles.filterOptions}>
              {filterGearbox.map((gearbox) => (
                <TouchableOpacity
                  key={gearbox.key}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.gearbox.includes(gearbox.key)
                        ? theme.colors.primary
                        : theme.colors.surface},
                  ]}
                  onPress={() => {
                    const newGearbox = filters.gearbox.includes(gearbox.key)
                      ? filters.gearbox.filter(g => g !== gearbox.key)
                      : [...filters.gearbox, gearbox.key];
                    setFilters({ ...filters, gearbox: newGearbox });
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      {
                        color: filters.gearbox.includes(gearbox.key)
                          ? theme.colors.white
                          : theme.colors.textPrimary},
                    ]}
                  >
                    {gearbox.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fuel Type */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: theme.colors.textPrimary }]}>
              {t('car.fuelType')}
            </Text>
            <View style={styles.filterOptions}>
              {filterFuelType.map((fuel) => (
                <TouchableOpacity
                  key={fuel.key}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.fuelType.includes(fuel.key)
                        ? theme.colors.primary
                        : theme.colors.surface},
                  ]}
                  onPress={() => {
                    const newFuelType = filters.fuelType.includes(fuel.key)
                      ? filters.fuelType.filter(f => f !== fuel.key)
                      : [...filters.fuelType, fuel.key];
                    setFilters({ ...filters, fuelType: newFuelType });
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      {
                        color: filters.fuelType.includes(fuel.key)
                          ? theme.colors.white
                          : theme.colors.textPrimary},
                    ]}
                  >
                    {fuel.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
            {t('common.search')}
          </Text>
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Ionicons name="options-outline" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Controls */}
      <View style={[styles.searchSection, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.textPrimary }]}
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.controls}>
          <View style={styles.sortContainer}>
            <Text style={[styles.sortLabel, { color: theme.colors.textSecondary }]}>
              {t('common.sort')}:
            </Text>
            <TouchableOpacity style={[styles.sortButton, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.sortText, { color: theme.colors.textPrimary }]}>
                {sortOptions.find(s => s.key === sortBy)?.label}
              </Text>
              <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.viewButton,
                viewMode === 'grid' && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons
                name="grid-outline"
                size={20}
                color={viewMode === 'grid' ? theme.colors.white : theme.colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewButton,
                viewMode === 'list' && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={viewMode === 'list' ? theme.colors.white : theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Car List */}
      <FlatList
        data={filteredCars}
        renderItem={viewMode === 'grid' ? renderCarGrid : renderCarList}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
        contentContainerStyle={styles.carList}
        showsVerticalScrollIndicator={false}
      />

      {renderFilterModal()}
    </View>
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
  headerTitle: {
    fontSize: FontSizes.xxl},
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'},
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center'},
  sortLabel: {
    fontSize: FontSizes.sm,
    marginRight: Spacing.sm},
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md},
  sortText: {
    fontSize: FontSizes.sm,
    marginRight: Spacing.xs},
  viewToggle: {
    flexDirection: 'row'},
  viewButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.xs},
  carList: {
    padding: Spacing.lg},
  carCard: {
    flex: 1,
    margin: Spacing.xs,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  carImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg},
  carInfo: {
    padding: Spacing.md},
  carTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  carYear: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm},
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm},
  locationText: {
    fontSize: FontSizes.xs,
    marginLeft: Spacing.xs},
  carDetails: {
    flexDirection: 'row',
    marginBottom: Spacing.sm},
  carDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md},
  carDetailText: {
    fontSize: FontSizes.xs,
    marginLeft: Spacing.xs},
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'},
  carRating: {
    flexDirection: 'row',
    alignItems: 'center'},
  ratingText: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs},
  carPrice: {
    fontSize: FontSizes.md},
  carListItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3},
  carListImage: {
    width: 160,
    height: "100%",
    borderTopLeftRadius: BorderRadius.lg,
    borderBottomLeftRadius: BorderRadius.lg},
  carListInfo: {
    flex: 1,
    padding: Spacing.md},
  carListTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  carListYear: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm},
  carListDetails: {
    marginBottom: Spacing.sm},
  carListDetail: {
    fontSize: FontSizes.sm},
  carListFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'},
  carListRating: {
    flexDirection: 'row',
    alignItems: 'center'},
  carListRatingText: {
    fontSize: FontSizes.sm,
    marginLeft: Spacing.xs},
  carListPrice: {
    fontSize: FontSizes.md},
  filterModal: {
    flex: 1},
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border},
  filterCancel: {
    fontSize: FontSizes.md},
  filterTitle: {
    fontSize: FontSizes.lg},
  filterApply: {
    fontSize: FontSizes.md},
  filterContent: {
    flex: 1,
    padding: Spacing.lg},
  filterSection: {
    marginBottom: Spacing.xl},
  filterSectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.md},
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap'},
  filterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm},
  filterOptionText: {
    fontSize: FontSizes.sm}});

export default CarListScreen;


