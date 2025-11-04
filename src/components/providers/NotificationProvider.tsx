/**
 * Notification Provider Component
 * Wraps the app with notification container
 */

'use client';

import { NotificationContainer } from '@/components/ui';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <NotificationContainer />
    </>
  );
};