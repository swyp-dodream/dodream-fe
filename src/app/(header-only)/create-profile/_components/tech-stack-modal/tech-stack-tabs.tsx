import { Tabs } from 'radix-ui';
import { useState } from 'react';
import SearchInput from '@/components/commons/text-fields/search-input';
import {
  TECH_STACKS_BY_ROLE,
  TECH_STACKS_BY_ROLE_KEYS,
} from '@/constants/profile.constant';
import { convertTechStackToId } from '@/utils/profile.util';
import TechStackSelect from './tech-stack-select';

interface TechStackTabsProps {
  draftStacks: number[];
  toggleStacks: (stackId: number) => void;
}

/**
 * 기술 스택 탭 컴포넌트 (프론트엔드/백엔드/모바일/디자인)
 * @param draftStacks - 모달에서 선택된 스택 (ID 배열)
 * @param toggleStacks - 기술 스택 토글 함수
 */
export default function TechStackTabs({
  draftStacks,
  toggleStacks,
}: TechStackTabsProps) {
  const [keyword, setKeyword] = useState(''); // 검색 키워드

  return (
    <Tabs.Root
      defaultValue={TECH_STACKS_BY_ROLE_KEYS[0]}
      className="w-full h-full flex flex-col"
    >
      <Tabs.List
        className="flex gap-4 shrink-0"
        aria-label="역할별 기술 스택 탭"
      >
        {TECH_STACKS_BY_ROLE_KEYS.map((role) => (
          <Tabs.Trigger
            key={role}
            value={role}
            className="px-4 py-3 bg-container-primary rounded-full body-md-medium data-[state=active]:bg-chip-selected data-[state=active]:text-text-on-brand"
          >
            {role}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="pt-4 pb-3 shrink-0">
        <SearchInput
          placeholder="찾고 싶은 기술 스택을 검색하세요"
          variant="dark"
          className="w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {TECH_STACKS_BY_ROLE_KEYS.map((role) => {
        // 키워드가 포함된 리스트 필터링
        const filteredStacks = TECH_STACKS_BY_ROLE[role].filter((skill) =>
          skill.toLowerCase().includes(keyword.toLowerCase()),
        );

        return (
          <Tabs.Content
            value={role}
            key={role}
            className="flex-1 overflow-y-auto max-h-43.75"
          >
            {filteredStacks.length === 0 ? (
              <output className="flex flex-col gap-2 items-center my-6">
                <span className="body-md-regular">검색된 스택이 없습니다</span>
                <p className="body-sm-regular text-subtle">
                  검색어를 확인하거나 다른 키워드로 다시 검색하세요
                </p>
              </output>
            ) : (
              <ul className="grid grid-cols-2 [&>li]:py-4 [&>li]:border-b [&>li]:border-border-primary [&>li:nth-last-child(-n+2)]:border-b-0">
                {filteredStacks.map((stack) => {
                  const stackId = convertTechStackToId(stack);
                  if (stackId === null) return null; // 변환 실패시 스킵

                  return (
                    <TechStackSelect
                      key={stack}
                      stack={stack}
                      toggleStacks={() => toggleStacks(stackId)}
                      checked={draftStacks.includes(stackId)}
                    />
                  );
                })}
              </ul>
            )}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
