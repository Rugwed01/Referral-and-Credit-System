/**
 * Product Store
 * Manages product catalog, purchase flow, and purchase history
 */

import { create } from 'zustand';
import { ProductState, Product, Purchase } from '@/types';
import { SAMPLE_PRODUCTS, REFERRAL_CONFIG } from '@/constants';
import { useAuthStore } from './authStore';

// Mock purchase history generation
const generateMockPurchaseHistory = (userId: string): Purchase[] => {
  const purchases: Purchase[] = [];
  const numPurchases = Math.floor(Math.random() * 5);

  for (let i = 0; i < numPurchases; i++) {
    const product = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
    purchases.push({
      id: `purchase-${i + 1}`,
      userId,
      productId: product.id,
      amount: product.price,
      creditsUsed: Math.floor(Math.random() * 10) * 5,
      status: 'completed',
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return purchases;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  purchaseHistory: [],
  isLoading: false,

  loadProducts: async () => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));

      // In a real app, this would fetch from an API
      // For now, we use the sample products
      set({
        products: [...SAMPLE_PRODUCTS],
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load products:', error);
      set({ isLoading: false });
      throw new Error('Failed to load products');
    }
  },

  purchaseProduct: async (productId: string, useCredits: boolean = false) => {
    const { products, purchaseHistory } = get();
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('User must be authenticated to make a purchase');
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    try {
      // Simulate purchase processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      let creditsUsed = 0;
      let finalAmount = product.price;

      if (useCredits) {
        const availableCredits = user.credits;
        const creditValue = availableCredits * REFERRAL_CONFIG.CREDIT_CONVERSION_RATE;

        creditsUsed = Math.min(availableCredits, Math.floor(product.price / REFERRAL_CONFIG.CREDIT_CONVERSION_RATE));
        finalAmount = Math.max(0, product.price - (creditsUsed * REFERRAL_CONFIG.CREDIT_CONVERSION_RATE));
      }

      const newPurchase: Purchase = {
        id: `purchase-${Date.now()}`,
        userId: user.id,
        productId,
        amount: finalAmount,
        creditsUsed,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };

      // Update purchase history
      set({
        purchaseHistory: [newPurchase, ...purchaseHistory],
      });

      // Update user credits if used
      if (useCredits && creditsUsed > 0) {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.setState({
            user: {
              ...currentUser,
              credits: currentUser.credits - creditsUsed,
            },
          });
        }
      }

      return newPurchase;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw new Error('Purchase failed. Please try again.');
    }
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },
}));

// Selectors for efficient state access
export const useProducts = () => useProductStore((state) => state.products);
export const useSelectedProduct = () => useProductStore((state) => state.selectedProduct);
export const usePurchaseHistory = () => useProductStore((state) => state.purchaseHistory);
export const useProductLoading = () => useProductStore((state) => state.isLoading);

// Computed selectors
export const useProductById = (productId: string) =>
  useProductStore((state) => state.products.find(p => p.id === productId));

export const useTotalSpent = () =>
  useProductStore((state) =>
    state.purchaseHistory.reduce((total, purchase) => total + purchase.amount, 0)
  );

export const useTotalCreditsUsed = () =>
  useProductStore((state) =>
    state.purchaseHistory.reduce((total, purchase) => total + purchase.creditsUsed, 0)
  );

// Actions
export const useProductActions = () => useProductStore((state) => ({
  loadProducts: state.loadProducts,
  purchaseProduct: state.purchaseProduct,
  setSelectedProduct: state.setSelectedProduct,
}));