# AirLocation - Car Rental App for Algeria

A comprehensive car rental mobile application built with React Native and Expo, designed specifically for the Algerian market with support for French, Arabic, and English languages.

## Features

### 🌍 Multi-language Support
- **French** (Français) - Primary language for Algeria
- **Arabic** (العربية) - With RTL (Right-to-Left) layout support
- **English** - International support
- Automatic RTL layout switching for Arabic

### 🎨 Modern UI/UX
- **Brand Colors**: Primary #0897FF, Secondary #00AEEF
- **Dark Mode** support with system preference detection
- **Responsive Design** for mobile and tablet devices
- **Modern UI** with rounded corners, shadows, and smooth animations

### 🔐 Authentication
- Mobile number + password authentication
- Remember login functionality
- Secure storage using Expo SecureStore
- User profile management

### 🚗 Car Rental Features
- **Search & Filter**: Location, dates, price range, car category, gearbox, fuel type
- **Car Categories**: Economy, Compact, Sedan, SUV, Luxury, Sports
- **Car Details**: Images carousel, specifications, owner info, reviews
- **Booking Flow**: Date selection, location picker, payment simulation
- **Booking Management**: View bookings, booking history

### 📱 Core Screens
1. **Splash Screen** - Animated logo and branding
2. **Onboarding** - Language selection and app introduction
3. **Authentication** - Login/Register with mobile number
4. **Home** - Search, featured cars, categories
5. **Car Listing** - Grid/List view with filters
6. **Car Details** - Detailed car information and booking
7. **Booking Flow** - Date/location selection and payment
8. **Profile** - User settings, language switcher, bookings
9. **Notifications** - System messages and booking updates
10. **About** - Company information and contact details

### 🔔 Notification System
- Welcome notifications for new users
- Booking confirmations
- Payment confirmations
- Car availability updates
- Localized notification messages

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **State Management**: React Context API
- **Internationalization**: react-i18next
- **Storage**: Expo SecureStore
- **UI Components**: React Native Paper + Custom Components
- **Icons**: Expo Vector Icons
- **Styling**: StyleSheet with theme system

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/           # Screen components
├── navigation/        # Navigation configuration
├── contexts/          # React Context providers
├── services/          # API and external services
├── utils/             # Utility functions
├── constants/         # App constants and themes
│   ├── colors.ts      # Color palette and theme
│   └── locales/      # Translation files
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── assets/            # Images and icons
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AirLocation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## Configuration

### Language Configuration
The app supports three languages with automatic RTL detection for Arabic:

```typescript
// src/constants/locales/
├── en.json    # English translations
├── fr.json    # French translations
└── ar.json    # Arabic translations
```

### Theme Configuration
The app uses a comprehensive theme system with light/dark mode support:

```typescript
// src/constants/colors.ts
export const Colors = {
  primary: '#0897FF',      // AirLocation blue
  secondary: '#00AEEF',    // Sky blue
  lightGray: '#F5F5F5',    // Balance & clarity
  darkGray: '#333333',     // Professionalism
  white: '#FFFFFF',        // Purity & simplicity
  // ... dark mode colors
};
```

## Key Features Implementation

### RTL Support
- Automatic layout direction switching for Arabic
- Proper text alignment and icon positioning
- RTL-aware navigation and gestures

### Dark Mode
- System preference detection
- Manual toggle in profile settings
- Consistent theming across all components

### Responsive Design
- Mobile-first approach
- Tablet-optimized layouts
- Flexible grid systems

### Security
- Secure storage for sensitive data
- Encrypted user preferences
- Safe authentication flow

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

### State Management
- Context API for global state
- Local state for component-specific data
- Async storage for persistence

### Internationalization
- All user-facing text in translation files
- RTL support for Arabic
- Dynamic language switching

## Future Enhancements

- [ ] Real-time chat with car owners
- [ ] GPS integration for car location
- [ ] Push notifications
- [ ] Payment gateway integration
- [ ] Advanced search filters
- [ ] Car comparison feature
- [ ] Social sharing
- [ ] Offline mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact:
- Email: contact@airlocation.dz
- Phone: +213 123 456 789
- WhatsApp: +213 123 456 789

---

**AirLocation** - Your Journey Starts Here 🚗
