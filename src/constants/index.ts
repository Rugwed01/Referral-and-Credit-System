/**
 * Application constants
 * Centralized configuration values used throughout the app
 */

// App configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Referral Credit System',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_TIMEOUT: 10000, // 10 seconds
} as const;

// Validation rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 100,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: {
      UPPERCASE: /[A-Z]/,
      LOWERCASE: /[a-z]/,
      NUMBER: /[0-9]/,
      SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
  REFERRAL_CODE: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
    PATTERN: /^[a-zA-Z0-9]+$/,
  },
} as const;

// Referral system configuration
export const REFERRAL_CONFIG = {
  CREDIT_REWARD: 10, // Credits earned per successful referral
  CREDIT_CONVERSION_RATE: 0.1, // $ value per credit
  CODE_LENGTH: 8,
  LINK_EXPIRY_DAYS: 30,
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

// Notification configuration
export const NOTIFICATION_CONFIG = {
  DEFAULT_DURATION: 5000, // 5 seconds
  MAX_NOTIFICATIONS: 5,
  DURATION_BY_TYPE: {
    success: 4000,
    error: 8000,
    warning: 6000,
    info: 5000,
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFERRAL_CODE: 'referral_code',
  PREFERENCES: 'user_preferences',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  REFERRAL: {
    DATA: '/api/referral/data',
    LINK: '/api/referral/link',
    TRACK: '/api/referral/track',
  },
  PRODUCTS: {
    LIST: '/api/products',
    PURCHASE: '/api/products/purchase',
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You must be logged in to access this feature.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  INVALID_REFERRAL_CODE: 'Invalid referral code.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION: {
    NAME_REQUIRED: 'Name is required.',
    NAME_INVALID: 'Name must contain only letters and spaces.',
    NAME_LENGTH: 'Name must be between 2 and 50 characters.',
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_LENGTH: 'Password must be at least 8 characters long.',
    PASSWORD_WEAK: 'Password must contain uppercase, lowercase, and numbers.',
    REFERRAL_INVALID: 'Referral code must be 6-12 alphanumeric characters.',
  },
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! You have successfully logged in.',
  REGISTER: 'Account created successfully! Welcome to the platform.',
  LOGOUT: 'You have been logged out successfully.',
  REFERRAL_COPIED: 'Referral link copied to clipboard!',
  PURCHASE_COMPLETED: 'Purchase completed successfully!',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
} as const;

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
} as const;

// Modal sizes
export const MODAL_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

// Social sharing platforms
export const SOCIAL_PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
} as const;

// Sample data for development
export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Premium E-book Bundle',
    description: 'Complete collection of programming e-books and resources',
    price: 49.99,
    image: '/products/ebook-bundle.jpg',
    category: 'Digital Products',
  },
  {
    id: '2',
    name: 'SaaS Starter Kit',
    description: 'Complete toolkit for building SaaS applications',
    price: 199.99,
    image: '/products/saas-kit.jpg',
    category: 'Software',
  },
  {
    id: '3',
    name: 'Advanced Course Access',
    description: 'Lifetime access to all premium courses',
    price: 299.99,
    image: '/products/course-access.jpg',
    category: 'Education',
  },
] as const;