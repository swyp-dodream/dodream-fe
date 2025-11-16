/** 유저 데이터 타입 */
export type UserType = {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  provider: ProviderType;
  lastLoginAt: string;
};

export type ProviderType = 'GOOGLE' | 'NAVER';

/** 프로필 데이터 타입 */
export type ProfileType = {
  nickname: string;
  experience: string;
  activityMode: string;
  introText: string;
  profileImageCode: number;
  roles: {
    id: number;
    code: string;
    name: string;
  }[];
  interestKeywords: {
    id: number;
    categoryId: number;
    name: string;
  }[];
  techSkills: {
    id: number;
    categoryId: number;
    name: string;
  }[];
  profileUrls: Record<string, string>;
};
