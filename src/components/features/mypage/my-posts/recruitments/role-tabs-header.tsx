import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import { ROLE_LABEL_MAP } from '@/constants/role.constant';
import type { Role } from '@/mocks/posts';

type RoleTabsHeaderProps = {
  roles: Role[];
  headerRight?: React.ReactNode;
};

export default function RoleTabsHeader({
  roles,
  headerRight,
}: RoleTabsHeaderProps) {
  const list = (
    <RoleTabs.List>
      {roles.map((role) => (
        <RoleTabs.Trigger key={role} value={role}>
          {ROLE_LABEL_MAP[role as Role]}
        </RoleTabs.Trigger>
      ))}
    </RoleTabs.List>
  );

  if (!headerRight) {
    return list;
  }

  return (
    <div className="flex justify-between">
      {list}
      {headerRight}
    </div>
  );
}
