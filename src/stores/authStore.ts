/**
 * Authentication Store
 * Manages user authentication state, login/logout functionality, and session persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginData, RegisterData } from '@/types';
import { STORAGE_KEYS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Simulated API calls (in real app, these would be actual API requests)
const simulateApiCall = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate for demo
        resolve(data);
      } else {
        reject(new Error(ERROR_MESSAGES.NETWORK));
      }
    }, delay);
  });
};

const generateMockUser = (data: RegisterData): User => {
  const id = Math.random().toString(36).substring(7);
  const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  return {
    id,
    email: data.email,
    name: data.name,
    referralCode,
    credits: data.referralCode ? 5 : 0, // Bonus credits for using referral code
    createdAt: new Date().toISOString(),
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          const userData: User = await simulateApiCall({
            id: 'user-' + Math.random().toString(36).substring(7),
            email,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
            credits: Math.floor(Math.random() * 50),
            createdAt: new Date().toISOString(),
          });

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store token (in real app, this would be JWT)
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-jwt-token');

          return userData;
        } catch (error) {
          set({ isLoading: false });
          throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear stored data
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          const newUser = generateMockUser(data);

          await simulateApiCall(newUser, 1500);

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store token
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-jwt-token');

          return newUser;
        } catch (error) {
          set({ isLoading: false });

          if (error instanceof Error) {
            if (error.message.includes('email')) {
              throw new Error(ERROR_MESSAGES.EMAIL_EXISTS);
            }
          }

          throw new Error(ERROR_MESSAGES.SERVER_ERROR);
        }
      },

      refreshToken: async () => {
        const { isAuthenticated, user } = get();

        if (!isAuthenticated || !user) {
          throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }

        try {
          // Simulate token refresh
          await simulateApiCall({ token: 'new-mock-jwt-token' });

          // Update user data (in real app, this would come from the server)
          set({
            user: {
              ...user,
              // Extend session by updating timestamp
            },
          });
        } catch (error) {
          // Token refresh failed, log out user
          get().logout();
          throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for efficient state access
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

// Actions
export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  logout: state.logout,
  register: state.register,
  refreshToken: state.refreshToken,
}));