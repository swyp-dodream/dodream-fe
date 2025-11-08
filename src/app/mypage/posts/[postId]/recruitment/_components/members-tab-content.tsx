import ApplyDetailButton from '@/components/features/mypage/my-posts/recruitments/buttons/apply-detail-button';
import MathcingCancelButton from '@/components/features/mypage/my-posts/recruitments/buttons/matching-cancel-button';
import RecruitmentEmptyState from '@/components/features/mypage/my-posts/recruitments/recruitment-empty-state';
import RecruitmentUserRow from '@/components/features/mypage/my-posts/recruitments/recruitment-user-row';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import UserActions from '@/components/features/mypage/my-posts/recruitments/user-actions';
import { ROLE_LABEL_MAP } from '@/constants/role.constant';
import { ROLES, type Role } from '@/mocks/posts';
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
              .filter(({ roleName }) => roleName === role)
              .map((user) => (
                <RecruitmentUserRow
                  key={user.suggestionId}
                  {...user}
                  actions={
                    <UserActions>
                      <ApplyDetailButton />
                      <MathcingCancelButton />
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
