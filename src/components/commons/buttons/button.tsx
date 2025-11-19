import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const BUTTON_VARIANTS = {
  default:
    'bg-surface text-brand border border-border-primary px-5 py-[9px] w-fit body-md-medium',
  brand: 'bg-brand text-text-on-brand p-3',
  solid: 'bg-button text-text-on-brand p-3',
  outline: 'bg-surface text-primary border border-border-primary p-3',
} as const;

const BUTTON_SIZE = {
  xs: 'p-3 w-[84px]',
  sm: 'p-4 w-[84px]',
  md: 'p-3 w-[138px]',
  lg: 'p-3 w-[284px]',
  xl: 'p-4 w-full rounded-sm body-md-medium',
};

export default function Button({
  children,
  variant = 'default',
  size = 'xs',
  className,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        'body-lg-medium rounded-md',
        BUTTON_SIZE[size],
        BUTTON_VARIANTS[variant],
        disabled && 'bg-disabled border-none text-on-brand',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
