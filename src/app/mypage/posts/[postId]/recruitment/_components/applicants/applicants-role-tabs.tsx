import { useMemo } from 'react';
import ApplyAcceptButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-accept-button';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import RoleTabsHeader from '@/components/features/mypage/my-posts/recruitments/role-tabs-header';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import useGetPostMembers from '@/hooks/post/use-get-post-members';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import type { MyPostApplicantType } from '@/types/my.type';

type ApplicantsRoleTabsProps = {
  postId: bigint;
  users: MyPostApplicantType[];
  headerRight?: React.ReactNode;
};

export default function ApplicantsRoleTabs({
  postId,
  users,
  headerRight,
}: ApplicantsRoleTabsProps) {
  const { data: posts } = useGetPostDetail(BigInt(postId));
  const { data: members } = useGetPostMembers(BigInt(postId));

  // 각 역할별 현재 인원 수 계산
  const currentCounts = useMemo(() => {
    if (!members?.users) return {};

    return members.users.reduce(
      (acc, member) => {
        const role = member.jobGroups?.[0];
        if (role) {
          acc[role] = (acc[role] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [members?.users]);

  // 역할이 꽉 찼는지 확인
  const isRoleFull = (roleName: string) => {
    const role = posts?.roles.find((r) => r.role === roleName);
    if (!role) return false;
    return (currentCounts[roleName] || 0) >= role.headcount;
  };

  if (!posts) return null;

  return (
    <RoleTabs defaultValue={posts.roles[0].role}>
      <RoleTabsHeader
        roles={posts.roles.map((role) => role.role)}
        headerRight={headerRight}
      />
      {posts.roles.map((role) => (
        <RoleTabs.Content key={role.role} value={role.role} columns={8}>
          <div className="grid grid-cols-subgrid col-span-full gap-6 divide-y divide-border-primary">
            {users
              .filter(({ jobGroups }) => jobGroups[0] === role.role)
              .map((user) => (
                <RecruitmentUserRow
                  key={user.suggestionId}
                  {...user}
                  actions={
                    <UserActions>
                      <ApplyDetailButton
                        postId={BigInt(postId)}
                        applicationId={BigInt(user.applicationId)}
                        variant="outline"
                        applicationType="received"
                      />
                      <ApplyAcceptButton
                        isRecruitCompleted={posts.status === 'COMPLETED'}
                        isRoleFull={isRoleFull(user.jobGroups[0])}
                        applicationId={BigInt(user.applicationId)}
                      />
                    </UserActions>
                  }
                />
              ))}
          </div>
        </RoleTabs.Content>
      ))}
    </RoleTabs>
  );
}
