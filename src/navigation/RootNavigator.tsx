import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

// Import navigation stacks
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator - Main navigation container for the entire app
 * Manages the flow between authentication and main application
 */
export default function RootNavigator() {
  // TODO: Add authentication state management here
  // For now, we'll start with Auth flow
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Main" : "Auth"}
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
