import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import CarListScreen from '../screens/CarListScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AboutScreen from '../screens/AboutScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ContactScreen from '../screens/ContactScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import TermsScreen from '../screens/TermsScreen';

type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  CarDetails: undefined;
  Booking: undefined;
  BookingConfirmation: undefined;
  About: undefined;
  PersonalInfo: undefined;
  MyBookings: undefined;
  Contact: undefined;
  Privacy: undefined;
  Terms: undefined;
  Notifications: undefined;
};

type TabsParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

const MainTabs = () => {
  const { isRTL } = useLanguage();
  const { theme } = useTheme();

  return (
    <Tab.Navigator id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={CarListScreen} />
      <Tab.Screen name="Bookings" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
