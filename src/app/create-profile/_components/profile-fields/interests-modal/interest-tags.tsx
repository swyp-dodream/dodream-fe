import XIcon from '@/assets/icons/x/12.svg';
import { INDEX_LABEL, INTERESTS } from '@/constants/profile.constant';
import useProfileStore from '@/store/profile-store';
import type { InterestsType } from '@/types/profile.type';

/**
 * 선택된 관심분야 리스트 컴포넌트
 */
export default function InterestTags() {
  const draftInterests = useProfileStore((state) => state.draftInterests);
  const toggleDraftInterests = useProfileStore(
    (state) => state.toggleDraftInterests,
  );

  return (
    <ul className="flex gap-4">
      {draftInterests.map((interest) => (
        <InterestTag
          key={interest}
          index={draftInterests.indexOf(interest) + 1}
          interest={interest}
          onRemove={() => toggleDraftInterests(interest)}
        />
      ))}
    </ul>
  );
}

interface InterestTagProps {
  interest: InterestsType;
  index: number;
  onRemove: () => void;
}

/**
 * 선택된 개별 관심분야 컴포넌트
 * @param interest - 관심 분야
 * @param onRemove - 선택 삭제 함수
 */
function InterestTag({ interest, index, onRemove }: InterestTagProps) {
  return (
    <li className="flex gap-2 items-center bg-button text-text-on-brand px-4 py-3 rounded-full body-lg-medium">
      {`${INDEX_LABEL[index]} ${INTERESTS[interest]}`}
      <button type="button" onClick={onRemove}>
        <XIcon className="text-icon-light" />
      </button>
    </li>
  );
}
