import type { Ref } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { ROLE, ROLE_LIST } from '@/constants/profile.constant';
import type { RoleType } from '@/types/profile.type';

interface RoleFieldProps {
  value: RoleType | null;
  onChange: (value: string) => void;
  error?: string;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * 직군 선택 컴포넌트
 * @param value - 현재 선택된 직군
 * @param onChange - 직군 변경 핸들러
 * @param error - 검증 에러 메시지
 */
export default function RoleField({
  value,
  onChange,
  error,
  ref,
}: RoleFieldProps) {
  const displayLabel = value ? ROLE[value] : '직군 선택';

  return (
    <div className="flex justify-between">
      <span className="body-lg-medium py-3">직군</span>
      <div className="flex flex-col">
        <Dropdown
          ref={ref}
          label={displayLabel}
          items={ROLE_LIST.map((role) => ({
            label: role.label,
            onSelect: () => onChange(role.value),
          }))}
          isError={!!error}
        />
        {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
      </div>
    </div>
  );
}
