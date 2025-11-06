import { Separator } from 'radix-ui';

interface MyPageHeaderProps {
  title: string;
  isRecruitmentPage?: boolean;
}

export default function MyPageHeader({
  title,
  isRecruitmentPage = false,
}: MyPageHeaderProps) {
  return (
    <header className="flex flex-col gap-7">
      <h2 className="heading-xl">{title}</h2>

      {!isRecruitmentPage && (
        <Separator.Root className="w-full h-px bg-border-primary" />
      )}
    </header>
  );
}
