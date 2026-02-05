import { Checkbox } from '@/components/commons/check-box';
import { INTERESTS } from '@/constants/profile.constant';
import type { InterestsType } from '@/types/profile.type';

interface InterestSelectProps {
  interestId: number;
  interestType: InterestsType;
  toggleInterests: () => void;
  checked: boolean;
}

/**
 * 관심분야 개별 선택 컴포넌트 (체크박스, 분야 이름 포함)
 * @param interestId - 관심분야 ID
 * @param interestType - 관심분야 타입 (라벨 표시용)
 * @param toggleInterests - 관심분야 선택 토글 함수
 * @param checked - 체크 여부
 */
export default function InterestSelect({
  interestId,
  interestType,
  toggleInterests,
  checked,
}: InterestSelectProps) {
  return (
    <li className="flex items-center mx-3">
      <label
        htmlFor={`interest-${interestId}`}
        className="flex items-center cursor-pointer gap-4"
      >
        {/* 체크박스 */}
        <Checkbox
          name="interests"
          id={`interest-${interestId}`}
          checked={checked}
          onChange={toggleInterests}
        />

        {/* 관심 분야 */}
        <span className="body-md-regular">{INTERESTS[interestType]}</span>
      </label>
    </li>
  );
}
