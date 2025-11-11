import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import useProfileStore from '@/store/profile-store';
import TechStackSelectModal from './tech-stack-modal/tech-stack-select-modal';
import TechStackTags from './tech-stack-modal/tech-stack-tags';

/**
 * 기술 스택 선택 컴포넌트
 */
export default function TechStacksField() {
  const techStacks = useProfileStore((state) => state.techStacks);
  const removeStacks = useProfileStore((state) => state.removeStacks);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <span className="body-lg-medium flex gap-2">
          기술 스택 <span className="text-subtle">(선택)</span>
        </span>
        <DropdownButton
          label="기술 스택 선택"
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <TechStackSelectModal isOpen={isOpen} onClose={close} />
            ));
          }}
        >
          <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
        </DropdownButton>
      </div>
      {techStacks.length !== 0 && (
        <div className="ml-auto mt-4">
          <TechStackTags
            variant="md"
            stacks={techStacks}
            removeStacks={removeStacks}
          />
        </div>
      )}
    </div>
  );
}
