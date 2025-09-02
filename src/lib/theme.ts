/**
 * Theme configuration for Odyssea application
 * Centralized theme management with colors, typography, and spacing
 */

import { colors } from './colors';

export const theme = {
  colors,
  
  // Typography
  typography: {
    // Headers
    h1: {
      fontSize: 36,
      fontWeight: 'bold' as const,
      color: colors.primary.blue,
      letterSpacing: 2,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      color: colors.primary.blue,
      letterSpacing: 1.5,
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: colors.neutral.black,
    },
    
    // Body text
    body: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.neutral.black,
    },
    bodySecondary: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.neutral.darkGrey,
    },
    
    // Buttons
    button: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: colors.neutral.white,
    },
    buttonSecondary: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.primary.blue,
    },
    
    // Inputs
    input: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.neutral.black,
    },
    placeholder: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.neutral.darkGrey,
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: colors.neutral.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: colors.neutral.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.neutral.black,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;

// Export individual parts for convenience
export const { typography, spacing, borderRadius, shadows } = theme;
