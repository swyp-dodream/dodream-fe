import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'solid' | 'outline';
}

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
        {
          'bg-surface text-brand border border-border-primary w-fit px-5 py-[9px]':
            variant === 'default',
          'bg-brand text-text-on-brand w-full p-3': variant === 'brand',
          'bg-button text-text-on-brand w-full p-3': variant === 'solid',
          'bg-surface text-primary border border-border-primary p-3 w-full':
            variant === 'outline',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
