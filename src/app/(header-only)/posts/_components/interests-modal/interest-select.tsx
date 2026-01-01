import { Checkbox } from '@/components/commons/check-box';
import type { InterestKeyword } from '@/types/interest.type';

interface InterestSelectProps {
  interest: InterestKeyword;
  toggleInterests: () => void;
  checked: boolean;
}

/**
 * 관심분야 개별 선택 컴포넌트 (체크박스, 분야 이름 포함)
 * @param interest - 관심분야
 * @param toggleInterests - 관심분야 선택 토글 함수
 * @param checked - 체크 여부
 */
export default function InterestSelect({
  interest,
  toggleInterests,
  checked,
}: InterestSelectProps) {
  return (
    <li className="flex items-center mx-3">
      <label
        htmlFor={`interest-${interest.id}`}
        className="flex items-center cursor-pointer gap-4"
      >
        {/* 체크박스 */}
        <Checkbox
          name="interests"
          id={`interest-${interest.id}`}
          checked={checked}
          onChange={toggleInterests}
        />

        {/* 관심 분야 */}
        <span className="body-md-regular">{interest.name}</span>
      </label>
    </li>
  );
}
