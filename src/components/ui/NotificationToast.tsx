/**
 * Notification Toast Component
 * Toast notifications for user feedback
 */

'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotifications, useUIActions } from '@/stores';
import { Notification } from '@/types';
import { cn } from '@/utils/cn';

const toastVariants = {
  hidden: {
    opacity: 0,
    x: 380, // Slide in from right
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    x: 380,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-success" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case 'info':
      return <Info className="h-5 w-5 text-info" />;
  }
};

const getBackgroundColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-success/10 border-success/20';
    case 'error':
      return 'bg-destructive/10 border-destructive/20';
    case 'warning':
      return 'bg-warning/10 border-warning/20';
    case 'info':
      return 'bg-info/10 border-info/20';
  }
};

export const NotificationToast: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { removeNotification } = useUIActions();

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id, removeNotification]);

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={cn(
        'flex items-start space-x-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm max-w-sm',
        getBackgroundColor(notification.type)
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {getIcon(notification.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {notification.title}
        </h4>
        {notification.message && (
          <p className="text-sm text-muted-foreground">
            {notification.message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    </motion.div>
  );
};

export const NotificationContainer: React.FC = () => {
  const notifications = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationToast notification={notification} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};