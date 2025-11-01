export const ROLES = [
  'FE',
  'BE',
  'iOS',
  'AOS',
  'Designer',
  'PM',
  'Planner',
  'Marketer',
] as const;

export type Role = (typeof ROLES)[number];

export const TECH_CATEGORIES = [
  'adobe-xd',
  'django',
  'express',
  'figma',
  'firebase',
  'flutter',
  'go',
  'graphql',
  'java',
  'javascript',
  'kotlin',
  'mongodb',
  'mysql',
  'nestjs',
  'nextjs',
  'nodejs',
  'objective-c',
  'php',
  'python',
  'react-native',
  'ruby',
  'sketch',
  'spring',
  'svelte',
  'swift',
  'typescript',
  'vue',
  'zeplin',
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export const PROJECT_TYPES = ['project', 'study'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const ACTIVITY_MODES = ['online', 'offline', 'hybrid'] as const;
export type ActivityMode = (typeof ACTIVITY_MODES)[number];

export const POST_STATUSES = ['recruiting', 'completed'] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export interface MockPost {
  id: bigint;
  ownerUserId: string;
  projectType: ProjectType;
  activityMode: ActivityMode;
  durationText: string;
  deadlineAt: Date;
  status: PostStatus;
  title: string;
  roles: Role[];
  techCategories: TechCategory[];
  isBookmarked: boolean;
  views: number;
}

const TITLES = [
  '함께 성장할 스터디 팀원을 모집합니다',
  '실전 프로젝트로 포트폴리오 완성해요',
  '신입 개발자와 디자이너를 찾고 있어요',
  '모바일 앱 출시를 함께 준비할 분 찾습니다',
  '실무 감각 키울 단기 프로젝트입니다',
  '커리어 전환을 위한 토이 프로젝트 팀',
  '주말 집중 온라인 스터디 팀원 구해요',
  'AI 서비스 기획 프로젝트 참여자 모집',
  '여름 방학 동안 진행할 집중 스터디',
  '리팩터링 챌린지 함께 하실 분',
  '전국 각지에서 참여하는 하이브리드 프로젝트로 서비스 기획부터 배포까지 전 과정을 경험할 개발자와 디자이너를 찾습니다',
  '프로덕트 전반을 책임질 핵심 멤버를 모집합니다 – 문제 정의, 사용자 리서치, 백로그 정리, 개발, QA까지 함께 진행할 분 환영해요',
  '대규모 서비스 확장을 목표로 한 장기 프로젝트입니다. 기술 부채를 줄이고 새로운 기능을 설계하며 성장할 열정적인 동료를 찾고 있어요',
] as const;

const DURATIONS = ['2주', '4주', '6주', '8주', '10주', '12주'] as const;

const pickByIndex = <T>(options: readonly T[], index: number): T =>
  options[index % options.length];

const createPseudoRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const getRandomSubset = <T extends string>(
  source: readonly T[],
  seed: number,
  min = 1,
  max = 5,
): T[] => {
  const random = createPseudoRandom(seed);
  const size = Math.min(
    source.length,
    min + Math.floor(random() * (max - min + 1)),
  );

  const indices = source.map((_, idx) => idx);

  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, size).map((idx) => source[idx]);
};

const buildRoles = (index: number): Role[] =>
  getRandomSubset(ROLES, index * 17);

const buildTechCategories = (index: number): TechCategory[] =>
  getRandomSubset(TECH_CATEGORIES, index * 31, 1, TECH_CATEGORIES.length);

const getRandomItem = <T>(source: readonly T[], seed: number): T => {
  const random = createPseudoRandom(seed);
  const pickedIndex = Math.floor(random() * source.length);
  return source[pickedIndex];
};

export const MOCK_POSTS: MockPost[] = Array.from(
  { length: 100 },
  (_, index) => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() + ((index % 20) + 1));

    return {
      id: BigInt(index + 1),
      ownerUserId: `닉네임${BigInt((index % 25) + 1)}`,
      projectType: pickByIndex(PROJECT_TYPES, index),
      activityMode: pickByIndex(ACTIVITY_MODES, index),
      durationText: pickByIndex(DURATIONS, index),
      deadlineAt: createdAt,
      status: getRandomItem(POST_STATUSES, index * 53),
      title: pickByIndex(TITLES, index),
      roles: buildRoles(index),
      techCategories: buildTechCategories(index),
      isBookmarked: index % 3 === 0,
      views: 120 + index * 13,
    };
  },
);
