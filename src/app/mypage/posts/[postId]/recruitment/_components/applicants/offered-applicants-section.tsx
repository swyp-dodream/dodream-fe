import useGetMyPostApplications from '@/hooks/my/use-get-my-post-applications';
import type { ApplicantRowUserType } from '@/types/my.type';
import ApplicantsRoleTabs from './applicants-role-tabs';

interface OfferedApplicantsSectionProps {
  postId: bigint;
}

export default function OfferedApplicantsSection({
  postId,
}: OfferedApplicantsSectionProps) {
  const { data: applications } = useGetMyPostApplications(BigInt(postId));

  if (!applications) return null;

  const invitedApplicants = applications.users.filter(
    (user) => user.suggestionId,
  );

  // 내가 제안한 지원자 변환
  const transformedInvitedApplicants: ApplicantRowUserType[] =
    invitedApplicants.map((applicant) => ({
      suggestionId: applicant.suggestionId,
      applicationId: applicant.applicationId,
      userId: applicant.userId,
      nickname: applicant.nickname,
      profileImage: applicant.profileImage,
      experience: applicant.experience,
      role: applicant.jobGroups[0],
    }));

  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">내가 제안한 지원자</h3>
      <ApplicantsRoleTabs
        postId={postId}
        users={transformedInvitedApplicants}
        emptyMessage="합류를 제안한 멤버가 아직 제안에 응답하지 않았습니다"
      />
    </div>
  );
}
