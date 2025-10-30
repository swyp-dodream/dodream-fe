import clsx from 'clsx';
import SmallCloseIcon from '@/assets/icons/x/12.svg';
import MediumCloseIcon from '@/assets/icons/x/14.svg';

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary';
}

// 버튼 스타일
const BUTTON_STYLES = {
  primary:
    'bg-container-primary hover:bg-container-primary-hover active:bg-container-primary-pressed',
  secondary:
    'bg-container-secondary hover:bg-container-secondary-hover active:bg-container-secondary-pressed',
} as const;

// 아이콘 스타일
const ICON_COLORS = {
  primary: 'text-icon-dark',
  secondary: 'text-icon-light',
} as const;

export default function CloseButton({
  size = 'sm',
  type = 'button',
  variant = 'primary',
  className,
  ...props
}: CloseButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'rounded-full flex items-center justify-center cursor-pointer',
        {
          'w-6 h-6': size === 'sm',
          'w-7 h-7': size === 'md',
        },
        BUTTON_STYLES[variant],
        className,
      )}
      {...props}
    >
      {size === 'sm' ? (
        <SmallCloseIcon className={ICON_COLORS[variant]} />
      ) : (
        <MediumCloseIcon className={ICON_COLORS[variant]} />
      )}
    </button>
  );
}
