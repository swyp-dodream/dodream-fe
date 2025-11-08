import ApplyAcceptButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-accept-button';
import ApplyDetailButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-detail-button';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import RoleTabsHeader from '@/components/features/mypage/my-posts/recruitments/role-tabs-header';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import { ROLES } from '@/mocks/posts';
import type { ApplicantsUser } from './types';

type ApplicantsRoleTabsProps = {
  roles: string[];
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
                      <ApplyDetailButton />
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
