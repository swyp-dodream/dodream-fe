import type { ReactNode } from 'react';
import { cn } from '@/utils/style.util';

type LegalOrderedListProps = {
  children: ReactNode;
  variant?: 'default' | 'compact';
  depth?: number;
};

export function LegalOrderedList({
  children,
  variant = 'default',
  depth = 1,
}: LegalOrderedListProps) {
  return (
    <ol
      className={cn(
        'flex flex-col',
        variant === 'compact' ? 'gap-3' : 'gap-4',
        depth > 1 && 'pt-4',
      )}
    >
      {children}
    </ol>
  );
}
