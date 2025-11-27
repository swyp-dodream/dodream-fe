import clsx from 'clsx';
import { Tabs as PrimitiveTabs } from 'radix-ui';
import type { ComponentPropsWithoutRef } from 'react';

function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof PrimitiveTabs.Root>) {
  return (
    <PrimitiveTabs.Root
      className={clsx('flex flex-col gap-7', className)}
      {...props}
    />
  );
}

function List({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof PrimitiveTabs.List>) {
  return (
    <PrimitiveTabs.List
      className={clsx(
        'self-start flex p-3 gap-3 bg-primary rounded-lg',
        className,
      )}
      {...props}
    />
  );
}

function Trigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof PrimitiveTabs.Trigger>) {
  return (
    <PrimitiveTabs.Trigger
      className={clsx(
        'heading-sm px-4 py-2 rounded-md text-subtle data-[state=active]:bg-surface data-[state=active]:shadow-card data-[state=active]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

function Content({
  className,
  columns = 2,
  showPagination = false,
  paginationSlot,
  ...props
}: ComponentPropsWithoutRef<typeof PrimitiveTabs.Content> & {
  columns?: number;
  showPagination?: boolean;
  paginationSlot?: React.ReactNode;
}) {
  const GRID_COLUMNS: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  return (
    <PrimitiveTabs.Content
      className={clsx('grid gap-7', GRID_COLUMNS[columns], className)}
      {...props}
    >
      {props.children}

      {/* 페이지네이션을 그리드의 마지막에 전체 너비로 배치 */}
      {showPagination && paginationSlot && (
        <div className="col-span-full">{paginationSlot}</div>
      )}
    </PrimitiveTabs.Content>
  );
}

export const Tabs = Object.assign(Root, { List, Trigger, Content });
