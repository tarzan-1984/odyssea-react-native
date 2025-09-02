import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const { width } = Dimensions.get('window');

/**
 * WelcomeScreen - First screen of auth flow
 * Contains email input and navigation to password screen
 * Based on the design with logo, title, email input, Next button, and Face ID option
 */
export default function WelcomeScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (email.trim()) {
      navigation.navigate('EnterPassword', { email: email.trim() });
    }
  };

  const handleFaceID = () => {
    // TODO: Implement Face ID authentication
    console.log('Face ID authentication');
  };

  return (
    <View style={styles.container}>
      {/* Logo section */}
      <View style={styles.logoSection}>
        <View style={styles.shipIcon}>
          <Text style={styles.shipEmoji}>🚢</Text>
        </View>
        <Text style={styles.logo}>ODYSSEIA</Text>
      </View>
      
      <Text style={styles.title}>Welcome To The Application</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#8E8E93"
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, !email.trim() && styles.buttonDisabled]} 
        onPress={handleNext}
        disabled={!email.trim()}
      >
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceID}>
        <View style={styles.faceIdIcon}>
          <Text style={styles.faceIdEmoji}>👤</Text>
        </View>
        <Text style={styles.faceIdText}>Login using face ID</Text>
      </TouchableOpacity>
      
      {/* Progress dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  shipIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shipEmoji: {
    fontSize: 30,
  },
  logo: {
    ...typography.h2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#000000',
  },
  button: {
    backgroundColor: colors.primary.blue,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.md,
    shadowColor: colors.primary.blue,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    ...typography.button,
  },
  faceIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  faceIdIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  faceIdEmoji: {
    fontSize: 16,
  },
  faceIdText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C7C7CC',
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#007AFF',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
