/**
 * Core type definitions for the Referral & Credit System
 * This file contains all the main interfaces used throughout the application
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  referralCode: string;
  credits: number;
  createdAt: string;
}

// Referral types
export interface ReferredUser {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'converted';
  createdAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Purchase types
export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  creditsUsed: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Form types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}

// UI State types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface ModalState {
  purchase: boolean;
  share: boolean;
  referralSuccess: boolean;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: ValidationError[];
  touched: Record<string, boolean>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Store state types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface ReferralState {
  referralCode: string;
  referralLink: string;
  referredUsers: ReferredUser[];
  totalReferred: number;
  convertedUsers: number;
  totalCredits: number;
  loadReferralData: () => Promise<void>;
  copyReferralLink: () => Promise<void>;
  shareReferralLink: (platform: string) => void;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  purchaseHistory: Purchase[];
  isLoading: boolean;
  loadProducts: () => Promise<void>;
  purchaseProduct: (productId: string, useCredits: boolean) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}

export interface UIState {
  isLoading: boolean;
  notifications: Notification[];
  modals: ModalState;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  closeModal: (modal: keyof ModalState) => void;
  openModal: (modal: keyof ModalState) => void;
  clearNotifications: () => void;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;