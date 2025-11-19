import ApplyAcceptButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-accept-button';

import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import RoleTabsHeader from '@/components/features/mypage/my-posts/recruitments/role-tabs-header';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import type { MyPostApplicantType } from '@/types/my.type';

type ApplicantsRoleTabsProps = {
  roles: string[];
  postId: bigint;
  users: MyPostApplicantType[];
  headerRight?: React.ReactNode;
};

export default function ApplicantsRoleTabs({
  roles,
  postId,
  users,
  headerRight,
}: ApplicantsRoleTabsProps) {
  return (
    <RoleTabs defaultValue={roles[0]}>
      <RoleTabsHeader roles={roles} headerRight={headerRight} />
      {roles.map((role) => (
        <RoleTabs.Content key={role} value={role} columns={8}>
          <div className="grid grid-cols-subgrid col-span-full gap-6 divide-y divide-border-primary">
            {users
              .filter(({ jobGroups }) => jobGroups[0] === role)
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
                      <ApplyAcceptButton />
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
