import { Tabs } from 'radix-ui';
import {
  INTERESTS,
  INTERESTS_BY_CATEGORY,
  INTERESTS_BY_CATEGORY_KEYS,
} from '@/constants/profile.constant';
import type { InterestsType } from '@/types/profile.type';
import InterestSelect from './interest-select';

interface InterestTabsProps {
  draftInterests: number[];
  toggleInterests: (interestId: number) => void;
}

/**
 * 관심 분야 탭 컴포넌트 (기술/비즈니스/사회/라이프/문화)
 * @param draftInterests - 임시 관심 분야 ID 리스트
 * @param toggleInterests - 관심 분야 선택 토글 함수
 */
export default function InterestTabs({
  draftInterests,
  toggleInterests,
}: InterestTabsProps) {
  // InterestsType을 ID로 변환
  const getInterestId = (interestType: InterestsType): number => {
    return (
      Object.entries(INTERESTS).findIndex(([key]) => key === interestType) + 1
    );
  };

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
            className="flex-1 overflow-y-auto max-h-51.5"
          >
            <ul className="grid grid-cols-2 [&>li]:py-4 [&>li]:border-b [&>li]:border-border-primary [&>li:nth-last-child(-n+2)]:border-b-0">
              {INTERESTS_BY_CATEGORY[category].map((interest) => {
                const interestId = getInterestId(interest);
                return (
                  <InterestSelect
                    key={interest}
                    interestId={interestId}
                    interestType={interest}
                    checked={draftInterests.includes(interestId)}
                    toggleInterests={() => toggleInterests(interestId)}
                  />
                );
              })}
            </ul>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
