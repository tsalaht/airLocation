import { useLanguage } from '../contexts/LanguageContext';

// RTL Layout Utilities
export const useRTL = () => {
  const { isRTL } = useLanguage();
  
  return {
    isRTL,
    // RTL-aware flex direction
    flexDirection: (isRTL ? 'row-reverse' : 'row') as 'row' | 'row-reverse',
    // RTL-aware text alignment
    textAlign: isRTL ? 'right' : 'left',
    // RTL-aware margin/padding
    marginStart: isRTL ? 'marginRight' : 'marginLeft',
    marginEnd: isRTL ? 'marginLeft' : 'marginRight',
    paddingStart: isRTL ? 'paddingRight' : 'paddingLeft',
    paddingEnd: isRTL ? 'paddingLeft' : 'paddingRight',
  };
};

// RTL-aware styles
export const getRTLStyles = (isRTL: boolean) => ({
  // Text alignment
  textAlign: isRTL ? 'right' : 'left',
  textAlignLeft: isRTL ? 'right' : 'left',
  textAlignRight: isRTL ? 'left' : 'right',
  
  // Flex direction
  flexDirection: isRTL ? 'row-reverse' : 'row',
  flexDirectionReverse: isRTL ? 'row' : 'row-reverse',
  
  // Margins
  marginStart: isRTL ? 'marginRight' : 'marginLeft',
  marginEnd: isRTL ? 'marginLeft' : 'marginRight',
  
  // Padding
  paddingStart: isRTL ? 'paddingRight' : 'paddingLeft',
  paddingEnd: isRTL ? 'paddingLeft' : 'paddingRight',
  
  // Border radius (for RTL layouts)
  borderTopStartRadius: isRTL ? 'borderTopRightRadius' : 'borderTopLeftRadius',
  borderTopEndRadius: isRTL ? 'borderTopLeftRadius' : 'borderTopRightRadius',
  borderBottomStartRadius: isRTL ? 'borderBottomRightRadius' : 'borderBottomLeftRadius',
  borderBottomEndRadius: isRTL ? 'borderBottomLeftRadius' : 'borderBottomRightRadius',
});

// Helper to create RTL-aware container styles
export const createRTLContainerStyle = (isRTL: boolean, baseStyle: any = {}) => {
  const rtlStyles = getRTLStyles(isRTL);
  
  return {
    ...baseStyle,
    ...(isRTL && {
      // Mirror the layout for RTL
      transform: [{ scaleX: -1 }],
    }),
  };
};

// Helper to create RTL-aware text styles
export const createRTLTextStyle = (isRTL: boolean, baseStyle: any = {}) => {
  return {
    ...baseStyle,
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  };
};
