/**
 * Purchase Modal Component
 * Modal for handling product purchases with credit application
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, CreditCard, Check, X } from 'lucide-react';
import { Modal, Button, Card } from '@/components/ui';
import { Product, Purchase } from '@/types';
import { useAuthStore, useProductActions, useShowNotification } from '@/stores';
import { REFERRAL_CONFIG } from '@/constants';
import { cn } from '@/utils/cn';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.2 },
  },
};

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [currentStep, setCurrentStep] = useState<'review' | 'payment' | 'success'>('review');
  const [useCredits, setUseCredits] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<Purchase | null>(null);

  const user = useAuthStore((state) => state.user);
  const { purchaseProduct } = useProductActions();
  const { showSuccess, showError } = useShowNotification();

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('review');
      setUseCredits(false);
      setIsProcessing(false);
      setPurchaseResult(null);
    }
  }, [isOpen]);

  if (!product) return null;

  const availableCredits = user?.credits || 0;
  const creditValue = availableCredits * REFERRAL_CONFIG.CREDIT_CONVERSION_RATE;
  const maxCreditsUsable = Math.floor(product.price / REFERRAL_CONFIG.CREDIT_CONVERSION_RATE);
  const creditsToUse = Math.min(availableCredits, maxCreditsUsable);
  const creditDiscount = creditsToUse * REFERRAL_CONFIG.CREDIT_CONVERSION_RATE;
  const finalPrice = product.price - creditDiscount;

  const handlePurchase = async () => {
    setIsProcessing(true);
    setCurrentStep('payment');

    try {
      const result = await purchaseProduct(product.id, useCredits);
      setPurchaseResult(result);
      setCurrentStep('success');
      showSuccess('Purchase Successful!', 'Your purchase has been completed successfully.');
    } catch (error) {
      showError('Purchase Failed', error instanceof Error ? error.message : 'An unexpected error occurred.');
      setCurrentStep('review');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmCredits = () => {
    setUseCredits(true);
    setCurrentStep('payment');
  };

  const handleProceedWithoutCredits = () => {
    setUseCredits(false);
    setCurrentStep('payment');
  };

  const renderReviewStep = () => (
    <motion.div
      key="review"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Product Summary */}
      <Card variant="outlined" className="p-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">${product.price}</span>
              <span className="text-sm text-muted-foreground">• {product.category}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Credits Available */}
      {availableCredits > 0 && (
        <Card variant="outlined" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-success" />
              <span className="font-medium text-foreground">Apply Credits</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {availableCredits} credits available (${creditValue.toFixed(2)} value)
            </span>
          </div>

          <div className="bg-success/5 border border-success/20 rounded-lg p-3">
            <p className="text-sm text-success">
              You can use up to {creditsToUse} credits for a ${creditDiscount.toFixed(2)} discount on this purchase.
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmCredits}
              className="flex-1"
            >
              Use Credits
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleProceedWithoutCredits}
              className="flex-1"
            >
              Pay Full Price
            </Button>
          </div>
        </Card>
      )}

      {/* No Credits Available */}
      {availableCredits === 0 && (
        <div className="text-center py-4">
          <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            No credits available for this purchase.
          </p>
          <Button onClick={() => setCurrentStep('payment')}>
            Proceed to Payment
          </Button>
        </div>
      )}
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      key="payment"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {isProcessing ? (
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          ) : (
            <CreditCard className="h-8 w-8 text-primary" />
          )}
        </div>

        {isProcessing ? (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Processing Payment
            </h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we process your purchase...
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Confirm Purchase
            </h3>

            {/* Price Breakdown */}
            <Card variant="outlined" className="p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Price</span>
                  <span className="font-medium">${product.price}</span>
                </div>

                {useCredits && creditDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits Applied</span>
                    <span className="font-medium text-success">-${creditDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('review')}
                disabled={isProcessing}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handlePurchase}
                loading={isProcessing}
                disabled={isProcessing}
                className="flex-1"
              >
                Complete Purchase
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      key="success"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center py-6"
    >
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-success" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        Purchase Successful!
      </h3>

      {purchaseResult && (
        <div className="space-y-4">
          <Card variant="outlined" className="p-4">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Order ID: {purchaseResult.id}</p>
              <p>Product: {product.name}</p>
              <p>Amount Paid: ${purchaseResult.amount}</p>
              {purchaseResult.creditsUsed > 0 && (
                <p>Credits Used: {purchaseResult.creditsUsed}</p>
              )}
            </div>
          </Card>

          <div className="text-xs text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </div>
        </div>
      )}

      <Button onClick={onClose} className="mt-6">
        Done
      </Button>
    </motion.div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentStep === 'review' ? 'Review Purchase' : currentStep === 'payment' ? 'Payment' : 'Purchase Complete'}
      size="md"
    >
      <div className="min-h-[400px]">
        {currentStep === 'review' && renderReviewStep()}
        {currentStep === 'payment' && renderPaymentStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>
    </Modal>
  );
};