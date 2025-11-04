/**
 * Referral Store
 * Manages referral data, metrics, and referral link functionality
 */

import { create } from 'zustand';
import { ReferralState, ReferredUser } from '@/types';
import { APP_CONFIG, REFERRAL_CONFIG, STORAGE_KEYS } from '@/constants';
import { useAuthStore } from './authStore';

// Mock data for demonstration
const generateMockReferredUsers = (count: number): ReferredUser[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `referral-${i + 1}`,
    email: `user${i + 1}@example.com`,
    name: `User ${i + 1}`,
    status: Math.random() > 0.3 ? 'converted' : 'pending',
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export const useReferralStore = create<ReferralState>((set, get) => ({
  referralCode: '',
  referralLink: '',
  referredUsers: [],
  totalReferred: 0,
  convertedUsers: 0,
  totalCredits: 0,

  loadReferralData: async () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('User must be authenticated to load referral data');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockReferredUsers = generateMockReferredUsers(Math.floor(Math.random() * 10) + 5);
      const convertedCount = mockReferredUsers.filter(u => u.status === 'converted').length;
      const credits = convertedCount * REFERRAL_CONFIG.CREDIT_REWARD + user.credits;

      const referralLink = `${APP_CONFIG.URL}/register?r=${user.referralCode}`;

      set({
        referralCode: user.referralCode,
        referralLink,
        referredUsers: mockReferredUsers,
        totalReferred: mockReferredUsers.length,
        convertedUsers: convertedCount,
        totalCredits: credits,
      });
    } catch (error) {
      console.error('Failed to load referral data:', error);
      throw new Error('Failed to load referral data');
    }
  },

  copyReferralLink: async () => {
    const { referralLink } = get();

    if (!referralLink) {
      throw new Error('No referral link available');
    }

    try {
      // Check if clipboard API is available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
        } catch (error) {
          throw new Error('Failed to copy referral link');
        } finally {
          textArea.remove();
        }
      }
    } catch (error) {
      console.error('Failed to copy referral link:', error);
      throw new Error('Failed to copy referral link to clipboard');
    }
  },

  shareReferralLink: (platform: string) => {
    const { referralLink, referralCode } = get();
    const user = useAuthStore.getState().user;

    if (!referralLink || !user) {
      throw new Error('No referral link available');
    }

    const shareText = `Join ${APP_CONFIG.NAME} using my referral code: ${referralCode}`;
    const shareUrl = referralLink;

    let url = '';

    switch (platform.toLowerCase()) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Join me on ${APP_CONFIG.NAME}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
      default:
        throw new Error('Unsupported sharing platform');
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  },
}));

// Selectors for efficient state access
export const useReferralCode = () => useReferralStore((state) => state.referralCode);
export const useReferralLink = () => useReferralStore((state) => state.referralLink);
export const useReferredUsers = () => useReferralStore((state) => state.referredUsers);
export const useReferralMetrics = () => useReferralStore((state) => ({
  totalReferred: state.totalReferred,
  convertedUsers: state.convertedUsers,
  totalCredits: state.totalCredits,
}));

// Actions
export const useReferralActions = () => useReferralStore((state) => ({
  loadReferralData: state.loadReferralData,
  copyReferralLink: state.copyReferralLink,
  shareReferralLink: state.shareReferralLink,
}));