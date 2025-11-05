import clsx from 'clsx';
import { Tooltip } from 'radix-ui';
import AlertCircleIcon from '@/assets/icons/alert-circle/16.svg';

interface DefaultTooltipProps {
  children?: React.ReactNode;
  content: React.ReactNode;
  sideOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

/**
 * 디폴트 툴팁 컴포넌트
 * @param children - 트리거 요소 (기본값: alert-circle 아이콘)
 * @param content - 툴팁 내용
 * @param sideOffset - 기준 요소와의 간격(px) (기본값: 16)
 * @param side - 툴팁 정렬 방식 (기본값: 'top')
 * @param className - Content에 적용되는 추가 스타일 클래스
 */
export default function DefaultTooltip({
  content,
  children,
  sideOffset = 16,
  side = 'top',
  className,
}: DefaultTooltipProps) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        {children ?? (
          <button aria-label="도움말" type="button" className="w-fit h-fit">
            <AlertCircleIcon className="text-icon-light" aria-hidden="true" />
          </button>
        )}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={sideOffset}
          className={clsx(
            'bg-toast-black-80 text-text-on-brand rounded-md py-4 px-5 w-fit max-w-[232px]',
            className,
          )}
        >
          <p className="body-sm-regular">{content}</p>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
