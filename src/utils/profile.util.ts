import type {
  ACTIVITY_MODE,
  AGE_RANGES,
  EXPERIENCE,
  GENDER,
  TECH_STACKS,
} from '@/constants/profile.constant';

/** 연령대 변환 */
export const convertAgeValue = (
  age: keyof typeof AGE_RANGES | null,
): string => {
  if (age === null) return '선택안함';

  const ageMap: Record<keyof typeof AGE_RANGES, string> = {
    '10s': '십대',
    '20s': '이십대',
    '30s': '삼십대',
    '40plus': '사십대이상',
  };

  return ageMap[age] || '선택안함';
};

/** 성별 변환 */
export const convertGenderValue = (
  gender: keyof typeof GENDER | null,
): string => {
  if (gender === null) return '선택안함';

  const genderMap: Record<keyof typeof GENDER, string> = {
    M: '남성',
    F: '여성',
    NA: '선택안함',
  };

  return genderMap[gender] || '선택안함';
};

/** 경력 변환 */
export const convertExperienceValue = (
  experience: keyof typeof EXPERIENCE | null,
): string => {
  if (experience === null) return '선택안함';

  const experienceMap: Record<keyof typeof EXPERIENCE, string> = {
    new: '신입',
    '1to3': '일년이상삼년미만',
    '3to5': '삼년이상오년미만',
    '5plus': '오년이상',
  };

  return experienceMap[experience] || '선택안함';
};

/** 활동 방식 변환 */
export const convertActivityModeValue = (
  mode: keyof typeof ACTIVITY_MODE | null,
): string => {
  if (mode === null) return '선택안함';

  const modeMap: Record<keyof typeof ACTIVITY_MODE, string> = {
    online: '온라인',
    offline: '오프라인',
    hybrid: '하이브리드',
  };

  return modeMap[mode] || '선택안함';
};

/** 기술 스택 변환 */
export const convertTechStackValue = (
  stack: keyof typeof TECH_STACKS | null,
): string => {
  if (stack === null) return '선택안함';

  const stackMap: Record<keyof typeof TECH_STACKS, string> = {
    'adobe-xd': 'Adobe',
    django: 'Django',
    express: 'Express',
    figma: 'Figma',
    firebase: 'Firebase',
    flutter: 'Flutter',
    go: 'Go',
    graphql: 'GraphQL',
    java: 'Java',
    javascript: 'JavaScript',
    kotlin: 'Kotlin',
    mongodb: 'MongoDB',
    mysql: 'MySQL',
    nestjs: 'Nestjs',
    nextjs: 'Nextjs',
    nodejs: 'Nodejs',
    'objective-c': 'Objective-C',
    php: 'php',
    python: 'Python',
    'react-native': 'ReactNative',
    ruby: 'Ruby',
    sketch: 'Sketch',
    spring: 'Spring',
    svelte: 'Svelte',
    swift: 'Swift',
    typescript: 'TypeScript',
    vue: 'Vue',
    react: 'React',
    zeplin: 'Zeplin',
  };

  return stackMap[stack] || '선택안함';
};
