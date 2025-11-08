import type { Role } from '@/mocks/posts';
import ApplicantsRoleTabs from './applicants-role-tabs';
import type { ApplicantsUser } from './types';

interface ApplicantsSectionProps {
  title: string;
  roles: Role[];
  users: ApplicantsUser[];
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
      {isEmpty ? (
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
