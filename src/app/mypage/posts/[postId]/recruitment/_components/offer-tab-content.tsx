'use client';

import OfferCancelButton from '@/components/features/mypage/my-posts/recruitments/buttons/offer-cancel-button';
import RecruitmentEmptyState from '@/components/features/mypage/my-posts/recruitments/recruitment-empty-state';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import { ROLE_LABEL_MAP } from '@/constants/role.constant';
import useCancelOfferMutation from '@/hooks/post/use-cancel-offer-mutation';
import useToast from '@/hooks/use-toast';
import { ROLES, type Role } from '@/mocks/posts';
import type { MyPostApplicantType } from '@/types/my.type';

const users: MyPostApplicantType[] = [];

export default function OfferTabContent() {
  const toast = useToast();
  const { mutateAsync: cancelOffer } = useCancelOfferMutation();

  const handleCancelOffer = async (suggestionId: bigint) => {
    try {
      await cancelOffer(suggestionId);
      toast({ title: '제안이 취소되었습니다' });
    } catch (_error) {
      toast({
        title: '제안을 취소하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  };

  if (users.length === 0) {
    return <RecruitmentEmptyState tab="offers" />;
  }

  return (
    <RoleTabs defaultValue={ROLES[0]}>
      {/* TODO: API Response 형식 보고 RoleTabsHeader 컴포넌트로 대체 */}
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
                  postId={BigInt(0)}
                  key={user.suggestionId}
                  {...user}
                  actions={
                    <UserActions>
                      <OfferCancelButton
                        onCancel={() => handleCancelOffer(user.suggestionId)}
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
