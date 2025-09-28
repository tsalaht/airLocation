import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await SecureStore.getItemAsync('language');
      if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage as Language);
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
      // Set default language if there's an error
      setCurrentLanguage('en');
    }
  };

  const changeLanguage = async (language: Language) => {
    try {
      setCurrentLanguage(language);
      await i18n.changeLanguage(language);
      await SecureStore.setItemAsync('language', language);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const isRTL = currentLanguage === 'ar';

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
