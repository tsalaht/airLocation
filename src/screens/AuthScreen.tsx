import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { getFontStyles, getFontFamily } from '../utils/fonts';
import { FontText } from '../components/FontText';

const AuthScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { isRTL, currentLanguage } = useLanguage();
  const { login, register, isLoading } = useAuth();
  
  // Get font styles based on current language
  const fontStyles = getFontStyles(currentLanguage);
  const navigation = useNavigation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (!phone || !password || (!isLogin && !name)) {
      Alert.alert(t('common.error'), 'Please fill in all fields');
      return;
    }

    try {
      let success = false;
      if (isLogin) {
        success = await login(phone, password);
      } else {
        success = await register(name, phone, password);
      }

      if (success) {
        // Navigation will be handled by the AuthContext
        console.log('Authentication successful');
      } else {
        Alert.alert(t('common.error'), 'Authentication failed');
      }
    } catch (error) {
      Alert.alert(t('common.error'), 'An error occurred');
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.white }]}>
              <Image 
                source={require('../../assets/logo.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
        
            <FontText 
              fontStyle="h1" 
              style={[styles.title, { color: theme.colors.white }]}
            >
 AirLocation
            </FontText>
            <FontText 
              fontStyle="body" 
              style={[styles.subtitle, { color: theme.colors.white }]}
            >
              {isLogin ? t('auth.welcomeBack') : t('auth.welcomeToAirLocation')}
            </FontText>
          </View>

          <View style={[styles.formContainer, { backgroundColor: theme.colors.white }]}>
            {/* Auth Mode Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  isLogin && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setIsLogin(true)}
              >
                <FontText
                  fontStyle="button"
                  style={[
                    styles.toggleText,
                    { color: isLogin ? theme.colors.white : theme.colors.textSecondary },
                  ]}
                >
                  {t('auth.login')}
                </FontText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !isLogin && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setIsLogin(false)}
              >
                <FontText
                  fontStyle="button"
                  style={[
                    styles.toggleText,
                    { color: !isLogin ? theme.colors.white : theme.colors.textSecondary },
                  ]}
                >
                  {t('auth.register')}
                </FontText>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.textPrimary }, fontStyles.bodyBold]}>
                  {t('profile.name')}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.textPrimary,
                      borderColor: theme.colors.border},
                    fontStyles.body,
                  ]}
                  value={name}
                  onChangeText={setName}
                  placeholder={t('profile.name')}
                  placeholderTextColor={theme.colors.textLight}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }, fontStyles.bodyBold]}>
                {t('auth.phoneNumber')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.textPrimary,
                    borderColor: theme.colors.border},
                  fontStyles.body,
                ]}
                value={phone}
                onChangeText={setPhone}
                placeholder={t('auth.phoneNumber')}
                placeholderTextColor={theme.colors.textLight}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }, fontStyles.bodyBold]}>
                {t('auth.password')}
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.textPrimary,
                      borderColor: theme.colors.border},
                    fontStyles.body,
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('auth.password')}
                  placeholderTextColor={theme.colors.textLight}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me */}
            {isLogin && (
              <TouchableOpacity
                style={styles.rememberContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: rememberMe ? theme.colors.primary : theme.colors.surface,
                      borderColor: theme.colors.border},
                  ]}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={16} color={theme.colors.white} />
                  )}
                </View>
                <Text style={[styles.rememberText, { color: theme.colors.textSecondary }, fontStyles.body]}>
                  {t('auth.rememberMe')}
                </Text>
              </TouchableOpacity>
            )}

            {/* Auth Button */}
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleAuth}
              disabled={isLoading}
            >
              <Text style={[styles.authButtonText, { color: theme.colors.white }, fontStyles.buttonBold]}>
                {isLoading ? t('common.loading') : (isLogin ? t('auth.login') : t('auth.register'))}
              </Text>
            </TouchableOpacity>

            {/* Switch Auth Mode */}
            <TouchableOpacity
              style={styles.switchContainer}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={[styles.switchText, { color: theme.colors.textSecondary }, fontStyles.body]}>
                {isLogin ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}
              </Text>
              <Text style={[styles.switchLink, { color: theme.colors.primary }, fontStyles.bodyBold]}>
                {isLogin ? t('auth.createAccount') : t('auth.login')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  keyboardView: {
    flex: 1},
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl},
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl},
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8},
  logoImage: {
    width: 80,
    height: 80},
  title: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.sm},
  debugText: {
    fontSize: FontSizes.sm,
    opacity: 0.8,
    marginBottom: Spacing.xs},
  subtitle: {
    fontSize: FontSizes.lg,
    opacity: 0.9},
  formContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8},
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.lg,
    padding: 4,
    marginBottom: Spacing.lg},
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md},
  toggleText: {
    fontSize: FontSizes.md},
  inputContainer: {
    marginBottom: Spacing.lg},
  label: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md},
  passwordContainer: {
    position: 'relative'},
  passwordInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingRight: 50,
    fontSize: FontSizes.md},
  eyeButton: {
    position: 'absolute',
    right: Spacing.md,
    top: Spacing.md,
    padding: Spacing.xs},
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg},
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center'},
  rememberText: {
    fontSize: FontSizes.sm},
  authButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg},
  authButtonText: {
    fontSize: FontSizes.lg},
  switchContainer: {
    alignItems: 'center'},
  switchText: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs},
  switchLink: {
    fontSize: FontSizes.sm}});

export default AuthScreen;

