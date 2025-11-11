import { Tabs } from 'radix-ui';
import {
  INTERESTS_BY_CATEGORY,
  INTERESTS_BY_CATEGORY_KEYS,
} from '@/constants/profile.constant';
import InterestSelect from './interest-select';

/**
 * 관심 분야 탭 컴포넌트 (기술/비즈니스/사회/라이프/문화)
 */
export default function InterestTabs() {
  return (
    <Tabs.Root
      defaultValue={INTERESTS_BY_CATEGORY_KEYS[0]}
      className="w-full h-full flex flex-col"
    >
      <Tabs.List
        className="flex gap-4 mb-3"
        aria-label="카테고리별 관심 분야 탭"
      >
        {INTERESTS_BY_CATEGORY_KEYS.map((category) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className="px-4 py-3 bg-container-primary rounded-full body-md-medium data-[state=active]:bg-chip-selected data-[state=active]:text-text-on-brand"
          >
            {category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {INTERESTS_BY_CATEGORY_KEYS.map((category) => {
        return (
          <Tabs.Content
            value={category}
            key={category}
            className="flex-1 overflow-y-auto max-h-[206px]"
          >
            <ul className="grid grid-cols-2 [&>li]:py-4 [&>li]:border-b [&>li]:border-border-primary [&>li:nth-last-child(-n+2)]:border-b-0">
              {INTERESTS_BY_CATEGORY[category].map((interest) => (
                <InterestSelect key={interest} interest={interest} />
              ))}
            </ul>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
