import Image from 'next/image';
import { Checkbox } from '@/components/commons/check-box';
import type { TechSkill } from '@/types/tech-skill.type';

interface TechStackSelectProps {
  stack: TechSkill;
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
  const slug = getAssetSlug(stack.name);

  return (
    <li className="flex items-center mx-3">
      <label
        htmlFor={`tech-skill-${stack.id}`}
        className="flex items-center cursor-pointer"
      >
        {/* 체크박스 */}
        <Checkbox
          name="skills"
          id={`tech-skill-${stack.id}`}
          checked={checked}
          onChange={toggleStacks}
        />

        {/* 기술 스택 이미지 */}
        <Image
          src={`/logo/stacks/${slug}/24.svg`}
          alt={stack.name}
          width={24}
          height={24}
          className="ml-4 mr-3"
        />

        {/* 기술 스택 */}
        <span className="body-md-regular">{stack.name}</span>
      </label>
    </li>
  );
}

const TECH_SKILL_ASSET_MAP: Record<TechSkill['name'], string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'react',
  Vue: 'vue',
  Svelte: 'svelte',
  Nextjs: 'nextjs',
  Java: 'java',
  Spring: 'spring',
  Nodejs: 'nodejs',
  Nestjs: 'nestjs',
  Go: 'go',
  Express: 'express',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Ruby: 'ruby',
  Python: 'python',
  Django: 'django',
  php: 'php',
  GraphQL: 'graphql',
  Firebase: 'firebase',
  Swift: 'swift',
  'Objective-C': 'objective-c',
  Kotlin: 'kotlin',
  Flutter: 'flutter',
  ReactNative: 'react-native',
  Zeplin: 'zeplin',
  Figma: 'figma',
  Sketch: 'sketch',
  Adobe: 'adobe-xd',
};

function getAssetSlug(name: TechSkill['name']) {
  return TECH_SKILL_ASSET_MAP[name] ?? name.toLowerCase();
}
