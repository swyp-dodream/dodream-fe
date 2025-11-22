'use client';

import OfferButton from '@/components/features/mypage/my-posts/recruitments/buttons/offer-button';
import OfferCancelButton from '@/components/features/mypage/my-posts/recruitments/buttons/offer-cancel-button';
import RecruitmentEmptyState from '@/components/features/mypage/my-posts/recruitments/recruitment-empty-state';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';

interface OfferTabContentProps {
  postId: bigint;
  users: {
    userId: bigint;
    suggestionId?: bigint;
    profileImageCode: number;
    nickname: string;
    jobGroups: string[];
    experience: string;
    tags?: string[];
  }[];
}

export default function OfferTabContent({
  postId,
  users,
}: OfferTabContentProps) {
  if (users.length === 0) {
    return <RecruitmentEmptyState tab="offers" />;
  }

  // users에 존재하는 역할만 추출
  const availableRoles = Array.from(
    new Set(users.map((user) => user.jobGroups[0])),
  );

  return (
    <RoleTabs defaultValue={availableRoles[0]}>
      {/* TODO: API Response 형식 보고 RoleTabsHeader 컴포넌트로 대체 */}
      <RoleTabs.List>
        {availableRoles.map((role) => (
          <RoleTabs.Trigger key={role} value={role}>
            {role}
          </RoleTabs.Trigger>
        ))}
      </RoleTabs.List>

      {availableRoles.map((role) => (
        <RoleTabs.Content key={role} value={role} columns={8}>
          <div className="grid grid-cols-subgrid col-span-full gap-6 divide-y divide-border-primary">
            {users
              .filter(({ jobGroups }) => jobGroups[0] === role)
              .map((user) => (
                <RecruitmentUserRow
                  postId={BigInt(postId)}
                  key={user.userId}
                  {...user}
                  actions={
                    <UserActions>
                      {user.suggestionId ? (
                        <OfferCancelButton suggestionId={user.suggestionId} />
                      ) : (
                        <OfferButton postId={postId} userId={user.userId} />
                      )}
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
