import { Tabs } from 'radix-ui';
import { useMemo, useState } from 'react';
import SearchInput from '@/components/commons/text-fields/search-input';
import {
  TECH_SKILL_CATEGORIES,
  TECH_SKILLS,
} from '@/constants/tech-skill.constant';
import type { TechSkill } from '@/types/tech-skill.type';
import TechStackSelect from './tech-stack-select';

interface TechStackTabsProps {
  draftStacks: TechSkill[];
  toggleStacks: (stack: TechSkill) => void;
}

/**
 * 기술 스택 탭 컴포넌트 (프론트엔드/백엔드/모바일/디자인)
 * @param draftStacks - 모달에서 선택된 스택
 * @param toggleStacks - 기술 스택 토글 함수
 */
export default function TechStackTabs({
  draftStacks,
  toggleStacks,
}: TechStackTabsProps) {
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const categories = useMemo(
    () =>
      TECH_SKILL_CATEGORIES.map((category) => ({
        ...category,
        skills: TECH_SKILLS.filter((skill) => skill.categoryId === category.id),
      })),
    [],
  );
  const defaultCategory = categories[0]?.name ?? '';

  return (
    <Tabs.Root
      defaultValue={defaultCategory}
      className="w-full h-full flex flex-col"
    >
      <Tabs.List className="flex gap-4" aria-label="역할별 기술 스택 탭">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category.id}
            value={category.name}
            className="px-4 py-3 bg-container-primary rounded-full body-md-medium data-[state=active]:bg-chip-selected data-[state=active]:text-text-on-brand"
          >
            {category.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="pt-4 pb-3">
        <SearchInput
          placeholder="찾고 싶은 기술 스택을 검색하세요"
          variant="dark"
          className="w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {categories.map((category) => {
        const filteredStacks = category.skills.filter((skill) =>
          skill.name.toLowerCase().includes(keyword.toLowerCase()),
        );

        return (
          <Tabs.Content
            value={category.name}
            key={category.id}
            className="flex-1 overflow-y-auto max-h-[206px]"
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
                {filteredStacks.map((stack) => (
                  <TechStackSelect
                    key={stack.id}
                    stack={stack}
                    toggleStacks={() => toggleStacks(stack)}
                    checked={draftStacks.some(({ id }) => id === stack.id)}
                  />
                ))}
              </ul>
            )}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
