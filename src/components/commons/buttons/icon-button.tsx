import clsx from 'clsx';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  isDark?: boolean;
  size: 'sm' | 'md';
}

const BUTTON_VARIANTS: Record<
  IconButtonProps['variant'],
  { base: string; interactive: string }
> = {
  primary: {
    base: 'bg-container-primary',
    interactive:
      'hover:bg-container-primary-hover active:bg-container-primary-pressed',
  },
  secondary: {
    base: 'bg-container-secondary',
    interactive:
      'hover:bg-container-primary active:bg-container-secondary-pressed',
  },
};

const BUTTON_SIZE = {
  sm: 'size-6 p-2',
  md: 'size-7 p-[5px]',
};

export default function IconButton({
  variant,
  size,
  isDark = false,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'rounded-full flex items-center justify-center',
        BUTTON_SIZE[size],
        BUTTON_VARIANTS[variant].base,
        !isDark && BUTTON_VARIANTS[variant].interactive,
        { 'bg-dropdown-white-10': isDark },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
