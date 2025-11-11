import { INTERESTS } from '@/constants/profile.constant';
import useProfileStore from '@/store/profile-store';
import type { InterestsType } from '@/types/profile.type';
import { Checkbox } from '../tech-stack-modal/check-box';

interface InterestSelectProps {
  interest: InterestsType;
}

/**
 * 관심분야 개별 선택 컴포넌트 (체크박스, 분야 이름 포함)
 * @param interest - 관심분야
 */
export default function InterestSelect({ interest }: InterestSelectProps) {
  const draftInterests = useProfileStore((state) => state.draftInterests);
  const toggleDraftInterests = useProfileStore(
    (state) => state.toggleDraftInterests,
  );

  return (
    <li className="flex items-center mx-3">
      <label
        htmlFor={interest}
        className="flex items-center cursor-pointer gap-4"
      >
        {/* 체크박스 */}
        <Checkbox
          name="skills"
          id={interest}
          checked={draftInterests.includes(interest)}
          onChange={() => toggleDraftInterests(interest)}
        />

        {/* 관심 분야 */}
        <span className="body-md-regular">{INTERESTS[interest]}</span>
      </label>
    </li>
  );
}
