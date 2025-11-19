import RecruitmentEmptyState from '@/components/features/mypage/my-posts/recruitments/recruitment-empty-state';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import MathcingCancelButton from '@/components/features/post/post-card/buttons/matching-cancel-button';
import { ROLE_LABEL_MAP } from '@/constants/role.constant';
import { ROLES, type Role } from '@/mocks/posts';
import type { MyPostApplicantType } from '@/types/my.type';

const users: MyPostApplicantType[] = [];

export default function MembersTabContent() {
  if (users.length === 0) {
    return <RecruitmentEmptyState tab="members" />;
  }

  return (
    <RoleTabs defaultValue={ROLES[0]}>
      <RoleTabs.List>
        {ROLES.map((role) => (
          <RoleTabs.Trigger key={role} value={role}>
            {ROLE_LABEL_MAP[role as Role]}
          </RoleTabs.Trigger>
        ))}
      </RoleTabs.List>

      {ROLES.map((role) => (
        <RoleTabs.Content key={role} value={role} columns={8}>
          <div className="grid grid-cols-subgrid col-span-full gap-6 divide-y divide-border-primary">
            {users
              .filter(({ jobGroups }) => jobGroups[0] === role)
              .map((user) => (
                <RecruitmentUserRow
                  key={user.suggestionId}
                  {...user}
                  actions={
                    // TODO: id 값 수정
                    <UserActions>
                      <ApplyDetailButton
                        postId={BigInt(1)}
                        applicationId={BigInt(1)}
                      />
                      <MathcingCancelButton
                        nickname={''}
                        postId={BigInt(0)}
                        matchingId={BigInt(0)}
                        matchedAt={new Date()}
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
