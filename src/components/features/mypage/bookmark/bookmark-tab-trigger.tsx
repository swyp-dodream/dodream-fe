import clsx from 'clsx';
import { Tabs } from 'radix-ui';

export interface BookmarkTabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export default function BookmarkTabTrigger({
  value,
  children,
  className,
}: BookmarkTabTriggerProps) {
  return (
    <Tabs.Trigger
      value={value}
      className={clsx(
        'heading-sm px-4 py-2 rounded-md text-subtle data-[state=active]:bg-surface data-[state=active]:shadow-card data-[state=active]:text-primary',
        className,
      )}
    >
      {children}
    </Tabs.Trigger>
  );
}
