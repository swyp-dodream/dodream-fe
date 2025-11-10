import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { EXPERIENCE, EXPERIENCE_LIST } from '@/constants/profile.constant';
import type { experienceType } from '@/types/profile.type';

interface ExperienceFieldProps {
  experience: experienceType | null;
  setExperience: Dispatch<SetStateAction<experienceType | null>>;
}

/**
 * 경력 선택 컴포넌트
 * @param experience - 경력
 * @param setExperience - 경력 set 함수
 */
export default function ExperienceField({
  experience,
  setExperience,
}: ExperienceFieldProps) {
  const displayLabel = experience ? EXPERIENCE[experience] : '경력 선택'; // 선택되지 않았을 경우 기본 메시지

  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">경력</span>
      <Dropdown
        label={displayLabel}
        items={EXPERIENCE_LIST.map((experience) => ({
          label: experience.label,
          onSelect: () => setExperience(experience.value as experienceType),
        }))}
      />
    </div>
  );
}
