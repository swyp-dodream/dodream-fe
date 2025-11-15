import postApi from '@/apis/post.api';
import { ROLE_LIST } from '@/constants/profile.constant';

interface RecruitStatusProps {
  postId: number;
}

/**
 * 모집자 현황 컴포넌트
 * @param postId - 게시물 ID
 */
export default async function RecruitStatus({ postId }: RecruitStatusProps) {
  const postMembers = await postApi.getPostMembers(postId);

  const membersByJobGroup = postMembers.users.reduce(
    (acc, user) => {
      user.jobGroups.forEach((jobGroup) => {
        if (!acc[jobGroup]) {
          acc[jobGroup] = [];
        }
        acc[jobGroup].push(user);
      });
      return acc;
    },
    {} as Record<string, typeof postMembers.users>,
  );

  return (
    <div className="bg-surface shadow-card py-5 px-6 rounded-md">
      <ul className="flex flex-col [&>li]:relative [&>li]:border-b [&>li]:border-border-primary [&>li:not(:first-child)]:pt-4 [&>li:not(:last-child)]:pb-4 [&>li:last-child]:border-none">
        {ROLE_LIST.map((role) => {
          const members = membersByJobGroup[role.label] || null;

          return (
            <li key={role.label} className="flex items-center">
              <span className="w-[82px] body-lg-medium">{role.label}</span>
              <ul className="flex flex-row-reverse flex-1 justify-end [&>li]:relative [&>li:not(:last-child)]:-ml-3">
                {members?.map((member) => (
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
              <span>{members?.length || 0}/3명</span>
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
