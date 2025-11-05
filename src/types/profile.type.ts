/**
 * 직무
 */
export type Role = {
  id: number;
  code: string;
  name: string;
};

/**
 * 관심 분야
 */
export type InterestKeyword = {
  id: number;
  categoryId: number;
  name: string;
};

/**
 * 기술 스택
 */
export type TechSkill = {
  id: number;
  categoryId: number;
  name: string;
};

/**
 * 사용자 프로필 URL
 */
export type ProfileUrl = {
  id: number;
  profileId: number;
  label: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * 프로필 타입
 */
export type Profile = {
  nickname: string;
  experience: string;
  activityMode: string;
  introText: string;
  roles: Role;
  interestKeywords: InterestKeyword[];
  techSkills: TechSkill[];
  profileUrls: ProfileUrl[];
};
