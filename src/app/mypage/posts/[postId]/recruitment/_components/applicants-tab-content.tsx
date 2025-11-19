'use client';

import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import useGetMyPostApplications from '@/hooks/my/use-get-my-post-applications';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import useToast from '@/hooks/use-toast';
import ApplicantsSection from './applicants/applicants-section';

interface ApplicantsTabContentProps {
  postId: bigint;
}

export default function ApplicantsTabContent({
  postId,
}: ApplicantsTabContentProps) {
  const { data: applications } = useGetMyPostApplications(BigInt(postId));
  const { data: posts } = useGetPostDetail(BigInt(postId));

  const appliedRoles = posts?.roles.map((role) => role.role);

  return (
    <div className="col-span-full flex flex-col gap-11">
      {/* TODO: 내가 제안한 지원자 */}
      {/* <ApplicantsSection
        title="내가 제안한 지원자"
        roles={appliedRoles}
        users={users}
        isEmpty={!hasApplicants}
        emptyMessage={'합류를 제안한 멤버가 아직 제안에 응답하지 않았습니다'}
      /> */}

      <ApplicantsSection
        title="일반 지원자"
        postId={postId}
        roles={appliedRoles ?? []}
        users={applications?.users ?? []}
        isEmpty={applications?.users.length === 0 || !applications?.users}
        emptyMessage={'지원자가 없습니다'}
        // TODO: AI 추천 지원자
        // headerRight={<AiRecommendHeader />}
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
