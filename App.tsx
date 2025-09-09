import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import RootNavigator from '@/navigation/RootNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Main App component
 * Sets up the root navigation and status bar
 * Manages splash screen visibility
 */
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'Mulish-Regular': require('./assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Bold': require('./assets/fonts/Mulish-Bold.ttf'),
    'Mulish-SemiBold': require('./assets/fonts/Mulish-SemiBold.ttf'),
    'Mulish-Medium': require('./assets/fonts/Mulish-Medium.ttf'),
    'Mulish-Light': require('./assets/fonts/Mulish-Light.ttf')
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        if (fontsLoaded) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootNavigator />
      <StatusBar style="auto" />
    </View>
  );
}
