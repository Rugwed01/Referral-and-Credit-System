/**
 * Register Form Component
 * User registration form with validation and optional referral code support
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useAuthStore, useAuthActions, useShowNotification } from '@/stores';
import { validateRegisterForm, getPasswordStrength } from '@/utils/validation';
import { ValidationError, RegisterData } from '@/types';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showSuccess, showError } = useShowNotification();
  const { register } = useAuthActions();
  const isLoading = useAuthStore((state) => state.isLoading);

  // Get referral code from URL if present
  const urlReferralCode = searchParams.get('r') || '';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: urlReferralCode,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Update password strength when password changes
  useEffect(() => {
    setPasswordStrength(getPasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors.find(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  const handleInputBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate field on blur (except confirmPassword which depends on password)
    if (field === 'confirmPassword') {
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        const confirmPasswordError = {
          field: 'confirmPassword',
          message: 'Passwords do not match',
        };
        setErrors(prev => {
          const filtered = prev.filter(e => e.field !== 'confirmPassword');
          return [...filtered, confirmPasswordError];
        });
      }
    } else {
      const registerData: RegisterData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode || undefined,
      };

      const validationErrors = validateRegisterForm(registerData);
      const fieldError = validationErrors.find(e => e.field === field);

      setErrors(prev => {
        const filtered = prev.filter(e => e.field !== field);
        return fieldError ? [...filtered, fieldError] : filtered;
      });
    }
  };

  const getFieldError = (field: keyof FormData) => {
    if (field === 'confirmPassword') {
      if (touched[field] && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        return 'Passwords do not match';
      }
    }

    const error = errors.find(e => e.field === field);
    return touched[field] ? error?.message : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors([{ field: 'confirmPassword', message: 'Passwords do not match' }]);
      setTouched({ ...touched, confirmPassword: true });
      return;
    }

    // Validate all fields
    const registerData: RegisterData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      referralCode: formData.referralCode || undefined,
    };

    const validationErrors = validateRegisterForm(registerData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, email: true, password: true, confirmPassword: true, referralCode: true });
      return;
    }

    try {
      await register(registerData);
      showSuccess('Registration Successful', 'Your account has been created successfully!');
      router.push('/dashboard');
    } catch (error) {
      showError('Registration Failed', error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-destructive';
    if (passwordStrength === 2) return 'bg-warning';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
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
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange('name')}
          onBlur={handleInputBlur('name')}
          error={getFieldError('name')}
          required
          autoComplete="name"
        />
      </motion.div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange('password')}
          onBlur={handleInputBlur('password')}
          error={getFieldError('password')}
          required
          autoComplete="new-password"
        />

        {/* Password Strength Indicator */}
        {formData.password && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Password Strength</span>
              <span className="text-xs text-muted-foreground">{getPasswordStrengthText()}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <motion.div
                className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          onBlur={handleInputBlur('confirmPassword')}
          error={getFieldError('confirmPassword')}
          required
          autoComplete="new-password"
        />
      </motion.div>

      {/* Referral Code Field */}
      <motion.div variants={itemVariants}>
        <Input
          type="text"
          label="Referral Code (Optional)"
          placeholder="Enter referral code if you have one"
          value={formData.referralCode}
          onChange={handleInputChange('referralCode')}
          onBlur={handleInputBlur('referralCode')}
          error={getFieldError('referralCode')}
          autoComplete="off"
        />

        {urlReferralCode && (
          <motion.p
            className="text-xs text-success mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Referral code applied from link
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </motion.div>

      {/* Login Link */}
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
};