import type { TechStackType } from '@/types/profile.type';

export const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]*$/;

// TODO: 상수 중복될 경우 삭제

/**
 * 연령대 값 객체
 */
export const AGE_RANGES = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40plus': '40대 이상',
} as const;

export const AGE_RANGE_LIST = Object.entries(AGE_RANGES).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

/**
 * 성별 값 객체
 */
export const GENDER = {
  M: '남자',
  F: '여자',
  NA: '선택안함',
} as const;

export const GENDER_LIST = Object.entries(GENDER).map(([value, label]) => ({
  value,
  label,
}));

/**
 * 직군 값 객체
 */
export const ROLE = {
  FE: '프론트엔드',
  BE: '백엔드',
  iOS: 'iOS',
  AOS: '안드로이드',
  Designer: '디자이너',
  PM: 'PM',
  Planner: '기획자',
  Marketer: '마케터',
} as const;

export const ROLE_LIST = Object.entries(ROLE).map(([value, label]) => ({
  value,
  label,
}));

/**
 * 경력 값 객체
 */
export const EXPERIENCE = {
  new: '없음',
  '1to3': '1~3년',
  '3to5': '3~5년',
  '5plus': '5년 이상',
};

export const EXPERIENCE_LIST = Object.entries(EXPERIENCE).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

/**
 * 선호 방식 값 객체
 */
export const ACTIVITY_MODE = {
  online: '온라인',
  offline: '오프라인',
  hybrid: '온·오프라인',
};

export const ACTIVITY_MODE_LIST = Object.entries(ACTIVITY_MODE).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

/**
 * 기술 스택 객체
 */
export const TECH_STACKS: Record<TechStackType, string> = {
  // 프론트엔드
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  vue: 'Vue',
  svelte: 'Svelte',
  nextjs: 'Next.js',
  // 백엔드
  java: 'Java',
  spring: 'Spring',
  nodejs: 'Node.js',
  nestjs: 'NestJS',
  go: 'Go',
  express: 'Express',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
  ruby: 'Ruby',
  python: 'Python',
  django: 'Django',
  php: 'PHP',
  graphql: 'GraphQL',
  firebase: 'Firebase',
  // 모바일
  swift: 'Swift',
  'objective-c': 'Objective-C',
  kotlin: 'Kotlin',
  flutter: 'Flutter',
  'react-native': 'React Native',
  // 디자인
  zeplin: 'Zeplin',
  'adobe-xd': 'Adobe XD',
  figma: 'Figma',
  sketch: 'Sketch',
};

export const TECH_STACKS_BY_ROLE: Record<string, TechStackType[]> = {
  프론트엔드: ['javascript', 'typescript', 'react', 'vue', 'svelte', 'nextjs'],
  백엔드: [
    'java',
    'spring',
    'nodejs',
    'nestjs',
    'go',
    'kotlin',
    'express',
    'mysql',
    'mongodb',
    'ruby',
    'python',
    'django',
    'php',
    'graphql',
    'firebase',
  ],
  모바일: ['swift', 'objective-c', 'kotlin', 'java', 'flutter', 'react-native'],
  디자인: ['zeplin', 'figma', 'sketch', 'adobe-xd'],
};

export const TECH_STACKS_BY_ROLE_KEYS = Object.keys(TECH_STACKS_BY_ROLE);
