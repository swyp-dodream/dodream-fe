import type { Ref } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { EXPERIENCE, EXPERIENCE_LIST } from '@/constants/profile.constant';
import type { ExperienceType } from '@/types/profile.type';

interface ExperienceFieldProps {
  value: ExperienceType | undefined;
  onChange: (value: string) => void;
  error?: string;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * 경력 선택 컴포넌트
 * @param value - 현재 선택된 경력
 * @param onChange - 경력 변경 핸들러
 * @param error - 검증 에러 메시지
 */
export default function ExperienceField({
  value,
  onChange,
  error,
  ref,
}: ExperienceFieldProps) {
  const displayLabel = value ? EXPERIENCE[value] : '경력 선택';

  return (
    <div className="flex justify-between">
      <span className="body-lg-medium py-3">경력</span>
      <div className="flex flex-col">
        <Dropdown
          ref={ref}
          label={displayLabel}
          items={EXPERIENCE_LIST.map((experience) => ({
            label: experience.label,
            onSelect: () => onChange(experience.value),
          }))}
          isError={!!error}
        />
        {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
      </div>
    </div>
  );
}
