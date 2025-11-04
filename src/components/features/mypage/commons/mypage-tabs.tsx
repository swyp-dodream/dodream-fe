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
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.Content>) {
  return (
    <Tabs.Content
      className={clsx('grid grid-cols-2 grid-rows-5 gap-7', className)}
      {...props}
    />
  );
}

export const MyPageTabs = Object.assign(Root, { List, Trigger, Content });
