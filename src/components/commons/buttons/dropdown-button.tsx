import clsx from 'clsx';
import type { Ref } from 'react';

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isError?: boolean;
  children?: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * 드롭다운 트리거 버튼
 * @param label - 버튼에 나타낼 라벨
 * @param isError - 에러 여부
 */
export default function DropdownButton({
  children,
  label,
  isError = false,
  ref,
  ...props
}: DropdownButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'py-3 px-4 body-lg-medium bg-container-primary rounded-md flex items-center justify-between w-[180px] outline-none group',
        {
          'border border-bg-error': isError,
        },
      )}
      {...props}
    >
      {label}
      {children}
    </button>
  );
}
