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

// 게시글 상세 페이지 목데이터
// TODO: 실제 데이터 변경 및 타입 추가
export const MOCK_POST_DETAIL = {
  id: 1,
  author: {
    id: 1,
    profileImage: '/images/profile-default.png',
    nickname: '닉네임',
    postedAt: '2025-11-11T22:24:00',
  },
  title: '프론트엔드 개발자 모집 "모이라(Moira)" – 학생 팀플 협업 툴',
  content: `여행 계획할 때 어떻게 하시나요? 지금의 여행 시장은 SNS에서 발견한 콘텐츠를 찾아 계획하는 것이 점유율 1등입니다. 그런데 내가 발견한 여행지 가려면 어떻게 하죠? 비행기, 숙소, 입장권, 맛집, 카페 등 내가 여행지에 가서 어떻게 시간을 구성할 지 "너무 여러 플랫폼"을 거치지 않나요? 저희는 여행 계획을 쉽게 하도록 여행 코스를 제공합니다. 그 안에서 개별 상품도 탐색 및 예약이 가능하도록 지향합니다. 일단 대화해보시죠. 몇장의 PPT보다 서로 사고과정을 나누는 대화가 더 중요합니다. 저는 꾸준히 이걸 성공시킬 생각입니다. 현재 웹 개발 출시 전 단계까지 개발 완료되었습니다. 대충 하지 않습니다. 연락 주세요.

[아메바트립 서비스 상세 소개]
SNS에서 발견한 매력적인 여행지를 바로 예약까지 연결하는 원스톱 여행 플랫폼입니다. SNS에서 마음에 든 여행지를 발견했지만, 실제로 여행을 계획할 때 많은 서비스들을 방문하여 예약하고, 정보를 찾았던 경험이 당연히 있으실 겁니다. 막상 도착해서도 "어? 여기서 어떻게 가지?" 하며 열심히 검색해 본 적도 있을 거예요. 그래서 아메바트립 팀은 여행을 쉽게 가고, 여행지에서는 편한 휴일을 즐길 수 있는 서비스를 키워나갈 생각입니다.

문제점 1: 여러 플랫폼을 거쳐야 목적지 정보, 리뷰 탐색 가능
문제점 2: 여러 플랫폼을 통해 예약한 후 목적지 순서를 구성해야 함

아메바트립의 해결책 & 차별화 포인트: 미팅하면서 자세히 설명드릴게요!
ex) 취향별 맞춤 코스 / 숏폼 영상 기반 여행지 소개 / 현장 실용 정보 상세페이지

발언 → 기록 → 결정 → 일정까지 흐름 전체를 한 화면에서 완결 복잡한 기능보다, 학생 팀플에 꼭 맞는 단순하고 직관적인 UX 회의가 곧 결과물이 되는 협업 툴 React 기반 실시간 협업 인터페이스 구현 (WebSocket / WebRTC 연동) Canvas 기반 회의 보드, 실시간 메모/투표/결정 화면 개발 상태 동기화 및 CRDT 기반 프론트 데이터 일관성 처리 Tanstack Router 기반 라우팅, 상태관리 구조 설계 Figma 디자인 시안을 바탕으로 UX 개선 및 인터랙션 구현

[우대사항]
Fabric.js, Konva, Canvas API 등 실시간 그래픽 경험 WebRTC / WebSocket 기반 실시간 시스템 경험 TanStack Router / Query / Zustand / Jotai 등 상태관리 숙련자 협업툴, 생산성툴 UX에 관심 많은 분`,
  summary: {
    type: '프로젝트',
    deadline: '2025-12-11T22:24:00',
    activityMethod: '오프라인',
    interests: ['사회', '엔터테인먼트'],
    duration: '1개월',
    techStacks: ['go', 'swift', 'figma', 'django', 'javascript', 'typescript'],
  },
  roles: [
    {
      name: '프론트엔드',
      recruitCount: 3,
      members: [
        { id: 1, nickname: '프론트엔드1', profileUrl: '' },
        { id: 2, nickname: '프론트엔드2', profileUrl: '' },
        { id: 3, nickname: '프론트엔드3', profileUrl: '' },
      ],
    },
    {
      name: '백엔드',
      recruitCount: 3,
      members: [
        { id: 4, nickname: '백엔드1', profileUrl: '' },
        { id: 5, nickname: '백엔드2', profileUrl: '' },
      ],
    },
    {
      name: 'iOS',
      recruitCount: 3,
      members: [{ id: 7, nickname: 'iOS1', profileUrl: '' }],
    },
    {
      name: '안드로이드',
      recruitCount: 3,
      members: [{ id: 10, nickname: '안드로이드1', profileUrl: '' }],
    },
    {
      name: '디자이너',
      recruitCount: 3,
      members: [
        { id: 13, nickname: '디자이너1', profileUrl: '' },
        { id: 14, nickname: '디자이너2', profileUrl: '' },
        { id: 15, nickname: '디자이너3', profileUrl: '' },
      ],
    },
    {
      name: 'PM',
      recruitCount: 3,
      members: [{ id: 16, nickname: 'PM1', profileUrl: '' }],
    },
    {
      name: '마케터',
      recruitCount: 3,
      members: [
        { id: 22, nickname: '마케터1', profileUrl: '' },
        { id: 23, nickname: '마케터2', profileUrl: '' },
      ],
    },
  ],
};
