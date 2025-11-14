import Image from 'next/image';
import { TECH_STACK_MAP } from '@/constants/profile.constant';
import type { TechStackType } from '@/types/profile.type';

const MAX_STACKS = 5;

interface TechCategoriesProps {
  techCategories: string[];
}

export default function TechCategories({
  techCategories,
}: TechCategoriesProps) {
  const renderingTechCategories = techCategories.slice(0, MAX_STACKS);
  const restCount = techCategories.length - MAX_STACKS;

  return (
    <div className="flex gap-3">
      {renderingTechCategories.map((techCategory) => (
        <Image
          key={techCategory}
          src={`/logo/stacks/${TECH_STACK_MAP[techCategory as TechStackType]}/32.svg`}
          alt={`${techCategory}`}
          width={32}
          height={32}
        />
      ))}
      {restCount > 0 && (
        <div className="size-8 rounded-full bg-primary flex justify-center items-center body-md-medium text-secondary">
          +{restCount}
        </div>
      )}
    </div>
  );
}
