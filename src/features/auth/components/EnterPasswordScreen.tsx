import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'EnterPassword'>;

const { width } = Dimensions.get('window');

/**
 * EnterPasswordScreen - Password input screen
 * User enters password to sign in
 * Based on the design with header, password input, Sign in button, and Face ID option
 */
export default function EnterPasswordScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (password.trim()) {
      // TODO: Implement actual authentication
      navigation.navigate('VerifyAccountMethod');
    }
  };

  const handleFaceID = () => {
    // TODO: Implement Face ID authentication
    console.log('Face ID authentication');
  };

  return (
    <View style={styles.container}>
      {/* Header with title and cancel button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enter Password</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter Password</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#8E8E93"
            autoFocus
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, !password.trim() && styles.buttonDisabled]} 
          onPress={handleSignIn}
          disabled={!password.trim()}
        >
          <Text style={styles.buttonText}>Sign in →</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceID}>
          <View style={styles.faceIdIcon}>
            <Text style={styles.faceIdEmoji}>👤</Text>
          </View>
          <Text style={styles.faceIdText}>Login using face ID</Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress dots */}
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  cancelButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 36,
  },
  inputContainer: {
    marginBottom: 40,
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
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
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
    paddingBottom: 40,
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
