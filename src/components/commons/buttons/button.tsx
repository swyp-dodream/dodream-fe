import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'solid' | 'outline';
}

const BUTTON_VARIANTS = {
  default:
    'bg-surface text-brand border border-border-primary w-fit px-5 py-[9px]',
  brand: 'bg-brand text-text-on-brand w-full p-3',
  solid: 'bg-button text-text-on-brand w-full p-3',
  outline: 'bg-surface text-primary border border-border-primary p-3 w-full',
} as const;

export default function Button({
  children,
  variant = 'default',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'body-md-medium cursor-pointer rounded-md',
        BUTTON_VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
