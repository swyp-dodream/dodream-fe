import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { ROLE, ROLE_LIST } from '@/constants/profile.constant';
import type { RoleType } from '@/types/profile.type';

interface RoleFieldProps {
  role: RoleType | null;
  setRole: Dispatch<SetStateAction<RoleType | null>>;
}

/**
 * 직군 선택 컴포넌트
 * @param role - 직군
 * @param setRole - 직군 set 함수
 */
export default function RoleField({ role, setRole }: RoleFieldProps) {
  const displayLabel = role ? ROLE[role] : '직군 선택'; // 선택되지 않았을 경우 기본 메시지
  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">직군</span>
      <Dropdown
        label={displayLabel}
        items={ROLE_LIST.map((role) => ({
          label: role.label,
          onSelect: () => setRole(role.value as RoleType),
        }))}
      />
    </div>
  );
}
