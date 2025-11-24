import type { MyPostApplicantType } from '@/types/my.type';
import ApplicantsRoleTabs from './applicants-role-tabs';

interface ApplicantsSectionProps {
  title: string;
  postId: bigint;
  applicants: MyPostApplicantType[];
  emptyMessage: string;
  headerRight?: React.ReactNode;
}

export default function ApplicantsSection({
  title,
  postId,
  emptyMessage,
  applicants,
  headerRight,
}: ApplicantsSectionProps) {
  if (!applicants) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">{title}</h3>

      <ApplicantsRoleTabs
        postId={postId}
        users={applicants}
        headerRight={headerRight}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
