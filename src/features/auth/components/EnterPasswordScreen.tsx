import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import ScreenLayout from './ScreenLayout';
import { borderRadius, colors, fonts, typography, rem, fp, br } from "@/lib";
import { useAuth } from '@/hooks/useAuth';
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
  const { email, message } = route.params;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authState, login, clearError } = useAuth();

  // Simple password validation
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignIn = async () => {
    if (!password.trim()) {
      setLocalError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      setLocalError(null);
      setSuccess(null);
      clearError();
      
      // Send request to backend using new auth service
      const result = await login(email, password);
      
      if (result.success) {
        // Show success message
        setSuccess(result.message || 'Login successful!');
        
        // Redirect to VerifyAccountCodeScreen after 1.5 seconds
        setTimeout(() => {
          navigation.navigate('VerifyAccountCode', { 
            method: 'email', 
            contact: email 
          });
        }, 1000);
      } else {
        setLocalError(result.error || 'Login failed');
      }
      
    } catch (err) {
      // Show the actual error message from backend
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setLocalError(errorMessage);
    }
  };

  const handleFaceID = () => {
    // TODO: Implement Face ID authentication
    console.log('Face ID authentication');
  };

  return (
    <ScreenLayout headerTitle={'Enter Password'} headerButtonText={'Cancel'} onHeaderButtonPress={() => navigation.goBack()} >
          <View style={[styles.container, message && styles.containerWithMessage]}>
            <Text style={styles.title}>Enter Password</Text>
            
            {/* Show message from backend if available */}
            {message && (
              <View style={styles.infoContainer} accessibilityRole="text" accessibilityLabel="Password information">
                <Text style={styles.infoText}>
                  {message}
                </Text>
              </View>
            )}
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  (localError || authState.error) && styles.inputError
                ]}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (localError) setLocalError(null); // Clear error when user types
                  if (authState.error) clearError();
                  if (success) setSuccess(null); // Clear success when user types
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.neutral.white}
                editable={!authState.isLoading}
                accessibilityLabel="Password input"
                accessibilityHint="Enter your password"
              />
              <TouchableOpacity 
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
                testID="show-password-button"
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                accessibilityHint="Toggle password visibility"
              >
                <ShowPassword />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[
                styles.button,
                (!password.trim() || authState.isLoading) && styles.buttonDisabled
              ]}
              onPress={handleSignIn}
              disabled={!password.trim() || authState.isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
              accessibilityHint="Sign in with your password"
            >
              {authState.isLoading ? (
                <ActivityIndicator color={colors.neutral.white} size="small" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Sign in</Text>
                  <ArrowRight />
                </>
              )}
            </TouchableOpacity>
            
            <Text style={[styles.messageText, (localError || authState.error) && styles.errorText, success && styles.successText]}>
              {localError || authState.error || success}
            </Text>
            
            <TouchableOpacity 
              style={styles.forgotWrapper}
              onPress={() => navigation.navigate('ResetPassword')}
            >
              <QuestionIcon />
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
            
            <Text style={styles.faceIDText}>Login using face ID</Text>
            
            <TouchableOpacity 
              style={styles.faceIdButton} 
              onPress={handleFaceID}
              testID="face-id-button"
            >
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
    fontSize: fp(14),
    textAlign: 'center',
    marginTop: rem(8),
    fontFamily: fonts["400"],
    marginBottom: rem(50),
  },
  title: {
    fontSize: fp(22),
    fontFamily: fonts["700"],
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: rem(70),
    lineHeight: fp(35),
  },
  errorText: {
    color: '#FF6B6B',
  },
  successText: {
    color: '#4CAF50',
  },
  faceIDText: {
    fontSize: fp(16),
    color: colors.neutral.white,
    marginBottom: rem(26),
    fontFamily: fonts["400"],
    textAlign: 'center',
  },
  faceIdButton: {
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: rem(70),
    height: rem(70),
    borderRadius: br(10),
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
    marginBottom: rem(20),
  },
  
  forgotText: {
    color: colors.neutral.white,
    fontSize: fp(15),
    fontFamily: fonts["300"],
    letterSpacing: 0.15,
  },
  forgotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rem(8),
    marginBottom: rem(50),
  },
  container: {
    paddingTop: rem(50),
    paddingHorizontal: rem(26),
    flex: 1,
  },
  containerWithMessage: {
    paddingTop: rem(20), // Минимальный отступ когда есть сообщение
  },
  infoContainer: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderColor: '#34C759',
    borderWidth: 1,
    borderRadius: borderRadius.sm10,
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
    marginBottom: rem(16),
  },
  infoText: {
    color: colors.neutral.white,
    fontSize: fp(13),
    fontFamily: fonts["400"],
    textAlign: 'center',
    lineHeight: fp(18),
  },
  inputContainer: {
    position: 'relative',
    marginBottom: rem(20),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.white,
    borderRadius: borderRadius.sm10,
    paddingHorizontal: rem(20),
    paddingRight: rem(50),
    fontSize: fp(16),
    height: 50,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: colors.neutral.white,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 10,
    padding: 5,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
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
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(20),
    marginTop: 'auto',
    marginBottom: rem(50),
  },
  dot: {
    width: rem(10),
    height: rem(10),
    borderRadius: borderRadius.full,
    backgroundColor: '#D5D8FC',
    opacity: 0.2,
  },
  dotActive: {
    backgroundColor: colors.neutral.white,
    opacity: 1,
  },
});
