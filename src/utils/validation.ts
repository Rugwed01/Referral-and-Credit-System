/**
 * Validation Utilities
 * Client-side validation functions with proper error handling
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from '@/constants';

/**
 * Validates an email address
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED;
  }

  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.EMAIL_INVALID;
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return ERROR_MESSAGES.VALIDATION.EMAIL_INVALID;
  }

  return null;
};

/**
 * Validates a password according to strength requirements
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED;
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_LENGTH;
  }

  if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_LENGTH;
  }

  if (!VALIDATION_RULES.PASSWORD.PATTERN.UPPERCASE.test(password)) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK;
  }

  if (!VALIDATION_RULES.PASSWORD.PATTERN.LOWERCASE.test(password)) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK;
  }

  if (!VALIDATION_RULES.PASSWORD.PATTERN.NUMBER.test(password)) {
    return ERROR_MESSAGES.VALIDATION.PASSWORD_WEAK;
  }

  return null;
};

/**
 * Validates a name field
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return ERROR_MESSAGES.VALIDATION.NAME_REQUIRED;
  }

  if (name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.NAME_LENGTH;
  }

  if (name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.NAME_LENGTH;
  }

  if (!VALIDATION_RULES.NAME.PATTERN.test(name)) {
    return ERROR_MESSAGES.VALIDATION.NAME_INVALID;
  }

  return null;
};

/**
 * Validates a referral code
 */
export const validateReferralCode = (code: string): string | null => {
  if (!code.trim()) {
    return null; // Referral code is optional
  }

  if (code.length < VALIDATION_RULES.REFERRAL_CODE.MIN_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.REFERRAL_INVALID;
  }

  if (code.length > VALIDATION_RULES.REFERRAL_CODE.MAX_LENGTH) {
    return ERROR_MESSAGES.VALIDATION.REFERRAL_INVALID;
  }

  if (!VALIDATION_RULES.REFERRAL_CODE.PATTERN.test(code)) {
    return ERROR_MESSAGES.VALIDATION.REFERRAL_INVALID;
  }

  return null;
};

/**
 * Validates login form data
 */
export const validateLoginForm = (email: string, password: string) => {
  const errors = [];

  const emailError = validateEmail(email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }

  return errors;
};

/**
 * Validates registration form data
 */
export const validateRegisterForm = (data: {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}) => {
  const errors = [];

  const nameError = validateName(data.name);
  if (nameError) {
    errors.push({ field: 'name', message: nameError });
  }

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }

  const referralError = validateReferralCode(data.referralCode || '');
  if (referralError) {
    errors.push({ field: 'referralCode', message: referralError });
  }

  return errors;
};

/**
 * Checks if password meets strength requirements
 */
export const isPasswordStrong = (password: string): boolean => {
  return (
    password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH &&
    VALIDATION_RULES.PASSWORD.PATTERN.UPPERCASE.test(password) &&
    VALIDATION_RULES.PASSWORD.PATTERN.LOWERCASE.test(password) &&
    VALIDATION_RULES.PASSWORD.PATTERN.NUMBER.test(password)
  );
};

/**
 * Gets password strength indicator (0-4)
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH) strength++;
  if (VALIDATION_RULES.PASSWORD.PATTERN.UPPERCASE.test(password)) strength++;
  if (VALIDATION_RULES.PASSWORD.PATTERN.LOWERCASE.test(password)) strength++;
  if (VALIDATION_RULES.PASSWORD.PATTERN.NUMBER.test(password)) strength++;
  if (VALIDATION_RULES.PASSWORD.PATTERN.SPECIAL.test(password)) strength++;

  return Math.min(strength, 4);
};