/**
 * Dashboard Layout
 * Protected layout for dashboard pages
 */

import { ReactNode } from 'react';
import { AppShell } from '@/components/layout';
import { useIsAuthenticated } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingLayout } from '@/components/layout';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingLayout />;
  }

  return <AppShell>{children}</AppShell>;
}