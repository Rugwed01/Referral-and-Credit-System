/**
 * Store exports
 * Centralized export point for all Zustand stores
 */

// Auth store
export {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthActions,
} from './authStore';

// Referral store
export {
  useReferralStore,
  useReferralCode,
  useReferralLink,
  useReferredUsers,
  useReferralMetrics,
  useReferralActions,
} from './referralStore';

// Product store
export {
  useProductStore,
  useProducts,
  useSelectedProduct,
  usePurchaseHistory,
  useProductLoading,
  useProductById,
  useTotalSpent,
  useTotalCreditsUsed,
  useProductActions,
} from './productStore';

// UI store
export {
  useUIStore,
  useGlobalLoading,
  useNotifications,
  useModals,
  usePurchaseModal,
  useShareModal,
  useReferralSuccessModal,
  useUIActions,
  useShowNotification,
  useModalActions,
} from './uiStore';