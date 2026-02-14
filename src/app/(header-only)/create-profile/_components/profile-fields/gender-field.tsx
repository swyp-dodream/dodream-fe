import type { Ref } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { GENDER, GENDER_LIST } from '@/constants/profile.constant';
import type { GenderType } from '@/types/profile.type';

interface GenderFieldProps {
  value: GenderType | undefined;
  onChange: (value: GenderType) => void;
  error?: string;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * 성별 선택 컴포넌트
 * @param value - 현재 선택된 성별
 * @param onChange - 성별 변경 핸들러
 * @param error - 검증 에러 메시지
 */
export default function GenderField({
  value,
  onChange,
  error,
  ref,
}: GenderFieldProps) {
  const displayLabel = value ? GENDER[value] : '성별 선택';

  return (
    <div className="flex justify-between">
      <span className="body-lg-medium py-3">성별</span>
      <div className="flex flex-col">
        <Dropdown
          ref={ref}
          label={displayLabel}
          items={GENDER_LIST.map((gender) => ({
            label: gender.label,
            onSelect: () => onChange(gender.value as GenderType),
          }))}
          isError={!!error}
        />
        {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
      </div>
    </div>
  );
}
