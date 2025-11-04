/**
 * Referral Link Component
 * Component for displaying and sharing referral links
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Check, ExternalLink } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useReferralActions, useShowNotification } from '@/stores';
import { cn } from '@/utils/cn';

interface ReferralLinkProps {
  referralCode: string;
  referralLink: string;
  className?: string;
}

export const ReferralLink: React.FC<ReferralLinkProps> = ({
  referralCode,
  referralLink,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const { copyReferralLink, shareReferralLink } = useReferralActions();
  const { showSuccess, showError } = useShowNotification();

  const handleCopyLink = async () => {
    try {
      await copyReferralLink();
      setCopied(true);
      showSuccess('Link Copied', 'Referral link copied to clipboard!');

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showError('Copy Failed', 'Failed to copy referral link');
    }
  };

  const handleShare = (platform: string) => {
    try {
      shareReferralLink(platform);
      setShareMenuOpen(false);
    } catch (error) {
      showError('Share Failed', 'Failed to share referral link');
    }
  };

  const copyButtonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const shareMenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const sharePlatforms = [
    { name: 'Twitter', key: 'twitter' },
    { name: 'Facebook', key: 'facebook' },
    { name: 'Email', key: 'email' },
    { name: 'WhatsApp', key: 'whatsapp' },
  ];

  return (
    <Card className={cn('relative', className)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Your Referral Code
            </h3>
            <p className="text-sm text-muted-foreground">
              Share this code with friends to earn rewards
            </p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Share2 className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Referral Code Display */}
        <div className="mb-4">
          <div className="flex items-center justify-center p-4 bg-muted rounded-lg border border-border">
            <span className="text-xl font-mono font-bold text-primary">
              {referralCode}
            </span>
          </div>
        </div>

        {/* Referral Link Display */}
        <div className="mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Full Referral Link
          </label>
          <div className="relative">
            <div className="p-3 bg-background border border-border rounded-lg pr-24 overflow-hidden">
              <p className="text-sm text-muted-foreground truncate font-mono">
                {referralLink}
              </p>
            </div>
            <motion.div
              className="absolute right-2 top-1/2 -translate-y-1/2"
              variants={copyButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                size="sm"
                variant={copied ? 'secondary' : 'primary'}
                onClick={handleCopyLink}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(referralLink, '_blank')}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <div className="relative">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {/* Share Dropdown */}
            {shareMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShareMenuOpen(false)}
                />

                {/* Dropdown Menu */}
                <motion.div
                  className="absolute bottom-full right-0 mb-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20"
                  variants={shareMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-2">
                    {sharePlatforms.map((platform) => (
                      <button
                        key={platform.key}
                        onClick={() => handleShare(platform.key)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                      >
                        Share on {platform.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground">
            <strong>How it works:</strong> When someone signs up using your referral code or link, you'll earn credits that can be used for discounts on future purchases.
          </p>
        </motion.div>
      </div>
    </Card>
  );
};