/**
 * Root Layout Component
 * Main application layout with providers and global styles
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { APP_CONFIG } from '@/constants';
import { NotificationProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.NAME,
    template: `%s | ${APP_CONFIG.NAME}`,
  },
  description: 'A modern referral and credit system platform for digital products',
  keywords: ['referral', 'credits', 'digital products', 'e-commerce'],
  authors: [{ name: APP_CONFIG.NAME }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}