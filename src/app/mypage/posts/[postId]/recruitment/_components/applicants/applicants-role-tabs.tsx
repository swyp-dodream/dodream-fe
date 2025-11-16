import ApplyAcceptButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-accept-button';

import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import RoleTabsHeader from '@/components/features/mypage/my-posts/recruitments/role-tabs-header';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import { ROLES, type Role } from '@/mocks/posts';
import type { ApplicantsUser } from './types';

type ApplicantsRoleTabsProps = {
  roles: Role[];
  users: ApplicantsUser[];
  headerRight?: React.ReactNode;
};

export default function ApplicantsRoleTabs({
  roles,
  users,
  headerRight,
}: ApplicantsRoleTabsProps) {
  return (
    <RoleTabs defaultValue={roles[0]}>
      <RoleTabsHeader roles={roles} headerRight={headerRight} />
      {ROLES.map((role) => (
        <RoleTabs.Content key={role} value={role} columns={8}>
          <div className="grid grid-cols-subgrid col-span-full gap-6 divide-y divide-border-primary">
            {users
              .filter(({ roleName }) => roleName === role)
              .map((user) => (
                <RecruitmentUserRow
                  key={user.suggestionId}
                  {...user}
                  actions={
                    <UserActions>
                      <ApplyDetailButton applicationId={BigInt(1)} />
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
