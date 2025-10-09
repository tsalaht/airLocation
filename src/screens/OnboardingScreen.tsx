import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { Language } from '../types';
import { FontText } from '../components/FontText';
import { useRTL } from '../utils/rtlUtils';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { changeLanguage, currentLanguage } = useLanguage();
  const { flexDirection } = useRTL();
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t('onboarding.slide1.title'),
      description: t('onboarding.slide1.description'),
      icon: 'car-outline'},
    {
      title: t('onboarding.slide2.title'),
      description: t('onboarding.slide2.description'),
      icon: 'calendar-outline'},
    {
      title: t('onboarding.slide3.title'),
      description: t('onboarding.slide3.description'),
      icon: 'shield-checkmark-outline'},
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Language Selection */}
        <View style={styles.languageSection}>
          <FontText 
            fontStyle="h2" 
            style={[styles.sectionTitle, { color: theme.colors.white }]}
          >
            {t('onboarding.chooseLanguage')}
          </FontText>
          <View style={[styles.languageButtons, { flexDirection: flexDirection }]}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor: currentLanguage === lang.code 
                      ? theme.colors.white 
                      : 'rgba(255, 255, 255, 0.2)',
                    flexDirection: flexDirection
                  },
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <FontText
                  fontStyle="body"
                  style={[
                    styles.languageName,
                    {
                      color: currentLanguage === lang.code 
                        ? theme.colors.primary 
                        : theme.colors.white},
                  ]}
                >
                  {lang.name}
                </FontText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Onboarding Slides */}
        <View style={styles.slideContainer}>
          <View style={styles.slideContent}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.white }]}>
              <Ionicons
                name={slides[currentSlide].icon as any}
                size={60}
                color={theme.colors.primary}
              />
            </View>
            
            <FontText 
              fontStyle="h1" 
              style={[styles.slideTitle, { color: theme.colors.white }]}
            >
              {slides[currentSlide].title}
            </FontText>
            
            <FontText 
              fontStyle="body" 
              style={[styles.slideDescription, { color: theme.colors.white }]}
            >
              {slides[currentSlide].description}
            </FontText>
          </View>

          {/* Slide Indicators */}
          <View style={styles.indicators}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentSlide 
                      ? theme.colors.white 
                      : 'rgba(255, 255, 255, 0.3)'},
                ]}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigation}>
            {currentSlide > 0 && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
                onPress={prevSlide}
              >
                <Ionicons name="chevron-back" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            )}
            
            <View style={styles.spacer} />
            
            {currentSlide < slides.length - 1 ? (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.colors.white }]}
                onPress={nextSlide}
              >
                <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.getStartedButton, { backgroundColor: theme.colors.white }]}
                onPress={() => {
                  navigation.navigate('Auth' as never);
                }}
              >
                <FontText 
                  fontStyle="button" 
                  style={[styles.getStartedText, { color: theme.colors.primary }]}
                >
                  {t('onboarding.getStarted')}
                </FontText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl},
  languageSection: {
    marginBottom: Spacing.xxl},
  sectionTitle: {
    fontSize: FontSizes.xl,
    textAlign: 'center',
    marginBottom: Spacing.lg},
  languageButtons: {
    flexDirection: 'row',
 
    gap: 12,width: '100%',alignItems: 'center',justifyContent: 'center'},
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
   width: 100},
  languageFlag: {
    fontSize: 24,
    marginBottom: Spacing.xs},
  languageName: {
    fontSize: FontSizes.sm},
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'},
  slideContent: {
    alignItems: 'center',
    marginBottom: Spacing.xxl},
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8},
  slideTitle: {
    fontSize: FontSizes.xxxl,
    textAlign: 'center',
    marginBottom: Spacing.md},
  slideDescription: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24},
  indicators: {
    flexDirection: 'row',
    marginBottom: Spacing.xl},
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4},
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'},
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'},
  spacer: {
    flex: 1},
  getStartedButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg},
  getStartedText: {
    fontSize: FontSizes.lg}});

export default OnboardingScreen;


