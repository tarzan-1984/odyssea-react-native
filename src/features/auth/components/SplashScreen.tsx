import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

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
    <View style={styles.container}>
      {/* Logo section with ship icon */}
      <View style={styles.logoSection}>
        <View style={styles.shipIcon}>
          <Text style={styles.shipEmoji}>🚢</Text>
        </View>
        <Text style={styles.logo}>ODYSSEIA</Text>
      </View>

      {/* Delivery van illustration */}
      <View style={styles.illustrationSection}>
        <View style={styles.deliveryVan}>
          <Text style={styles.vanEmoji}>🚚</Text>
          <View style={styles.mapOverlay}>
            <View style={styles.mapPin}>
              <Text style={styles.pinEmoji}>📍</Text>
            </View>
            <View style={styles.mapPin2}>
              <Text style={styles.pinEmoji}>📍</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tire tracks at bottom */}
      <View style={styles.tireTracks}>
        <View style={styles.track} />
        <View style={styles.track} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  shipIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shipEmoji: {
    fontSize: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 2,
  },
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  deliveryVan: {
    position: 'relative',
    alignItems: 'center',
  },
  vanEmoji: {
    fontSize: 120,
    marginBottom: 20,
  },
  mapOverlay: {
    position: 'absolute',
    top: 20,
    right: -30,
    width: 100,
    height: 80,
  },
  mapPin: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  mapPin2: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  pinEmoji: {
    fontSize: 20,
  },
  tireTracks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    marginBottom: 20,
  },
  track: {
    width: 60,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    opacity: 0.6,
  },
});
