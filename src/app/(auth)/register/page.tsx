/**
 * Register Page
 * User registration page with optional referral code support
 */

import { RegisterForm } from '@/components/forms';
import { AuthLayout } from '@/components/layout';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join our referral platform and start earning rewards today"
    >
      <RegisterForm />
    </AuthLayout>
  );
}