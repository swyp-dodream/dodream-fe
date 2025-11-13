import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import useProfileStore from '@/store/profile-store';
import InterestSelectModal from '../interests-modal/interest-select-modal';
import InterestTags from '../interests-modal/interest-tags';

interface InterestsFieldProps {
  error?: string;
}

/**
 * 관심 분야 선택 컴포넌트
 * @param error - 검증 에러 메시지
 */
export default function InterestsField({ error }: InterestsFieldProps) {
  const interests = useProfileStore((state) => state.interests);
  const removeInterests = useProfileStore((state) => state.removeInterests);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <span className="body-lg-medium py-3">관심 분야</span>
        <div className="flex flex-col">
          <DropdownButton
            label="관심 분야 선택"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <InterestSelectModal isOpen={isOpen} onClose={close} />
              ));
            }}
            isError={!!error}
          >
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
          {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
        </div>
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
