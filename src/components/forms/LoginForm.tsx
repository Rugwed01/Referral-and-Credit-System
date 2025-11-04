/**
 * Login Form Component
 * User login form with validation and error handling
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuthStore, useAuthActions, useShowNotification } from '@/stores';
import { validateLoginForm } from '@/utils/validation';
import { ValidationError } from '@/types';

interface FormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { showSuccess, showError } = useShowNotification();
  const { login } = useAuthActions();
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors.find(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  const handleInputBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate field on blur
    const fieldErrors = validateLoginForm(formData.email, formData.password);
    const fieldError = fieldErrors.find(e => e.field === field);

    if (fieldError) {
      setErrors(prev => {
        const filtered = prev.filter(e => e.field !== field);
        return fieldError ? [...filtered, fieldError] : filtered;
      });
    }
  };

  const getFieldError = (field: keyof FormData) => {
    const error = errors.find(e => e.field === field);
    return touched[field] ? error?.message : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validateLoginForm(formData.email, formData.password);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setTouched({ email: true, password: true });
      return;
    }

    try {
      await login(formData.email, formData.password);
      showSuccess('Login Successful', 'Welcome back! You have been logged in.');
      router.push('/dashboard');
    } catch (error) {
      showError('Login Failed', error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange('email')}
          onBlur={handleInputBlur('email')}
          error={getFieldError('email')}
          required
          autoComplete="email"
        />
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange('password')}
          onBlur={handleInputBlur('password')}
          error={getFieldError('password')}
          required
          autoComplete="current-password"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </motion.div>

      {/* Register Link */}
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
};