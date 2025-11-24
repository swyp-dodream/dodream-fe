'use client';

import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import useGetMyPostApplications from '@/hooks/my/use-get-my-post-applications';
import useGetMyPostRecommendedApplicants from '@/hooks/my/use-get-my-post-recommended-applicants';
import useToast from '@/hooks/use-toast';
import ApplicantsSection from './applicants/applicants-section';

interface ApplicantsTabContentProps {
  postId: bigint;
}

export default function ApplicantsTabContent({
  postId,
}: ApplicantsTabContentProps) {
  const { data: applications } = useGetMyPostApplications(BigInt(postId));
  const { data: recommendedApplicants } =
    useGetMyPostRecommendedApplicants(postId);

  if (!applications || !recommendedApplicants) return null;

  const invitedApplicants = applications.users.filter(
    (user) => user.suggestionId,
  );

  const appliedApplicants = applications.users.filter(
    (user) => !user.suggestionId,
  );

  // 추천 지원자를 ApplicantsRoleTabs 타입에 맞게 변환
  const transformedRecommended =
    recommendedApplicants?.applicants.map((applicant) => ({
      applicationId: applicant.applicationId,
      userId: applicant.profileId,
      nickname: applicant.nickname,
      profileImage: applicant.profileImageUrl,
      experience: applicant.career,
      role: applicant.role,
      tags: applicant.tags,
    })) ?? [];

  // 추천 지원자의 applicationId 목록
  const recommendedApplicationIds = new Set(
    recommendedApplicants?.applicants.map((applicant) =>
      applicant.applicationId.toString(),
    ) ?? [],
  );

  // 일반 지원자 중 추천 지원자와 겹치지 않는 것만 필터링
  const transformedAppliedApplicants = appliedApplicants
    .filter(
      (applicant) =>
        !recommendedApplicationIds.has(applicant.applicationId.toString()),
    )
    .map((applicant) => ({
      suggestionId: applicant.suggestionId,
      applicationId: applicant.applicationId,
      userId: applicant.userId,
      nickname: applicant.nickname,
      profileImage: applicant.profileImage,
      experience: applicant.experience,
      role: applicant.status,
      tags: applicant.jobGroups,
    }));

  // 내가 제안한 지원자 변환
  const transformedInvitedApplicants = invitedApplicants.map((applicant) => ({
    suggestionId: applicant.suggestionId,
    applicationId: applicant.applicationId,
    userId: applicant.userId,
    nickname: applicant.nickname,
    profileImage: applicant.profileImage,
    experience: applicant.experience,
    role: applicant.status,
    tags: applicant.jobGroups,
  }));

  // 일반 지원자 = 추천 + 나머지
  const allAppliedApplicants = [
    ...transformedRecommended,
    ...transformedAppliedApplicants,
  ];

  return (
    <div className="col-span-full flex flex-col gap-11">
      <ApplicantsSection
        title="내가 제안한 지원자"
        postId={postId}
        users={transformedInvitedApplicants}
        emptyMessage={'합류를 제안한 멤버가 아직 제안에 응답하지 않았습니다'}
      />

      <ApplicantsSection
        title="일반 지원자"
        postId={postId}
        users={allAppliedApplicants}
        emptyMessage={'지원자가 없습니다'}
        headerRight={<AiRecommendHeader />}
      />
    </div>
  );
}

export function AiRecommendHeader() {
  const toast = useToast();

  return (
    <div className="flex items-center gap-3 shrink-0">
      <DefaultTooltip content="지원자 중 모집글에 가장 잘 어울리는 프로필을 가진 지원자를 우선으로 띄워줘요." />
      <button
        type="button"
        className="rounded-full border-2 px-5 py-3 border-border-brand hover:bg-button-ai"
        onClick={() => toast({ title: '추천하는 지원자가 없습니다' })}
      >
        <span className="body-md-medium text-brand">AI 추천</span>
      </button>
    </div>
  );
}
