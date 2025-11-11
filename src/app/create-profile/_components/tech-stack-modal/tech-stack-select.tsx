import Image from 'next/image';
import { Checkbox } from '@/components/commons/check-box';
import { TECH_STACKS } from '@/constants/profile.constant';
import useProfileStore from '@/store/profile-store';
import type { TechStackType } from '@/types/profile.type';

interface TechStackSelectProps {
  stack: TechStackType;
}

/**
 * 기술 스택 개별 선택 컴포넌트 (체크박스, 기술 스택 이름 포함)
 * @param stack - 기술 스택
 */
export default function TechStackSelect({ stack }: TechStackSelectProps) {
  const draftStacks = useProfileStore((state) => state.draftStacks);
  const toggleDraftStacks = useProfileStore((state) => state.toggleDraftStacks);

  return (
    <li className="flex items-center mx-3">
      <label htmlFor={stack} className="flex items-center cursor-pointer">
        {/* 체크박스 */}
        <Checkbox
          name="skills"
          id={stack}
          checked={draftStacks.includes(stack)}
          onChange={() => toggleDraftStacks(stack)}
        />

        {/* 기술 스택 이미지 */}
        <Image
          src={`/logo/stacks/${stack}/24.svg`}
          alt={`${stack}`}
          width={24}
          height={24}
          className="ml-4 mr-3"
        />

        {/* 기술 스택 */}
        <span className="body-md-regular">{TECH_STACKS[stack]}</span>
      </label>
    </li>
  );
}
