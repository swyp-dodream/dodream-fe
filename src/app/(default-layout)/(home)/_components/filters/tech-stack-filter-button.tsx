import { overlay } from 'overlay-kit';
import TechStackSelectModal from '@/app/(header-only)/create-profile/_components/tech-stack-modal/tech-stack-select-modal';
import useQueryParams from '@/hooks/filter/use-query-params';
import type { TechStackType } from '@/types/profile.type';
import { convertTechStackToId } from '@/utils/profile.util';
import HomeFilterButton from './home-filter-button';

export default function TechStackFilterButton() {
  const { getArrayParam } = useQueryParams();

  const handleClick = () => {
    const currentTechs = getArrayParam('techs') as TechStackType[];

    const techIds = currentTechs
      .map(convertTechStackToId)
      .filter((id): id is number => id !== undefined);

    overlay.open(({ isOpen, close }) => (
      <TechStackSelectModal
        isOpen={isOpen}
        onClose={close}
        isFilter={true}
        initialStacks={techIds}
      />
    ));
  };

  return (
    <HomeFilterButton onClick={handleClick} className="hover:bg-primary">
      기술 스택
    </HomeFilterButton>
  );
}
