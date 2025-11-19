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

  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">{title}</h3>
      {applications?.users.length === 0 || !applications?.users ? (
        <p className="body-lg-medium text-primary">{emptyMessage}</p>
      ) : (
        <ApplicantsRoleTabs
          postId={postId}
          users={applications.users}
          headerRight={headerRight}
        />
      )}
    </div>
  );
}
