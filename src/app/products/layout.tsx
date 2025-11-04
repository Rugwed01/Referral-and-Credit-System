/**
 * Products Layout
 * Layout for product pages
 */

import { ReactNode } from 'react';
import { AppShell } from '@/components/layout';
import { useIsAuthenticated } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingLayout } from '@/components/layout';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
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