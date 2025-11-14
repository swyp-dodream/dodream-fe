import { Tabs } from 'radix-ui';
import {
  INTEREST_CATEGORIES,
  INTEREST_KEYWORDS,
} from '@/constants/interest.constant';
import type { InterestKeyword } from '@/types/interest.type';
import InterestSelect from './interest-select';

interface InterestTabsProps {
  draftInterests: InterestKeyword[];
  toggleInterests: (interest: InterestKeyword) => void;
}

const INTERESTS_BY_CATEGORY = INTEREST_CATEGORIES.map((category) => ({
  ...category,
  keywords: INTEREST_KEYWORDS.filter(
    (keyword) => keyword.categoryId === category.id,
  ),
}));
const DEFAULT_CATEGORY = INTERESTS_BY_CATEGORY[0]?.name ?? '';

/**
 * 관심 분야 탭 컴포넌트 (기술/비즈니스/사회/라이프/문화)
 * @param draftInterests - 임시 관심 분야 리스트
 * @param toggleInterests - 관심 분야 선택 토글 함수
 */
export default function InterestTabs({
  draftInterests,
  toggleInterests,
}: InterestTabsProps) {
  return (
    <Tabs.Root
      defaultValue={DEFAULT_CATEGORY}
      className="w-full h-full flex flex-col"
    >
      <Tabs.List
        className="flex gap-4 mb-3"
        aria-label="카테고리별 관심 분야 탭"
      >
        {INTERESTS_BY_CATEGORY.map((category) => (
          <Tabs.Trigger
            key={category.id}
            value={category.name}
            className="px-4 py-3 bg-container-primary rounded-full body-md-medium data-[state=active]:bg-chip-selected data-[state=active]:text-text-on-brand"
          >
            {category.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {INTERESTS_BY_CATEGORY.map((category) => {
        return (
          <Tabs.Content
            value={category.name}
            key={category.id}
            className="flex-1 overflow-y-auto max-h-[206px]"
          >
            <ul className="grid grid-cols-2 [&>li]:py-4 [&>li]:border-b [&>li]:border-border-primary [&>li:nth-last-child(-n+2)]:border-b-0">
              {category.keywords.map((interest) => (
                <InterestSelect
                  key={interest.id}
                  interest={interest}
                  checked={draftInterests.some(({ id }) => id === interest.id)}
                  toggleInterests={() => toggleInterests(interest)}
                />
              ))}
            </ul>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
