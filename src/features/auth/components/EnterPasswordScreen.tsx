import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import ScreenLayout from './ScreenLayout';
import { borderRadius, colors, fonts, typography } from "@/lib";
import { login } from '@/lib/api';
import ArrowRight from "@/icons/ArrowRight";
import QuestionIcon from "@/icons/QuestionIcon";
import FaceIdIcon from "@/icons/FaceIdIcon";
import ShowPassword from "@/icons/ShowPassword";

type Props = NativeStackScreenProps<AuthStackParamList, 'EnterPassword'>;

/**
 * EnterPasswordScreen - Password input screen
 * User enters password to sign in
 * Based on the design with header, password input, Sign in button, and Face ID option
 */
export default function EnterPasswordScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple password validation
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignIn = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError(null);
      
      // Send request to backend
      const response = await login(email, password);
      
      // Log response to console
      console.log('Login response:', response);
      
    } catch (err) {
      // Show the actual error message from backend
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
    }
  };

  const handleFaceID = () => {
    // TODO: Implement Face ID authentication
    console.log('Face ID authentication');
  };

  return (
    <ScreenLayout headerTitle={'Enter Password'} headerButtonText={'Cancel'} onHeaderButtonPress={() => {console.log('qqqqqq');}} >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  error && styles.inputError
                ]}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) setError(null); // Clear error when user types
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.neutral.white}
              />
              <TouchableOpacity 
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <ShowPassword />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[
                styles.button,
                !password.trim() && styles.buttonDisabled
              ]}
              onPress={handleSignIn}
              disabled={!password.trim()}
            >
              <Text style={styles.buttonText}>Sign in</Text>
              <ArrowRight />
            </TouchableOpacity>
            
            {error && (
              <Text style={[styles.messageText, styles.errorText]}>
                {error}
              </Text>
            )}
            
            <TouchableOpacity style={styles.forgotWrapper}>
              <QuestionIcon />
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
            
            <Text style={styles.faceIDText}>Login using face ID</Text>
            
            <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceID}>
              <FaceIdIcon />
            </TouchableOpacity>
          </View>
      
        {/* Progress dots */}
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
    </ScreenLayout>
    
  );
}

const styles = StyleSheet.create({
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
  
  forgotText: {
    color: colors.neutral.white,
    fontSize: 15,
    fontFamily: fonts["300"],
    letterSpacing: 0.15,
  },
  forgotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 50,
  },
  container: {
    paddingTop: 170,
    paddingHorizontal: 26,
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.white,
    borderRadius: borderRadius.sm10,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 16,
    height: 50,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: colors.neutral.white,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 20,
    padding: 5,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  button: {
    ...typography.buttonGreen,
    marginBottom: 50,
  },
  buttonDisabled: {
    ...typography.buttonGreen,
    opacity: 0.8
  },
  buttonText: {
    ...typography.button,
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
