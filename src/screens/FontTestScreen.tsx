import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useFonts } from '../hooks/useFonts';

const FontTestScreen: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { fontStyles, getFont } = useFonts();

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, fontStyles.h1]}>
        Font Test Screen
      </Text>
      
      <Text style={[styles.subtitle, fontStyles.body]}>
        Current Language: {currentLanguage}
      </Text>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Headers
        </Text>
        <Text style={[styles.text, fontStyles.h1]}>H1 - Main Title</Text>
        <Text style={[styles.text, fontStyles.h2]}>H2 - Section Title</Text>
        <Text style={[styles.text, fontStyles.h3]}>H3 - Subsection Title</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Body Text
        </Text>
        <Text style={[styles.text, fontStyles.body]}>Regular body text</Text>
        <Text style={[styles.text, fontStyles.bodyBold]}>Bold body text</Text>
        <Text style={[styles.text, fontStyles.bodyLight]}>Light body text</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Buttons
        </Text>
        <Text style={[styles.text, fontStyles.button]}>Button text</Text>
        <Text style={[styles.text, fontStyles.buttonBold]}>Bold button text</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Captions
        </Text>
        <Text style={[styles.text, fontStyles.caption]}>Caption text</Text>
        <Text style={[styles.text, fontStyles.captionBold]}>Bold caption text</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, fontStyles.h2]}>
          Font Weights
        </Text>
        <Text style={[styles.text, getFont('thin')]}>Thin weight</Text>
        <Text style={[styles.text, getFont('light')]}>Light weight</Text>
        <Text style={[styles.text, getFont('regular')]}>Regular weight</Text>
        <Text style={[styles.text, getFont('medium')]}>Medium weight</Text>
        <Text style={[styles.text, getFont('bold')]}>Bold weight</Text>
        <Text style={[styles.text, getFont('black')]}>Black weight</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'},
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'},
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666'},
  section: {
    marginBottom: 30},
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333'},
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000'}});

export default FontTestScreen;

