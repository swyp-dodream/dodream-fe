import { Tabs } from 'radix-ui';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/style.util';

function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.Root>) {
  return (
    <Tabs.Root className={cn('flex h-full flex-col', className)} {...props} />
  );
}

function List({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.List>) {
  return <Tabs.List className={cn('flex gap-3', className)} {...props} />;
}

function Trigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Tabs.Trigger>) {
  return (
    <Tabs.Trigger
      className={cn(
        'px-4 py-3 rounded-full bg-container-primary body-sm-medium data-[state=active]:bg-chip-selected data-[state=active]:text-on-brand',
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
      className={cn('flex-1 min-h-0 overflow-y-auto p-4 pb-6', className)}
      {...props}
    />
  );
}

export const ChatListTabs = Object.assign(Root, { List, Trigger, Content });
