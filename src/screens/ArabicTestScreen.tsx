import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useFonts } from '../hooks/useFonts';
import { FontText } from '../components/FontText';

const ArabicTestScreen: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { fontStyles } = useFonts();

  const arabicTexts = [
    'مرحباً بك في تطبيق AirLocation',
    'اختر سيارتك المفضلة',
    'احجز الآن واستمتع برحلة مريحة',
    'خدمة عملاء على مدار الساعة',
    'أمان وموثوقية عالية'
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, fontStyles.h1]}>
        Arabic Font Test
      </Text>
      
      <Text style={[styles.subtitle, fontStyles.body]}>
        Current Language: {currentLanguage}
      </Text>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          FontText Component
        </Text>
        {arabicTexts.map((text, index) => (
          <FontText 
            key={index}
            fontStyle="body" 
            style={styles.arabicText}
          >
            {text}
          </FontText>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Direct Font Styles
        </Text>
        {arabicTexts.map((text, index) => (
          <Text 
            key={index}
            style={[styles.arabicText, fontStyles.body]}
          >
            {text}
          </Text>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Different Font Weights
        </Text>
        <Text style={[styles.arabicText, fontStyles.bodyLight]}>
          Light: {arabicTexts[0]}
        </Text>
        <Text style={[styles.arabicText, fontStyles.body]}>
          Regular: {arabicTexts[1]}
        </Text>
        <Text style={[styles.arabicText, fontStyles.bodyBold]}>
          Medium: {arabicTexts[2]}
        </Text>
        <Text style={[styles.arabicText, fontStyles.h1]}>
          Bold: {arabicTexts[3]}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  arabicText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    textAlign: 'right', // RTL for Arabic
  },
});

export default ArabicTestScreen;
