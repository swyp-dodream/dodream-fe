import { forwardRef } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { GENDER, GENDER_LIST } from '@/constants/profile.constant';
import type { GenderType } from '@/types/profile.type';

interface GenderFieldProps {
  value: GenderType | null;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * 성별 선택 컴포넌트
 * @param value - 현재 선택된 성별
 * @param onChange - 성별 변경 핸들러
 * @param error - 검증 에러 메시지
 */
const GenderField = forwardRef<HTMLButtonElement, GenderFieldProps>(
  ({ value, onChange, error }, ref) => {
    const displayLabel = value ? GENDER[value] : '성별 선택';

    return (
      <div className="flex justify-between items-center">
        <span className="body-lg-medium">성별</span>
        <div className="flex flex-col">
          <Dropdown
            ref={ref}
            label={displayLabel}
            items={GENDER_LIST.map((gender) => ({
              label: gender.label,
              onSelect: () => onChange(gender.value),
            }))}
            isError={!!error}
          />
          {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
        </div>
      </div>
    );
  },
);

GenderField.displayName = 'AgeField';

export default GenderField;
