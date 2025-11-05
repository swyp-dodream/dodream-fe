import type { Profile } from '@/types/profile.type';

export const PROFILE: Profile = {
  nickname: '닉네임입니다닉네임입',
  experience: '경력 1~3년',
  activityMode: '온라인',
  introText:
    '안녕하세요, 직무 전문가 이름입니다. 간결한 한 줄 강점/경험을 통해 지원 분야에 기여하겠습니다. 첫째, 강점입니다. 관련 경험/성과를 통해 구체적으로 증명을 할 수 있었습니다. 구체적인 수치를 제시하여, 역량을 갖추었음을 증명했습니다. 둘째, 강점입니다. 관련 경험/성과를 통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여, 역량을 갖추었음을',
  roles: {
    id: 0,
    code: 'DISIGNER',
    name: '디자이너',
  },
  interestKeywords: [
    {
      id: 0,
      categoryId: 0,
      name: '환경',
    },
    {
      id: 1,
      categoryId: 1,
      name: '사회',
    },
    {
      id: 2,
      categoryId: 2,
      name: '엔터테인먼트',
    },
    {
      id: 3,
      categoryId: 3,
      name: 'AI',
    },
    {
      id: 4,
      categoryId: 4,
      name: '금융',
    },
  ],
  techSkills: [
    {
      id: 0,
      categoryId: 0,
      name: 'typeScript',
    },
    {
      id: 1,
      categoryId: 1,
      name: 'javascript',
    },
    {
      id: 2,
      categoryId: 2,
      name: 'nextjs',
    },
    {
      id: 3,
      categoryId: 3,
      name: 'express',
    },
    {
      id: 4,
      categoryId: 4,
      name: 'nodejs',
    },
  ],
  profileUrls: [
    {
      id: 0,
      profileId: 0,
      label: '깃허브',
      url: 'https://github.com/djfhdsnf/',
      createdAt: '2025-10-30',
      updatedAt: '2025-10-30',
    },
    {
      id: 1,
      profileId: 1,
      label: '노션',
      url: 'https://notion.com/en/account/dhfjdfnkdvndnv',
      createdAt: '2025-10-30',
      updatedAt: '2025-10-30',
    },
    {
      id: 2,
      profileId: 2,
      label: '포트폴리오',
      url: 'https://sjdnksndnv.com',
      createdAt: '2025-10-30',
      updatedAt: '2025-10-30',
    },
  ],
};
