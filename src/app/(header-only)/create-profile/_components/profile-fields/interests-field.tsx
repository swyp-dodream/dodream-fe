import { overlay } from 'overlay-kit';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import InterestSelectModal from '../interests-modal/interest-select-modal';
import InterestTags from '../interests-modal/interest-tags';

interface InterestsFieldProps {
  interests: number[];
  onChange: (interests: number[]) => void;
  error?: string;
}

/**
 * 관심 분야 선택 컴포넌트
 * @param error - 검증 에러 메시지
 */
export default function InterestsField({
  interests,
  onChange,
  error,
}: InterestsFieldProps) {
  const removeInterest = (interestId: number) => {
    onChange(interests.filter((id) => id !== interestId));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <span className="body-lg-medium py-3">관심 분야</span>
        <div className="flex flex-col">
          <DropdownButton
            label="관심 분야 선택"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <InterestSelectModal
                  isOpen={isOpen}
                  onClose={close}
                  initialInterests={interests}
                  onSave={onChange}
                />
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
            removeInterest={removeInterest}
          />
        </div>
      )}
    </div>
  );
}
