import SpinnerIconLg from '@/assets/spinner/lg.svg';
import SpinnerIconSm from '@/assets/spinner/sm.svg';

interface LoadingSpinnerProps {
  variant: 'sm' | 'lg';
  size?: number;
  className?: string;
}

/**
 * 로딩 스피너 컴포넌트
 * @param variant - sm 또는 lg 아이콘
 * @param size - 로딩 스피너 크기 (lg 기본값: 48, sm 기본값: 16)
 */
export default function LoadingSpinner({
  variant,
  size,
  className = '',
}: LoadingSpinnerProps) {
  const SpinnerIcon = variant === 'sm' ? SpinnerIconSm : SpinnerIconLg;
  const defaultSize = variant === 'sm' ? 16 : 48;

  return (
    <SpinnerIcon
      className={`animate-spin text-primary ${className}`}
      style={{ width: size ?? defaultSize, height: size ?? defaultSize }}
      role="status"
      aria-label="로딩 중"
    />
  );
}
