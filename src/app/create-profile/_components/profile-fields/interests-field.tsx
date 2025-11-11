import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import InterestSelectModal from './interests-modal/interest-select-modal';

export default function InterestsField() {
  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">관심 분야</span>
      <DropdownButton
        label="관심 분야 선택"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <InterestSelectModal isOpen={isOpen} onClose={close} />
          ));
        }}
      >
        <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
      </DropdownButton>
    </div>
  );
}
