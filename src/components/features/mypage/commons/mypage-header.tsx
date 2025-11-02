import { Separator } from 'radix-ui';

interface MyPageHeaderProps {
  title: string;
}

export default function MyPageHeader({ title }: MyPageHeaderProps) {
  return (
    <header className="flex flex-col gap-7">
      <h2 className="heading-xl">{title}</h2>

      <Separator.Root className="w-full h-px bg-border-primary" />
    </header>
  );
}
