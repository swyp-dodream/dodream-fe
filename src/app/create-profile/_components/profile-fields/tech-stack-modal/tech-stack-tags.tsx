import XIcon from '@/assets/icons/x/12.svg';
import { TECH_STACKS } from '@/constants/profile.constant';
import useProfileStore from '@/store/profile-store';
import type { TechStackType } from '@/types/profile.type';

/**
 * 선택된 기술 스택 리스트 컴포넌트
 */
export default function TechStackTags() {
  const draftStacks = useProfileStore((state) => state.draftStacks);
  const toggleDraft = useProfileStore((state) => state.toggleDraft);

  return (
    <ul className="flex gap-4">
      {draftStacks.map((stack) => (
        <TechStackTag
          key={stack}
          stack={stack}
          onRemove={() => toggleDraft(stack)}
        />
      ))}
    </ul>
  );
}

interface TechStackTagProps {
  stack: TechStackType;
  onRemove: () => void;
}

/**
 * 선택된 개별 기술 스택 컴포넌트
 */
function TechStackTag({ stack, onRemove }: TechStackTagProps) {
  return (
    <li className="flex gap-2 items-center bg-container-primary px-2 rounded-sm body-md-regular">
      {TECH_STACKS[stack]}
      <button type="button" onClick={onRemove}>
        <XIcon className="text-icon-light" />
      </button>
    </li>
  );
}
