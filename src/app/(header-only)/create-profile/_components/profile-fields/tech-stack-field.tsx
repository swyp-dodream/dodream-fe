import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { TechStackType } from '@/types/profile.type';
import TechStackSelectModal from '../tech-stack-modal/tech-stack-select-modal';
import TechStackTags from '../tech-stack-modal/tech-stack-tags';

interface TechStacksFieldProps {
  stacks: TechStackType[];
  onChange: (stacks: TechStackType[]) => void;
}

/**
 * 기술 스택 선택 컴포넌트
 */
export default function TechStacksField({
  stacks,
  onChange,
}: TechStacksFieldProps) {
  const removeStack = (stack: TechStackType) => {
    onChange(stacks.filter((s) => s !== stack));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <span className="body-lg-medium flex gap-2 py-3">
          기술 스택 <span className="text-subtle">(선택)</span>
        </span>
        <DropdownButton
          label="기술 스택 선택"
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <TechStackSelectModal
                isOpen={isOpen}
                onClose={close}
                initialStacks={stacks}
                onSave={onChange}
              />
            ));
          }}
        >
          <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
        </DropdownButton>
      </div>
      {stacks.length !== 0 && (
        <div className="ml-auto mt-4">
          <TechStackTags
            variant="md"
            stacks={stacks}
            removeStacks={removeStack}
          />
        </div>
      )}
    </div>
  );
}
