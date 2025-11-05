import * as Progress from '@radix-ui/react-progress';
import clsx from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

/**
 * Progress Bar 컴포넌트
 * @param value - 현재 진행률 값
 * @param max - 최댓값 (기본값: 100)
 */
export default function ProgressBar({
  value,
  max = 100,
  className,
}: ProgressBarProps) {
  return (
    <Progress.Root
      className={clsx(
        'relative overflow-hidden bg-border-primary rounded-full w-[180px] h-2',
        className,
      )}
      value={value}
      max={max}
      aria-label="진행률"
    >
      <Progress.Indicator
        className="bg-border-dark w-full h-full rounded-full"
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </Progress.Root>
  );
}
