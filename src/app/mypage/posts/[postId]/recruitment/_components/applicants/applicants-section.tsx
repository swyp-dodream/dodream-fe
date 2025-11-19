import type { MyPostApplicantType } from '@/types/my.type';
import ApplicantsRoleTabs from './applicants-role-tabs';

interface ApplicantsSectionProps {
  title: string;
  roles: string[];
  users: MyPostApplicantType[];
  isEmpty: boolean;
  emptyMessage: string;
  headerRight?: React.ReactNode;
}

export default function ApplicantsSection({
  title,
  roles,
  users,
  isEmpty,
  emptyMessage,
  headerRight,
}: ApplicantsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="heading-sm text-primary">{title}</h3>
      {isEmpty || roles.length === 0 ? (
        <p className="body-lg-medium text-primary">{emptyMessage}</p>
      ) : (
        <ApplicantsRoleTabs
          roles={roles}
          users={users}
          headerRight={headerRight}
        />
      )}
    </div>
  );
}
