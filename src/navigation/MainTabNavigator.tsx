import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/types/navigation';

// Import main app screens (will be created later)
import HomeScreen from '@/features/home/components/HomeScreen';
import MessagesScreen from '@/features/messages/components/MessagesScreen';
import ProfileScreen from '@/features/profile/components/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * MainTabNavigator - Bottom tab navigation for main application
 * Contains Home, Messages, and Profile tabs
 */
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for tab screens
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#007AFF', // Blue color for active tab
        tabBarInactiveTintColor: '#8E8E93', // Gray color for inactive tab
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon will be added when we create the actual screens
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
