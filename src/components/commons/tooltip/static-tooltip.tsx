import clsx from 'clsx';

interface StaticTooltipProps {
  children: React.ReactNode;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

/**
 * 항상 표시되는 정적 툴팁 컴포넌트
 * @param children - 툴팁 내용
 * @param side - 툴팁 표시 위치 (기본값: 'top')
 * @param align - 툴팁 정렬 방식 (기본값: 'end')
 * @param sideOffset - 기준 요소와의 간격(px) (기본값: 17)
 * - 사용 시 상위 컴포넌트가 `relative` 요소여야 합니다.
 * - `sideOffset`는 화살표의 높이(9px)를 포함해야 합니다.
 * @example
 * ```jsx
 * <div className="relative">
 *   <Button>저장</Button>
 *   <StaticTooltip>입력한 정보는 나중에 수정 가능해요</StaticTooltip>
 * </div>
 * ```
 */
export function StaticTooltip({
  children,
  side = 'top',
  align = 'end',
  sideOffset = 17,
  className,
}: StaticTooltipProps) {
  const positionClasses = {
    top: 'bottom-full',
    bottom: 'top-full',
  };

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const marginClasses = {
    top: { marginBottom: `${sideOffset}px` },
    bottom: { marginTop: `${sideOffset}px` },
  };

  const arrowClasses = {
    top: 'border-t-[9px] border-t-bg-toast-black-80 -bottom-[9px]',
    bottom: 'border-b-[9px] border-b-bg-toast-black-80 -top-[9px]',
  };

  const arrowAlignClasses = {
    start: 'left-6',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-6',
  };

  return (
    <div
      className={clsx(
        'absolute z-40',
        positionClasses[side],
        alignClasses[align],
        className,
      )}
      style={marginClasses[side]}
    >
      <div className="bg-toast-black-80 text-text-on-brand rounded-md py-3 px-4 w-fit relative">
        <p className="body-md-medium whitespace-nowrap">{children}</p>

        {/* 화살표 (높이 9px) */}
        <div
          className={clsx(
            'absolute w-0 h-0 border-l-[9px] border-r-[9px] border-transparent',
            arrowClasses[side],
            arrowAlignClasses[align],
          )}
        />
      </div>
    </div>
  );
}
