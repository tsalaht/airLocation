import { useLanguage } from '../contexts/LanguageContext';
import { getFontStyles, getFontStyle, FontWeight } from '../utils/fonts';

export const useFonts = () => {
  const { currentLanguage } = useLanguage();
  
  const fontStyles = getFontStyles(currentLanguage);
  
  const getFont = (weight: FontWeight = 'regular') => {
    return getFontStyle(currentLanguage, weight);
  };
  
  return {
    fontStyles,
    getFont,
    currentLanguage,
  };
};
