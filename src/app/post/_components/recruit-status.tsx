'use client';

import useGetPostMembers from '@/hooks/post/use-get-post-members';

interface RecruitStatusProps {
  postId: number;
  roles: {
    role: string;
    headcount: number;
  }[];
}

/**
 * 모집자 현황 컴포넌트
 * @param postId - 게시물 ID
 * @param roles - 모집중인 직군 리스트
 */
export default function RecruitStatus({ postId, roles }: RecruitStatusProps) {
  const { data: postMembers } = useGetPostMembers(postId);

  if (!postMembers) return null;

  return (
    <div className="bg-surface shadow-card py-5 px-6 rounded-md">
      <ul className="flex flex-col [&>li]:relative [&>li]:border-b [&>li]:border-border-primary [&>li:not(:first-child)]:pt-4 [&>li:not(:last-child)]:pb-4 [&>li:last-child]:border-none">
        {roles.map((roleInfo) => {
          // 해당 직군을 가진 멤버들만 필터링
          const membersForRole = postMembers?.users.filter((member) =>
            member.jobGroups.includes(roleInfo.role),
          );

          return (
            <li key={roleInfo.role} className="flex items-center">
              <span className="w-[82px] body-lg-medium">{roleInfo.role}</span>
              <ul className="flex flex-row-reverse flex-1 justify-end [&>li]:relative [&>li:not(:last-child)]:-ml-3">
                {membersForRole.map((member) => (
                  <MemberInfo
                    key={member.userId}
                    member={{
                      id: member.userId,
                      nickname: member.nickname,
                      profileUrl: member.profileImage,
                    }}
                  />
                ))}
              </ul>
              <span>
                {membersForRole.length}/{roleInfo.headcount}명
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface MemberInfoProps {
  member: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
}

/**
 * 개별 멤버 컴포넌트
 * @param member.id - 멤버 ID
 * @param member.nickname - 멤버 닉네임
 * @param member.profileUrl - 멤버 프로필 이미지
 */
function MemberInfo({ member }: MemberInfoProps) {
  return (
    <li className="relative group">
      <div className="bg-primary rounded-full w-8 h-8 border border-white" />
      <span className="absolute hidden group-hover:block top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 body-sm-regular text-text-on-brand bg-toast-black-80 px-3 py-2 rounded-md">
        {member.nickname}
      </span>
    </li>
  );
}
