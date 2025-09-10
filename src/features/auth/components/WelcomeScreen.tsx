import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { colors, typography, spacing, borderRadius, shadows, fonts } from '@/lib';
import ArrowRight from '@/icons/ArrowRight';
import FaceIdIcon from '@/icons/FaceIdIcon';
import ScreenLayout from './ScreenLayout';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const { width } = Dimensions.get('window');

/**
 * WelcomeScreen - First screen of auth flow
 * Contains email input and navigation to password screen
 * Based on the design with logo, title, email input, Next button, and Face ID option
 */
export default function WelcomeScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Simple email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear any existing error
    setError(null);
    
    // Navigate to password screen with email
    navigation.navigate('EnterPassword', { email: email.trim() });
  };

  const handleFaceID = () => {
    // TODO: Implement Face ID authentication
    console.log('Face ID authentication');
  };

  return (
    <ScreenLayout>
      {/* Logo section */}
      <View style={styles.logoSection}>
        <Image 
          source={require('../../../../assets/logo.png')}
          style={styles.logoImage}
        />
      </View>
      
      <Text style={styles.title}>Welcome to the application</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError
          ]}
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError(null); // Clear error when user types
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={colors.neutral.white}
        />
      </View>
      
      <TouchableOpacity 
        style={[
          styles.button, 
          !email.trim() && styles.buttonDisabled
        ]} 
        onPress={handleNext}
        disabled={!email.trim()}
      >
        <Text style={styles.buttonText}>Next</Text>
        <ArrowRight />
      </TouchableOpacity>
      
      {error && (
        <Text style={[styles.messageText, styles.errorText]}>
          {error}
        </Text>
      )}
      
      <Text style={styles.faceIDText}>Login using face ID</Text>
      
      <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceID}>
        <FaceIdIcon />
      </TouchableOpacity>
      
      {/* Progress dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 54,
  },
  logoImage: {
    width: 213,
    height: 77,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts["700"],
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: 29,
    lineHeight: 35,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.white,
    borderRadius: borderRadius.sm10,
    paddingHorizontal: 20,
    fontSize: 16,
    height: 50,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: colors.neutral.white,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  messageText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: fonts["400"],
  },
  errorText: {
    color: '#FF6B6B',
  },
  successText: {
    color: '#4CAF50',
  },
  button: {
    ...typography.buttonGreen,
  },
  buttonDisabled: {
    ...typography.buttonGreen,
    opacity: 0.8
  },
  buttonText: {
    ...typography.button,
  },
  faceIDText: {
    marginTop: 65,
    fontSize: 16,
    color: colors.neutral.white,
    marginBottom: 26,
    fontFamily: fonts["400"],
    textAlign: 'center',
  },
  faceIdButton: {
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: borderRadius.sm10,
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
    marginBottom: 132,
  },
  
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 'auto',
    marginBottom: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: '#D5D8FC',
    opacity: 0.2,
  },
  dotActive: {
    backgroundColor: colors.neutral.white,
    opacity: 1,
  },
});
