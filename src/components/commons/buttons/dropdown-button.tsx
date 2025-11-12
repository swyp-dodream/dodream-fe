import clsx from 'clsx';
import { forwardRef } from 'react';

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isError?: boolean;
  children?: React.ReactNode;
}

/**
 * 드롭다운 트리거 버튼
 * @param label - 버튼에 나타낼 라벨
 * @param isError - 에러 여부
 */
const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(
  function DropdownButton({ children, label, isError = false, ...props }, ref) {
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
  },
);

export default DropdownButton;
