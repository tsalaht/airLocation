export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  language: 'en' | 'fr' | 'ar';
  isDarkMode: boolean;
  createdAt: Date;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  pricePerWeek: number;
  images: string[];
  description: string;
  mileage: number;
  gearbox: 'manual' | 'automatic';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  category: 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury' | 'sports';
  availability: 'available' | 'rented' | 'maintenance';
  condition: 'new' | 'good' | 'old' | 'damaged';
  features: string[];
  location: {
    city: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  owner: {
    id: string;
    name: string;
    rating: number;
  };
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  gearbox: string[];
  fuelType: string[];
  availability: string[];
  condition: string[];
  features: string[];
  wilayas?: string[];
}

export interface SearchParams {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  filters?: FilterOptions;
}

export type Language = 'en' | 'fr' | 'ar';

export interface Theme {
  isDark: boolean;
  colors: typeof import('../constants/colors').Colors;
}
