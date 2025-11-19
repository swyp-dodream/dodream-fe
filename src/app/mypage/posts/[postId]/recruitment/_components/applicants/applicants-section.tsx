import useGetMyPostApplications from '@/hooks/my/use-get-my-post-applications';
import ApplicantsRoleTabs from './applicants-role-tabs';

interface ApplicantsSectionProps {
  title: string;
  postId: bigint;
  emptyMessage: string;
  headerRight?: React.ReactNode;
}

export default function ApplicantsSection({
  title,
  postId,
  emptyMessage,
  headerRight,
}: ApplicantsSectionProps) {
  const { data: applications } = useGetMyPostApplications(BigInt(postId));

  if (!applications) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">{title}</h3>

      <ApplicantsRoleTabs
        postId={postId}
        users={applications.users}
        headerRight={headerRight}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
