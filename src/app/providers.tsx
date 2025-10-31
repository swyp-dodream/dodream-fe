'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { OverlayProvider } from 'overlay-kit';
import type React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
    >
      <OverlayProvider>{children}</OverlayProvider>
    </GoogleOAuthProvider>
  );
}
