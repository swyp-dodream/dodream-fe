import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import useProfileStore from '@/store/profile-store';
import InterestSelectModal from './interests-modal/interest-select-modal';
import InterestTags from './interests-modal/interest-tags';

/**
 * 관심 분야 선택 컴포넌트
 */
export default function InterestsField() {
  const interests = useProfileStore((state) => state.interests);
  const removeInterests = useProfileStore((state) => state.removeInterests);

  return (
    <div className="flex flex-col w-full">
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
      {interests.length !== 0 && (
        <div className="ml-auto mt-4">
          <InterestTags
            variant="light"
            interests={interests}
            removeInterest={removeInterests}
          />
        </div>
      )}
    </div>
  );
}
