import { overlay } from 'overlay-kit';
import TechStackSelectModal from '@/app/(header-only)/create-profile/_components/tech-stack-modal/tech-stack-select-modal';
import useQueryParams from '@/hooks/filter/use-query-params';
import type { TechStackType } from '@/types/profile.type';
import HomeFilterButton from './home-filter-button';

export default function TechStackFilterButton() {
  const { getArrayParam } = useQueryParams();

  const handleClick = () => {
    const currentTechs = getArrayParam('techs') as TechStackType[];

    overlay.open(({ isOpen, close }) => (
      <TechStackSelectModal
        isOpen={isOpen}
        onClose={close}
        isFilter={true}
        initialStacks={currentTechs}
      />
    ));
  };

  return (
    <HomeFilterButton onClick={handleClick} className="hover:bg-primary">
      기술 스택
    </HomeFilterButton>
  );
}
