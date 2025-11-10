import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { AGE_RANGE_LIST, AGE_RANGES } from '@/constants/profile.constant';
import type { AgeRangeType } from '@/types/profile.type';

interface AgeFieldProps {
  age: AgeRangeType | null;
  setAge: Dispatch<SetStateAction<AgeRangeType | null>>;
}

/**
 * 연령대 선택 컴포넌트
 * @param age - 연령대
 * @param setAge - 연령대 set 함수
 */
export default function AgeField({ age, setAge }: AgeFieldProps) {
  const displayLabel = age ? AGE_RANGES[age] : '연령대 선택'; // 선택되지 않았을 경우 기본 메시지

  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">연령대</span>
      <Dropdown
        label={displayLabel}
        items={AGE_RANGE_LIST.map((ageRange) => ({
          label: ageRange.label,
          onSelect: () => setAge(ageRange.value as AgeRangeType),
        }))}
      />
    </div>
  );
}
