import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';

type RoleTabsHeaderProps = {
  roles: string[];
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
          {role}
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
