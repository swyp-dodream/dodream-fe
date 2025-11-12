import { forwardRef } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { ROLE, ROLE_LIST } from '@/constants/profile.constant';
import type { RoleType } from '@/types/profile.type';

interface RoleFieldProps {
  value: RoleType | null;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * 직군 선택 컴포넌트
 * @param value - 현재 선택된 직군
 * @param onChange - 직군 변경 핸들러
 * @param error - 검증 에러 메시지
 */
const RoleField = forwardRef<HTMLButtonElement, RoleFieldProps>(
  ({ value, onChange, error }, ref) => {
    const displayLabel = value ? ROLE[value] : '직군 선택';

    return (
      <div className="flex justify-between items-center">
        <span className="body-lg-medium">직군</span>
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
  },
);

RoleField.displayName = 'AgeField';

export default RoleField;
