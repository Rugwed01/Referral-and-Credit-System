/**
 * Modal Component
 * An accessible modal component with focus management and animations
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ModalProps } from '@/types';

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          variants={backdropVariants}
          onClick={handleBackdropClick}
          data-testid="modal-backdrop"
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          className={cn(
            'relative w-full mx-4 my-8 bg-background rounded-lg shadow-xl max-h-[90vh] overflow-hidden',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            modalSizes[size]
          )}
          variants={modalVariants}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || onClose) && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};