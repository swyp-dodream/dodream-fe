import type { InterestsType, TechStackType } from '@/types/profile.type';

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
  기획자: '기획자',
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
  ONLINE: '온라인',
  OFFLINE: '오프라인',
  HYBRID: '온·오프라인',
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
export const TECH_STACK_MAP: Record<TechStackType, string> = {
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
  Adobe: 'adobe-xd',
  Figma: 'figma',
  Sketch: 'sketch',
};

export const TECH_STACKS_BY_ROLE: Record<string, TechStackType[]> = {
  프론트엔드: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Svelte', 'Nextjs'],
  백엔드: [
    'Java',
    'Spring',
    'Nodejs',
    'Nestjs',
    'Go',
    'Kotlin',
    'Express',
    'MySQL',
    'MongoDB',
    'Ruby',
    'Python',
    'Django',
    'php',
    'GraphQL',
    'Firebase',
  ],
  모바일: ['Swift', 'Objective-C', 'Kotlin', 'Java', 'Flutter', 'ReactNative'],
  디자인: ['Zeplin', 'Figma', 'Sketch', 'Adobe'],
};

export const TECH_STACKS_BY_ROLE_KEYS = Object.keys(TECH_STACKS_BY_ROLE);

/**
 * 관심 분야 객체
 */
export const INTERESTS: Record<InterestsType, string> = {
  // 기술
  ai: 'AI',
  mobility: '모빌리티',
  data: '데이터',
  // 비즈니스
  ecommerce: '이커머스',
  o2o: 'O2O',
  finance: '금융',
  // 사회
  environment: '환경',
  local: '지역',
  education: '교육',
  // 라이프
  fnb: 'F&B',
  'fashion-beauty': '패션&뷰티',
  health: '건강',
  travel: '여행',
  sports: '스포츠',
  pet: '반려동물',
  // 문화
  game: '게임',
  media: '미디어',
  'art-performance': '예술&공연',
};

export const INTERESTS_BY_CATEGORY: Record<string, InterestsType[]> = {
  기술: ['ai', 'mobility', 'data'],
  비즈니스: ['ecommerce', 'o2o', 'finance'],
  사회: ['environment', 'local', 'education'],
  라이프: ['fnb', 'fashion-beauty', 'health', 'travel', 'sports', 'pet'],
  문화: ['game', 'media', 'art-performance'],
};

export const INTERESTS_BY_CATEGORY_KEYS = Object.keys(INTERESTS_BY_CATEGORY);

export const INDEX_LABEL: Record<number, string> = {
  1: '①',
  2: '②',
  3: '③',
  4: '④',
  5: '⑤',
};
