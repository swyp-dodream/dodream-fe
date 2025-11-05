import clsx from 'clsx';
import { Tabs } from 'radix-ui';
import type { ComponentPropsWithoutRef } from 'react';

function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.Root>) {
  return (
    <Tabs.Root className={clsx('flex flex-col gap-7', className)} {...props} />
  );
}

function List({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.List>) {
  return (
    <Tabs.List
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
}: ComponentPropsWithoutRef<typeof Tabs.Trigger>) {
  return (
    <Tabs.Trigger
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
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.Content> & { columns?: number }) {
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
    <Tabs.Content
      className={clsx('grid gap-7', GRID_COLUMNS[columns], className)}
      {...props}
    />
  );
}

export const MyPageTabs = Object.assign(Root, { List, Trigger, Content });
