// applicants-section.tsx (수정됨)
import ApplicantsRoleTabs from './applicants-role-tabs';

interface ApplicantsSectionProps {
  title: string;
  postId: bigint;
  users: {
    suggestionId?: bigint;
    applicationId: bigint;
    userId: bigint;
    nickname: string;
    profileImage: string;
    experience: string;
    role: string;
    tags: string[];
  }[];
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
