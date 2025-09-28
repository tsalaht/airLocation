import { useLanguage } from '../contexts/LanguageContext';

// Helper function to get direct font family for any text element
export const getDirectFontFamily = (fontStyle: string = 'body'): string => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage === 'ar';
  
  if (isArabic) {
    // Arabic fonts (Tajawal)
    const arabicFonts: Record<string, string> = {
      h1: 'Tajawal-Bold',
      h2: 'Tajawal-Bold',
      h3: 'Tajawal-Medium',
      body: 'Tajawal-Regular',
      bodyBold: 'Tajawal-Medium',
      bodyLight: 'Tajawal-Light',
      button: 'Tajawal-Medium',
      buttonBold: 'Tajawal-Bold',
      caption: 'Tajawal-Light',
      captionBold: 'Tajawal-Medium',
    };
    return arabicFonts[fontStyle] || 'Tajawal-Regular';
  } else {
    // English/French fonts (Outfit)
    const englishFonts: Record<string, string> = {
      h1: 'Outfit-Bold',
      h2: 'Outfit-SemiBold',
      h3: 'Outfit-Medium',
      body: 'Outfit-Regular',
      bodyBold: 'Outfit-Medium',
      bodyLight: 'Outfit-Light',
      button: 'Outfit-Medium',
      buttonBold: 'Outfit-Bold',
      caption: 'Outfit-Light',
      captionBold: 'Outfit-Medium',
    };
    return englishFonts[fontStyle] || 'Outfit-Regular';
  }
};

// Helper to apply font to any Text component
export const applyFont = (fontStyle: string = 'body') => {
  return {
    fontFamily: getDirectFontFamily(fontStyle),
  };
};
