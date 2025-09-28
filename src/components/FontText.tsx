import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface FontTextProps extends TextProps {
  fontStyle?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'bodyLight' | 'button' | 'buttonBold' | 'caption' | 'captionBold';
  children: React.ReactNode;
}

export const FontText: React.FC<FontTextProps> = ({ 
  fontStyle = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const { currentLanguage, isRTL } = useLanguage();
  
  // Get direct font family based on language and style
  const getDirectFontFamily = (style: string) => {
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
      return arabicFonts[style] || 'Tajawal-Regular';
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
      return englishFonts[style] || 'Outfit-Regular';
    }
  };
  
  // Remove fontWeight from any existing styles and add RTL support
  const cleanStyle = Array.isArray(style) 
    ? style.map(s => {
        if (typeof s === 'object' && s !== null) {
          const { fontWeight, textAlign, ...rest } = s as any;
          return {
            ...rest,
            // Override textAlign for RTL
            textAlign: isRTL ? 'right' : (textAlign || 'left')
          };
        }
        return s;
      })
    : typeof style === 'object' && style !== null
      ? (() => {
          const { fontWeight, textAlign, ...rest } = style as any;
          return {
            ...rest,
            // Override textAlign for RTL
            textAlign: isRTL ? 'right' : (textAlign || 'left')
          };
        })()
      : style;
  
  const fontFamily = getDirectFontFamily(fontStyle);
  
  // RTL text alignment
  const rtlStyle = isRTL ? { textAlign: 'right' as const } : { textAlign: 'left' as const };
  
  return (
    <Text 
      style={[cleanStyle, { fontFamily }, rtlStyle]} 
      {...props}
    >
      {children}
    </Text>
  );
};
