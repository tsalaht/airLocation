import * as Font from 'expo-font';
import { Language } from '../types';

// Font loading configuration using proper Expo Font method
export const loadFonts = async (): Promise<boolean> => {
  try {
    console.log('Starting to load fonts with Expo Font...');
    
    // Load all fonts at once using Font.loadAsync
    const fontMap = {
      // Tajawal fonts for Arabic
      'Tajawal-Regular': require('../../assets/fonts/Tajawal/Tajawal-Regular.ttf'),
      'Tajawal-Medium': require('../../assets/fonts/Tajawal/Tajawal-Medium.ttf'),
      'Tajawal-Bold': require('../../assets/fonts/Tajawal/Tajawal-Bold.ttf'),
      'Tajawal-Light': require('../../assets/fonts/Tajawal/Tajawal-Light.ttf'),
      'Tajawal-ExtraBold': require('../../assets/fonts/Tajawal/Tajawal-ExtraBold.ttf'),
      'Tajawal-ExtraLight': require('../../assets/fonts/Tajawal/Tajawal-ExtraLight.ttf'),
      'Tajawal-Black': require('../../assets/fonts/Tajawal/Tajawal-Black.ttf'),
      
      // Outfit fonts for English and French
      'Outfit-Regular': require('../../assets/fonts/Outfit/Outfit-Regular.ttf'),
      'Outfit-Medium': require('../../assets/fonts/Outfit/Outfit-Medium.ttf'),
      'Outfit-Bold': require('../../assets/fonts/Outfit/Outfit-Bold.ttf'),
      'Outfit-Light': require('../../assets/fonts/Outfit/Outfit-Light.ttf'),
      'Outfit-SemiBold': require('../../assets/fonts/Outfit/Outfit-SemiBold.ttf'),
      'Outfit-ExtraBold': require('../../assets/fonts/Outfit/Outfit-ExtraBold.ttf'),
      'Outfit-ExtraLight': require('../../assets/fonts/Outfit/Outfit-ExtraLight.ttf'),
      'Outfit-Black': require('../../assets/fonts/Outfit/Outfit-Black.ttf'),
      'Outfit-Thin': require('../../assets/fonts/Outfit/Outfit-Thin.ttf'),
    };
    
    console.log('Loading fonts with Font.loadAsync...');
    await Font.loadAsync(fontMap);
    
    console.log('✅ All fonts loaded successfully!');
    console.log('Loaded fonts:', Object.keys(fontMap));
    
    // Fonts loaded successfully
    console.log('✅ Font loading completed successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Error loading fonts:', error);
    return false;
  }
};

// Font weight types
export type FontWeight = 
  | 'thin'
  | 'extraLight' 
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

// Font family mapping based on language
export const getFontFamily = (language: Language, weight: FontWeight = 'regular'): string => {
  const isArabic = language === 'ar';
  
  if (isArabic) {
    // Tajawal font mapping
    const tajawalMap: Record<FontWeight, string> = {
      thin: 'Tajawal-ExtraLight',
      extraLight: 'Tajawal-ExtraLight',
      light: 'Tajawal-Light',
      regular: 'Tajawal-Regular',
      medium: 'Tajawal-Medium',
      semiBold: 'Tajawal-Bold', // Tajawal doesn't have SemiBold, use Bold
      bold: 'Tajawal-Bold',
      extraBold: 'Tajawal-ExtraBold',
      black: 'Tajawal-Black',
    };
    return tajawalMap[weight];
  } else {
    // Outfit font mapping
    const outfitMap: Record<FontWeight, string> = {
      thin: 'Outfit-Thin',
      extraLight: 'Outfit-ExtraLight',
      light: 'Outfit-Light',
      regular: 'Outfit-Regular',
      medium: 'Outfit-Medium',
      semiBold: 'Outfit-SemiBold',
      bold: 'Outfit-Bold',
      extraBold: 'Outfit-ExtraBold',
      black: 'Outfit-Black',
    };
    return outfitMap[weight];
  }
};

// Helper function to get font style object - Direct font family names
export const getFontStyle = (language: Language, weight: FontWeight = 'regular') => {
  const fontFamily = getFontFamily(language, weight);
  
  return {
    fontFamily: fontFamily, // Use direct font family name
    // NO fontWeight - the font name already includes the weight!
  };
};

// Predefined font styles for common use cases
export const getFontStyles = (language: Language) => ({
  // Headers
  h1: getFontStyle(language, 'bold'),
  h2: getFontStyle(language, 'semiBold'),
  h3: getFontStyle(language, 'medium'),
  
  // Body text
  body: getFontStyle(language, 'regular'),
  bodyBold: getFontStyle(language, 'medium'),
  bodyLight: getFontStyle(language, 'light'),
  
  // Buttons
  button: getFontStyle(language, 'medium'),
  buttonBold: getFontStyle(language, 'bold'),
  
  // Captions
  caption: getFontStyle(language, 'light'),
  captionBold: getFontStyle(language, 'medium'),
});