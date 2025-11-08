import { Toast as ToastPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef } from 'react';
import CloseButton from '@/components/commons/buttons/close-button';

interface ToastProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  title: string;
}

export default function Toast({ title, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Provider duration={3000} swipeDirection="right">
      <ToastPrimitive.Root
        className="px-5 py-4 flex items-center gap-4 bg-toast-black-80 rounded-md"
        {...props}
      >
        <ToastPrimitive.Close asChild aria-label="Close">
          <CloseButton />
        </ToastPrimitive.Close>
        <ToastPrimitive.Title className="text-on-brand body-md-medium">
          {title}
        </ToastPrimitive.Title>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed left-1/2 z-50 bottom-8 -translate-x-1/2" />
    </ToastPrimitive.Provider>
  );
}
