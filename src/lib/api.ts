import { API_BASE_URL } from '@env';

/**
 * Simple API function for email validation
 */

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        password
      }),
    });

    const data = await response.json();
    
    // If response is not ok, throw error with message
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
