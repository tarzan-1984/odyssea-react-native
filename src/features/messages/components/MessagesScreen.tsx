import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * MessagesScreen - Messages screen of the application
 * Placeholder for messages functionality
 */
export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages Screen</Text>
      <Text style={styles.subtitle}>Your messages will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
