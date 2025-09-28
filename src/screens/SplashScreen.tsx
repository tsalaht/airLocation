import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { Colors, Spacing, FontSizes, FontWeights } from '../constants/colors';
import { FontText } from '../components/FontText';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const { theme } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true}),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true}),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]},
          ]}
        >
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
        
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.title, { color: theme.colors.white }]}>
            AirLocation
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.white }]}>
            Your Journey Starts Here
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'},
  content: {
    alignItems: 'center',
    justifyContent: 'center'},
  logoContainer: {
    marginBottom: Spacing.xl},
  logoImage: {
    width: 120,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8},
  title: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.sm,
    textAlign: 'center'},
  subtitle: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    opacity: 0.9}});

export default SplashScreen;


