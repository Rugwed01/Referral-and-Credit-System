/**
 * Auth Layout Component
 * Centered layout for authentication pages (login, register)
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackToHome = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Brand */}
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4 mx-auto">
              <span className="text-2xl font-bold text-primary-foreground">
                RS
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Auth Form */}
        <motion.div
          className="bg-card rounded-xl shadow-lg border border-border p-6"
          variants={itemVariants}
        >
          {children}
        </motion.div>

        {/* Back to Home */}
        {showBackToHome && (
          <motion.div
            className="text-center mt-6"
            variants={itemVariants}
          >
            <Link
              href="/"
              className={cn(
                'text-sm text-muted-foreground hover:text-foreground transition-colors'
              )}
            >
              ← Back to {APP_CONFIG.NAME}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};