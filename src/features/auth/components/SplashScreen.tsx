import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { rem, fp, br } from '@/lib';
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
    <View style={styles.wrapper}>
      <Image
        source={require('../../../../assets/splachImageBgr.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <View style={styles.logoSection}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.logoImage}
          />
        </View>
        
        <View style={styles.splashImageWrap}>
          <Image
            source={require('../../../../assets/splachImage.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashImageWrap: {
    marginTop: rem(80),
    justifyContent: 'center',
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: "relative",
    zIndex: 2,
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: rem(254),
    height: rem(92),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rem(85),
    width: '100%',
    height: rem(300),
  }
});
