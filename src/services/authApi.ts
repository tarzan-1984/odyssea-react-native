import { API_BASE_URL } from '@/lib/config';

export interface CheckEmailResponse {
  data: {
    message: string;
    redirectUrl: string;
  };
  timestamp: string;
  path: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    data?: {
      accessToken: string;
      refreshToken: string;
      user: any;
      message?: string;
    };
  };
  error?: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  message?: string;
  data?: {
    data?: {
      accessToken: string;
      refreshToken: string;
      user: any;
    };
  };
  error?: string;
}

class AuthApiService {
  private baseUrl: string;

  constructor() {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not defined in environment variables');
    }
    this.baseUrl = API_BASE_URL;
    console.log('AuthApiService initialized with baseUrl:', this.baseUrl);
  }

  /**
   * Check if email exists and handle password generation/sending
   * @param email - User's email address
   * @returns Promise with check result
   */
  async checkEmailAndGeneratePassword(email: string): Promise<CheckEmailResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/auth/login_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('data++++++', data);
      
      return data;
    } catch (error) {
      console.error('Auth API Error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Network error occurred while checking email'
      );
    }
  }

  /**
   * Login with email and password
   * @param email - User's email
   * @param password - User's password
   * @returns Promise with login result
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/auth/login_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login API Error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Network error occurred during login'
      );
    }
  }

  /**
   * Verify OTP code
   * @param email - User's email
   * @param otpCode - OTP code
   * @returns Promise with verification result
   */
  async verifyOtp(email: string, otpCode: string): Promise<OtpVerificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('OTP Verification API Error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Network error occurred during OTP verification'
      );
    }
  }
}

export const authApi = new AuthApiService();
