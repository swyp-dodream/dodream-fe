'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from 'overlay-kit';
import { Tooltip } from 'radix-ui';
import type React from 'react';
import { NotificationProvider } from '@/hooks/notification/notification-provider';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
      >
        <OverlayProvider>
          <Tooltip.Provider>
            <NotificationProvider>{children}</NotificationProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Tooltip.Provider>
        </OverlayProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
