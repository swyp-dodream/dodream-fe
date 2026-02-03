import clsx from 'clsx';
import XIcon from '@/assets/icons/x/12.svg';
import {
  INDEX_LABEL,
  INTERESTS,
  INTERESTS_ID_MAP,
} from '@/constants/profile.constant';

interface InterestTagsProps {
  interests: number[];
  removeInterest: (interest: number) => void;
  variant?: 'light' | 'dark' | 'filter';
}

/**
 * 선택된 관심분야 리스트 컴포넌트
 * @param interests - 관심분야 ID 리스트
 * @param removeInterest - 관심분야 삭제 함수
 * @param variant - 스타일
 */
export default function InterestTags({
  interests,
  removeInterest,
  variant,
}: InterestTagsProps) {
  return (
    <ul className="flex gap-x-4 gap-y-3 flex-wrap">
      {interests.map((interestId, index) => (
        <InterestTag
          key={interestId}
          index={index + 1}
          variant={variant}
          interestId={interestId}
          onRemove={() => removeInterest(interestId)}
        />
      ))}
    </ul>
  );
}

interface InterestTagProps {
  interestId: number;
  index: number;
  variant?: 'light' | 'dark' | 'filter';
  onRemove: () => void;
}

/**
 * 선택된 개별 관심분야 컴포넌트
 * @param interestId - 관심 분야 ID
 * @param index - 순서
 * @param variant - 스타일
 * @param onRemove - 선택 삭제 함수
 */
function InterestTag({
  interestId,
  index,
  variant = 'dark',
  onRemove,
}: InterestTagProps) {
  const interestType = INTERESTS_ID_MAP[interestId];
  const interestLabel = INTERESTS[interestType];

  return (
    <li
      className={clsx('flex gap-2 items-center  rounded-full body-lg-medium', {
        'bg-button text-text-on-brand px-4 py-3': variant === 'dark',
        'bg-surface text-primary border border-border-primary px-4 py-3':
          variant === 'light',
        'bg-container-primary px-2 rounded-sm body-md-regular':
          variant === 'filter',
      })}
    >
      {`${`${variant === 'filter' ? '' : INDEX_LABEL[index]} `}${interestLabel}`}
      <button type="button" onClick={onRemove}>
        <XIcon className="text-icon-light" />
      </button>
    </li>
  );
}
