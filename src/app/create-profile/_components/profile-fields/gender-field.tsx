import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/commons/dropdown';
import { GENDER, GENDER_LIST } from '@/constants/profile.constant';
import type { genderType } from '@/types/profile.type';

interface GenderFieldProps {
  gender: genderType | null;
  setGender: Dispatch<SetStateAction<genderType | null>>;
}

/**
 * 성별 선택 컴포넌트
 * @param gender - 성별
 * @param setGender - 성별 set 함수
 */
export default function GenderField({ gender, setGender }: GenderFieldProps) {
  const displayLabel = gender ? GENDER[gender] : '성별 선택'; // 선택되지 않았을 경우 기본 메시지

  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">성별</span>
      <Dropdown
        label={displayLabel}
        items={GENDER_LIST.map((gender) => ({
          label: gender.label,
          onSelect: () => setGender(gender.value as genderType),
        }))}
      />
    </div>
  );
}
