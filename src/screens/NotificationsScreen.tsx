import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants/colors';
import { Notification } from '../types';
import { FontText } from '../components/FontText';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Welcome to AirLocation!',
    message: 'Hello, welcome to AirLocation 🚗',
    type: 'success',
    isRead: false,
    createdAt: new Date()},
  {
    id: '2',
    userId: '1',
    title: 'Booking Confirmed',
    message: 'Your booking for Toyota Camry has been confirmed',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '3',
    userId: '1',
    title: 'Payment Received',
    message: 'Payment of 150 DA has been received successfully',
    type: 'success',
    isRead: true,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '4',
    userId: '1',
    title: 'Car Available',
    message: 'Your booked car is now available for pickup',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
  },
];

const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      default:
        return 'information-circle';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.warning;
      case 'error':
        return Colors.error;
      default:
        return Colors.info;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return `${days} days ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.isRead ? theme.colors.card : theme.colors.primary + '10'},
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationLeft}>
        <View
          style={[
            styles.notificationIcon,
            { backgroundColor: getNotificationColor(item.type) + '20' },
          ]}
        >
          <Ionicons
            name={getNotificationIcon(item.type) as any}
            size={20}
            color={getNotificationColor(item.type)}
          />
        </View>
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: theme.colors.textPrimary }]}>
            {item.title}
          </Text>
          <Text style={[styles.notificationMessage, { color: theme.colors.textSecondary }]}>
            {item.message}
          </Text>
          <Text style={[styles.notificationDate, { color: theme.colors.textLight }]}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
      {!item.isRead && (
        <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
      )}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
            {t('notifications.title')}
          </Text>
          {unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
              <Text style={[styles.badgeText, { color: theme.colors.white }]}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="notifications-outline"
            size={80}
            color={theme.colors.textLight}
          />
          <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
            {t('notifications.noNotifications')}
          </Text>
          <Text style={[styles.emptyMessage, { color: theme.colors.textSecondary }]}>
            You'll receive notifications about your bookings and app updates here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
  header: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg},
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'},
  headerTitle: {
    fontSize: FontSizes.xxl},
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'},
  badgeText: {
    fontSize: FontSizes.sm},
  notificationsList: {
    padding: Spacing.lg},
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg},
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1},
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md},
  notificationContent: {
    flex: 1},
  notificationTitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs},
  notificationMessage: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.xs},
  notificationDate: {
    fontSize: FontSizes.xs},
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: Spacing.sm},
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl},
  emptyTitle: {
    fontSize: FontSizes.xl,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm},
  emptyMessage: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22}});

export default NotificationsScreen;


