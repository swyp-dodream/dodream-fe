'use client';

import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import Toast from '@/components/commons/toast';

interface ToastOptions {
  title: string;
  duration?: number;
}

export default function useToast() {
  return useCallback(({ title }: ToastOptions) => {
    const overlayId = overlay.open(({ isOpen, close }) => (
      <Toast
        open={isOpen}
        onOpenChange={(next) => {
          if (!next) close();
        }}
        title={title}
      />
    ));

    return () => overlay.close(overlayId);
  }, []);
}
