import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';

// Import screens (will be created later)
import SplashScreen from '@/features/auth/components/SplashScreen';
import WelcomeScreen from '@/features/auth/components/WelcomeScreen';
import EnterPasswordScreen from '@/features/auth/components/EnterPasswordScreen';
import ResetPasswordScreen from '@/features/auth/components/ResetPasswordScreen';
import VerifyAccountMethodScreen from '@/features/auth/components/VerifyAccountMethodScreen';
import SendCodeToScreen from '@/features/auth/components/SendCodeToScreen';
import VerifyAccountCodeScreen from '@/features/auth/components/VerifyAccountCodeScreen';
import FinalVerifyScreen from '@/features/auth/components/FinalVerifyScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * AuthStack - Navigation stack for authentication flow
 * Contains all screens related to user authentication and verification
 */
export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="VerifyAccountCode"
      screenOptions={{
        headerShown: false, // Hide header for auth screens
        gestureEnabled: false, // Disable swipe back gesture
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyAccountMethod" component={VerifyAccountMethodScreen} />
      <Stack.Screen name="SendCodeTo" component={SendCodeToScreen} />
      <Stack.Screen name="VerifyAccountCode" component={VerifyAccountCodeScreen} />
      <Stack.Screen name="FinalVerify" component={FinalVerifyScreen} />
    </Stack.Navigator>
  );
}
