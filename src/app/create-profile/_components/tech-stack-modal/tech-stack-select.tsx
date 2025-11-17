import Image from 'next/image';
import { Checkbox } from '@/components/commons/check-box';
import { TECH_STACK_MAP } from '@/constants/profile.constant';
import type { TechStackType } from '@/types/profile.type';

interface TechStackSelectProps {
  stack: TechStackType;
  toggleStacks: () => void;
  checked: boolean;
}

/**
 * 기술 스택 개별 선택 컴포넌트 (체크박스, 기술 스택 이름 포함)
 * @param stack - 기술 스택
 * @param toggleStacks - 기술 스택 선택 토글 함수
 * @param checked - 체크 여부
 */
export default function TechStackSelect({
  stack,
  toggleStacks,
  checked,
}: TechStackSelectProps) {
  return (
    <li className="flex items-center mx-3">
      <label htmlFor={stack} className="flex items-center cursor-pointer">
        {/* 체크박스 */}
        <Checkbox
          name="skills"
          id={stack}
          checked={checked}
          onChange={toggleStacks}
        />

        {/* 기술 스택 이미지 */}
        <Image
          src={`/logo/stacks/${TECH_STACK_MAP[stack]}/24.svg`}
          alt={`${stack}`}
          width={24}
          height={24}
          className="ml-4 mr-3"
        />

        {/* 기술 스택 */}
        <span className="body-md-regular">{stack}</span>
      </label>
    </li>
  );
}
