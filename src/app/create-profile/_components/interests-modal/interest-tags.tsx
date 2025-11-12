import clsx from 'clsx';
import XIcon from '@/assets/icons/x/12.svg';
import { INDEX_LABEL, INTERESTS } from '@/constants/profile.constant';
import type { InterestsType } from '@/types/profile.type';

interface InterestTagsProps {
  interests: InterestsType[];
  removeInterest: (interest: InterestsType) => void;
  variant?: 'light' | 'dark';
}

/**
 * 선택된 관심분야 리스트 컴포넌트
 * @param interests - 관심분야 리스트
 * @param removeInterest- 관심분야 삭제 함수
 * @param variant - 스타일
 */
export default function InterestTags({
  interests,
  removeInterest,
  variant,
}: InterestTagsProps) {
  return (
    <ul className="flex gap-4">
      {interests.map((interest, index) => (
        <InterestTag
          key={interest}
          index={index + 1}
          variant={variant}
          interest={interest}
          onRemove={() => removeInterest(interest)}
        />
      ))}
    </ul>
  );
}

interface InterestTagProps {
  interest: InterestsType;
  index: number;
  variant?: 'light' | 'dark';
  onRemove: () => void;
}

/**
 * 선택된 개별 관심분야 컴포넌트
 * @param interest - 관심 분야
 * @param index - 순서
 * @param variant - 스타일
 * @param onRemove - 선택 삭제 함수
 */
function InterestTag({
  interest,
  index,
  variant = 'dark',
  onRemove,
}: InterestTagProps) {
  return (
    <li
      className={clsx(
        'flex gap-2 items-center px-4 py-3 rounded-full body-lg-medium',
        {
          'bg-button text-text-on-brand': variant === 'dark',
          'bg-surface text-primary border border-border-primary':
            variant === 'light',
        },
      )}
    >
      {`${INDEX_LABEL[index]} ${INTERESTS[interest]}`}
      <button type="button" onClick={onRemove}>
        <XIcon className="text-icon-light" />
      </button>
    </li>
  );
}
