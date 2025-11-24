'use client';

import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import useGenerateMyPostRecommendedApplicants from '@/hooks/my/use-generate-my-post-recommended-applicants';
import useGetMyPostApplications from '@/hooks/my/use-get-my-post-applications';
import useToast from '@/hooks/use-toast';
import type { ApplicantRowUserType } from '@/types/my.type';
import ApplicantsSection from './applicants/applicants-section';

interface ApplicantsTabContentProps {
  postId: bigint;
}

export default function ApplicantsTabContent({
  postId,
}: ApplicantsTabContentProps) {
  const { data: applications } = useGetMyPostApplications(BigInt(postId));
  const toast = useToast();

  const {
    mutate: generateRecommendations,
    data: recommendedApplicants,
    isPending,
  } = useGenerateMyPostRecommendedApplicants(postId);

  if (!applications) return null;

  const invitedApplicants = applications.users.filter(
    (user) => user.suggestionId,
  );

  const appliedApplicants = applications.users.filter(
    (user) => !user.suggestionId,
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

  // AI 추천 버튼 클릭 핸들러
  const handleAiRecommendClick = () => {
    // 이미 데이터가 있으면 토스트만 띄우기 (캐싱)
    if (recommendedApplicants) {
      if (recommendedApplicants.applicants.length === 0) {
        toast({ title: '추천하는 지원자가 없습니다' });
      }
      return;
    }

    // 없으면 새로 생성
    generateRecommendations(undefined, {
      onSuccess: (data) => {
        if (data.applicants.length === 0) {
          toast({ title: '추천하는 지원자가 없습니다' });
        }
      },
      onError: () => {
        toast({
          title: 'AI 추천 선별에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        });
      },
    });
  };

  // 일반 지원자 리스트 구성
  let allAppliedApplicants: ApplicantRowUserType[];

  if (recommendedApplicants) {
    // AI 추천이 있는 경우: 추천 지원자 변환
    const transformedRecommended: ApplicantRowUserType[] =
      recommendedApplicants.applicants.map((applicant) => ({
        applicationId: applicant.applicationId,
        userId: applicant.profileId,
        nickname: applicant.nickname,
        profileImage: applicant.profileImageUrl,
        experience: applicant.career,
        role: applicant.role,
        tags: applicant.tags,
      }));

    // 추천 지원자의 applicationId 목록
    const recommendedApplicationIds = new Set(
      recommendedApplicants.applicants.map((applicant) =>
        applicant.applicationId.toString(),
      ),
    );

    // 일반 지원자 중 추천 지원자와 겹치지 않는 것만 필터링
    const transformedAppliedApplicants: ApplicantRowUserType[] =
      appliedApplicants
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
        }));

    // 추천 + 나머지
    allAppliedApplicants = [
      ...transformedRecommended,
      ...transformedAppliedApplicants,
    ];
  } else {
    // AI 추천이 없는 경우: 모든 일반 지원자
    allAppliedApplicants = appliedApplicants.map((applicant) => ({
      suggestionId: applicant.suggestionId,
      applicationId: applicant.applicationId,
      userId: applicant.userId,
      nickname: applicant.nickname,
      profileImage: applicant.profileImage,
      experience: applicant.experience,
      role: applicant.jobGroups[0],
    }));
  }

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
        headerRight={
          <AiRecommendHeader
            isLoading={isPending}
            onClick={handleAiRecommendClick}
          />
        }
      />
    </div>
  );
}

interface AiRecommendHeaderProps {
  isLoading: boolean;
  onClick: () => void;
}

export function AiRecommendHeader({
  isLoading,
  onClick,
}: AiRecommendHeaderProps) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <DefaultTooltip content="지원자 중 모집글에 가장 잘 어울리는 프로필을 가진 지원자를 우선으로 띄워줘요." />
      <button
        type="button"
        disabled={isLoading}
        className="rounded-full border-2 px-5 py-3 border-border-brand hover:bg-button-ai disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={onClick}
      >
        <span className="body-md-medium text-brand">
          {isLoading ? '추천 중...' : 'AI 추천'}
        </span>
      </button>
    </div>
  );
}
