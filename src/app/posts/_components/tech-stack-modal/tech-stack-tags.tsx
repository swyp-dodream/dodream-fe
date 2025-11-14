import clsx from 'clsx';
import XIcon from '@/assets/icons/x/12.svg';
import type { TechSkill } from '@/types/tech-skill.type';

interface TechStackTagsProps {
  stacks: TechSkill[];
  removeStacks: (stack: TechSkill) => void;
  variant?: 'sm' | 'md';
}

/**
 * 선택된 기술 스택 리스트 컴포넌트
 * @param stacks - 기술 스택 리스트
 * @param removeStacks - 기술 스택 삭제 함수
 * @param variant - 스타일
 */
export default function TechStackTags({
  stacks,
  removeStacks,
  variant,
}: TechStackTagsProps) {
  return (
    <ul className="w-[486px] flex gap-3 flex-wrap justify-end">
      {stacks.map((stack) => (
        <TechStackTag
          key={stack.id}
          stack={stack}
          variant={variant}
          onRemove={() => removeStacks(stack)}
        />
      ))}
    </ul>
  );
}

interface TechStackTagProps {
  stack: TechSkill;
  onRemove: () => void;
  variant?: 'sm' | 'md';
}

/**
 * 선택된 개별 기술 스택 컴포넌트
 * @param stack - 기술 스택
 * @param onRemove - 기술 스택 삭제 함수
 * @param variant - 스타일
 */
function TechStackTag({ stack, onRemove, variant = 'sm' }: TechStackTagProps) {
  return (
    <li
      className={clsx('flex gap-2 items-center ', {
        'bg-container-primary px-2 rounded-sm body-md-regular':
          variant === 'sm',
        'px-4 py-3 bg-surface text-primary border border-border-primary body-lg-medium rounded-full':
          variant === 'md',
      })}
    >
      {stack.name}
      <button type="button" onClick={onRemove}>
        <XIcon className="text-icon-light" />
      </button>
    </li>
  );
}
