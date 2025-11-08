'use client';

import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import useToast from '@/hooks/use-toast';
import type { Role } from '@/mocks/posts';
import ApplicantsSection from './applicants/applicants-section';
import type { ApplicantsUser } from './applicants/types';

const users: ApplicantsUser[] = [
  {
    suggestionId: 1,
    applicationId: 1,
    userId: 1,
    nickname: '닉네임입니다닉네임입니다',
    profileImage: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    status: 'applied',
    roleName: 'FE',
    tags: ['추천이유태그1', '추천이유태그2'],
    experience: 'new' as const,
  },
  {
    suggestionId: 2,
    applicationId: 2,
    userId: 2,
    nickname: '닉네임입니다닉네임입니다',
    profileImage: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    status: 'withdraw',
    roleName: 'BE',
    tags: ['추천이유태그1', '추천이유태그2'],
    experience: '1to3' as const,
  },
  {
    suggestionId: 3,
    applicationId: 3,
    userId: 3,
    nickname: '닉네임입니다닉네임입니다',
    profileImage: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    status: 'applied',
    roleName: 'PM',
    tags: ['추천이유태그1', '추천이유태그2'],
    experience: '3to5' as const,
  },
  {
    suggestionId: 4,
    applicationId: 4,
    userId: 4,
    nickname: '닉네임입니다닉네임입니다',
    profileImage: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    status: 'applied',
    roleName: 'FE',
    tags: ['추천이유태그1', '추천이유태그2'],
    experience: 'new' as const,
  },
].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export default function ApplicantsTabContent() {
  const toast = useToast();
  const appliedUsers = users.filter(({ status }) => status === 'applied');
  const appliedRoles = [
    ...new Set(appliedUsers.map((user) => user.roleName)),
  ] as Role[];
  const hasApplicants = appliedUsers.length > 0;

  const aiRecommendHeader = (
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

  return (
    <div className="col-span-full flex flex-col gap-11">
      <ApplicantsSection
        title="내가 제안한 지원자"
        roles={appliedRoles}
        users={users}
        isEmpty={!hasApplicants}
        emptyMessage={'합류를 제안한 멤버가 아직 제안에 응답하지 않았습니다'}
      />

      <ApplicantsSection
        title="일반 지원자"
        roles={appliedRoles}
        users={users}
        isEmpty={!hasApplicants}
        emptyMessage={'지원자가 없습니다'}
        headerRight={aiRecommendHeader}
      />
    </div>
  );
}
