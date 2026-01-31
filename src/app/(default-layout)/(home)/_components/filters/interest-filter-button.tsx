import { overlay } from 'overlay-kit';
import InterestSelectModal from '@/app/(header-only)/create-profile/_components/interests-modal/interest-select-modal';
import useQueryParams from '@/hooks/filter/use-query-params';
import type { InterestsType } from '@/types/profile.type';
import HomeFilterButton from './home-filter-button';

export default function InterestFilterButton() {
  const { getArrayParam } = useQueryParams();

  const handleClick = () => {
    const currentInterests = getArrayParam('interests') as InterestsType[];

    overlay.open(({ isOpen, close }) => (
      <InterestSelectModal
        isOpen={isOpen}
        onClose={close}
        isFilter={true}
        initialInterests={currentInterests}
      />
    ));
  };

  return (
    <HomeFilterButton onClick={handleClick} className="hover:bg-primary">
      관심 분야
    </HomeFilterButton>
  );
}
