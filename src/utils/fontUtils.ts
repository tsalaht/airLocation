import { TextStyle } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { getFontStyles } from './fonts';

// Global font utility that can be used in any component
export const useGlobalFonts = () => {
  const { currentLanguage } = useLanguage();
  return getFontStyles(currentLanguage);
};

// Helper to remove fontWeight from any style object
export const removeFontWeight = (style: any): TextStyle => {
  if (Array.isArray(style)) {
    return style.map(removeFontWeight);
  }
  
  if (typeof style === 'object' && style !== null) {
    const { fontWeight, ...rest } = style;
    return rest;
  }
  
  return style;
};

// Apply font styles to any text element
export const applyFontStyle = (baseStyle: any, fontStyle: any) => {
  const cleanBaseStyle = removeFontWeight(baseStyle);
  return [cleanBaseStyle, fontStyle];
};
