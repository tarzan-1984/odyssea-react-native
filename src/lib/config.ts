/**
 * Application configuration
 * Handles environment variables and fallbacks
 */

// Try to get environment variables from different sources
let API_BASE_URL: string | undefined;

// Method 1: Try @env (react-native-dotenv)
try {
  const envModule = require('@env');
  API_BASE_URL = envModule.API_BASE_URL;
} catch (error) {
  console.warn('Could not load @env module:', error);
}

// Method 2: Try process.env (fallback)
if (!API_BASE_URL) {
  API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  console.log('Loaded API_BASE_URL from process.env:', API_BASE_URL);
}

export const config = {
  API_BASE_URL,
  // Add other config values here as needed
} as const;
