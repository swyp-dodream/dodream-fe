import clsx from 'clsx';
import type { Ref } from 'react';
import ArrowIcon from '@/assets/icons/chevron-down/14.svg';

interface HomeFilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
  className?: string;
}

/**
 * 홈 필터 버튼
 */
export default function HomeFilterButton({
  ref,
  children,
  className,
  ...props
}: HomeFilterButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'py-3 px-4 body-md-medium hover:bg-container-primary rounded-full flex items-center justify-between outline-none gap-2',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
    </button>
  );
}
