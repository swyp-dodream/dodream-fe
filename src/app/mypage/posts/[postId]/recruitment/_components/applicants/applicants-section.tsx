import type { ApplicantRowUserType } from '@/types/my.type';
import ApplicantsRoleTabs from './applicants-role-tabs';

interface ApplicantsSectionProps {
  title: string;
  postId: bigint;
  users: ApplicantRowUserType[];
  emptyMessage: string;
  headerRight?: React.ReactNode;
}

export default function ApplicantsSection({
  title,
  postId,
  emptyMessage,
  users,
  headerRight,
}: ApplicantsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">{title}</h3>

      <ApplicantsRoleTabs
        postId={postId}
        users={users}
        headerRight={headerRight}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
