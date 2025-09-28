import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const SimpleFontTest: React.FC = () => {
  const { currentLanguage } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Font Test</Text>
      <Text style={styles.subtitle}>Language: {currentLanguage}</Text>
      
      {/* Test Arabic Font - Direct fontFamily */}
      <Text style={[styles.testText, { fontFamily: 'Tajawal-Regular' }]}>
        Arabic Regular: مرحباً - هذا نص عربي
      </Text>
      
      <Text style={[styles.testText, { fontFamily: 'Tajawal-Bold' }]}>
        Arabic Bold: مرحباً بالخط العريض
      </Text>
      
      {/* Test English Font - Direct fontFamily */}
      <Text style={[styles.testText, { fontFamily: 'Outfit-Regular' }]}>
        English Regular: Hello - This is English text
      </Text>
      
      <Text style={[styles.testText, { fontFamily: 'Outfit-Bold' }]}>
        English Bold: Hello - This is Bold text
      </Text>
      
      {/* Test with fallback fonts */}
      <Text style={[styles.testText, { fontFamily: 'Tajawal-Medium, Arial, sans-serif' }]}>
        Arabic Medium with fallback: مرحباً بالخط المتوسط
      </Text>
      
      <Text style={[styles.testText, { fontFamily: 'Outfit-Medium, Arial, sans-serif' }]}>
        English Medium with fallback: Hello - This is Medium text
      </Text>
      
      {/* Test system fonts for comparison */}
      <Text style={[styles.testText, { fontFamily: 'System' }]}>
        System Font: This should look different
      </Text>
      
      <Text style={[styles.testText, { fontFamily: 'Arial' }]}>
        Arial Font: This should look different
      </Text>
      
      {/* Test without fontFamily */}
      <Text style={styles.testText}>
        Default Font: This uses system default
      </Text>
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
  testText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default SimpleFontTest;
