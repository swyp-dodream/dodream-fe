'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from 'overlay-kit';
import { Tooltip } from 'radix-ui';
import type React from 'react';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
      >
        <OverlayProvider>
          <Tooltip.Provider>{children}</Tooltip.Provider>
        </OverlayProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
