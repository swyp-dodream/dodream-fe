import { forwardRef } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { AGE_RANGE_LIST, AGE_RANGES } from '@/constants/profile.constant';
import type { AgeRangeType } from '@/types/profile.type';

interface AgeFieldProps {
  value: AgeRangeType | null;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * 연령대 선택 컴포넌트
 * @param value - 현재 선택된 연령대
 * @param onChange - 연령대 변경 핸들러
 * @param error - 검증 에러 메시지
 */
const AgeField = forwardRef<HTMLButtonElement, AgeFieldProps>(
  ({ value, onChange, error }, ref) => {
    const displayLabel = value
      ? AGE_RANGES[value as AgeRangeType]
      : '연령대 선택';

    return (
      <div>
        <div className="flex justify-between items-center">
          <span className="body-lg-medium py-3">연령대</span>
          <div className="flex flex-col">
            <Dropdown
              ref={ref}
              label={displayLabel}
              items={AGE_RANGE_LIST.map((ageRange) => ({
                label: ageRange.label,
                onSelect: () => onChange(ageRange.value),
              }))}
              isError={!!error}
            />
            {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
          </div>
        </div>
      </div>
    );
  },
);

AgeField.displayName = 'AgeField';

export default AgeField;
