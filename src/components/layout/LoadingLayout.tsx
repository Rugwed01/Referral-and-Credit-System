/**
 * Loading Layout Component
 * A full-page loading state with spinner
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui';

export const LoadingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </motion.div>
    </div>
  );
};