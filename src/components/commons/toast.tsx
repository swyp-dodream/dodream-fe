import { Toast as ToastPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef } from 'react';
import XIcon from '@/assets/icons/x/12.svg';
import IconButton from '@/components/commons/buttons/icon-button';

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
          <IconButton variant="secondary" size="sm" isDark aria-hidden>
            <XIcon className="text-icon-white" />
          </IconButton>
        </ToastPrimitive.Close>
        <ToastPrimitive.Title className="text-on-brand body-md-medium">
          {title}
        </ToastPrimitive.Title>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed left-1/2 z-50 bottom-8 -translate-x-1/2" />
    </ToastPrimitive.Provider>
  );
}
