import { forwardRef } from 'react';

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: React.ReactNode;
}

const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(
  function DropdownButton({ children, label, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className="py-3 px-4 body-lg-medium bg-container-primary rounded-md flex items-center justify-between w-[180px] outline-none group"
        {...props}
      >
        {label}
        {children}
      </button>
    );
  },
);

export default DropdownButton;
