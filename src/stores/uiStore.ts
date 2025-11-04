/**
 * UI Store
 * Manages global UI state including loading states, notifications, and modals
 */

import { create } from 'zustand';
import { UIState, Notification, ModalState } from '@/types';
import { NOTIFICATION_CONFIG } from '@/constants';

const generateId = () => Math.random().toString(36).substring(7);

export const useUIStore = create<UIState>((set, get) => ({
  isLoading: false,
  notifications: [],
  modals: {
    purchase: false,
    share: false,
    referralSuccess: false,
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = generateId();
    const newNotification: Notification = {
      id,
      duration: notification.duration || NOTIFICATION_CONFIG.DEFAULT_DURATION,
      ...notification,
    };

    set((state) => {
      const updatedNotifications = [...state.notifications, newNotification];

      // Limit the number of notifications
      if (updatedNotifications.length > NOTIFICATION_CONFIG.MAX_NOTIFICATIONS) {
        updatedNotifications.shift();
      }

      return {
        notifications: updatedNotifications,
      };
    });

    // Auto-remove notification after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  openModal: (modal: keyof ModalState) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: true,
      },
    }));
  },

  closeModal: (modal: keyof ModalState) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: false,
      },
    }));
  },

  closeAllModals: () => {
    set({
      modals: {
        purchase: false,
        share: false,
        referralSuccess: false,
      },
    });
  },
}));

// Selectors for specific UI states
export const useGlobalLoading = () => useUIStore((state) => state.isLoading);
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useModals = () => useUIStore((state) => state.modals);

// Selectors for specific modals
export const usePurchaseModal = () => useUIStore((state) => state.modals.purchase);
export const useShareModal = () => useUIStore((state) => state.modals.share);
export const useReferralSuccessModal = () => useUIStore((state) => state.modals.referralSuccess);

// Actions
export const useUIActions = () => useUIStore((state) => ({
  setLoading: state.setLoading,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
}));

// Helper hooks for common UI operations
export const useShowNotification = () => {
  const addNotification = useUIStore((state) => state.addNotification);

  return {
    showSuccess: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'success', title, message, duration }),
    showError: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'error', title, message, duration }),
    showWarning: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'warning', title, message, duration }),
    showInfo: (title: string, message: string, duration?: number) =>
      addNotification({ type: 'info', title, message, duration }),
  };
};

// Helper hooks for modal management
export const useModalActions = () => {
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const closeAllModals = useUIStore((state) => state.closeAllModals);

  return {
    openPurchaseModal: () => openModal('purchase'),
    openShareModal: () => openModal('share'),
    openReferralSuccessModal: () => openModal('referralSuccess'),
    closePurchaseModal: () => closeModal('purchase'),
    closeShareModal: () => closeModal('share'),
    closeReferralSuccessModal: () => closeModal('referralSuccess'),
    closeAllModals,
  };
};