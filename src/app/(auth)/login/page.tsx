/**
 * Login Page
 * User authentication page
 */

import { LoginForm } from '@/components/forms';
import { AuthLayout } from '@/components/layout';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to access your dashboard and referral tools"
    >
      <LoginForm />
    </AuthLayout>
  );
}