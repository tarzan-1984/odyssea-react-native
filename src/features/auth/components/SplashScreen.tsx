import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import ScreenLayout from './ScreenLayout';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

/**
 * SplashScreen - Initial screen with app logo and delivery illustration
 * Shows for 2 seconds then navigates to Welcome screen
 * Based on the design with ship logo and delivery van illustration
 */
export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    // Navigate to Welcome screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenLayout>
      <View style={styles.container}>
        
        <View style={styles.imageWrap}>
          <Image
            source={require('../../../../assets/splachImage.png')}
            style={styles.imageStyle}
          />
        </View>
        
        <View style={styles.logoSection}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.logoImage}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 150,
    position: "relative",
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 254,
    height: 92,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 85,
    width: '100%',
    height: 300,
  }
});
