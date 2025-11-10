import type {
  AGE_RANGES,
  EXPERIENCE,
  GENDER,
  ROLE,
} from '@/constants/profile.constant';

// TODO: 타입 중복될 경우 삭제

// 연령대 타입
export type AgeRangeType = keyof typeof AGE_RANGES;
export type AgeRangeLabelType = (typeof AGE_RANGES)[AgeRangeType];

// 성별 타입
export type genderType = keyof typeof GENDER;
export type genderLabelType = (typeof GENDER)[genderType];

// 직군 타입
export type roleType = keyof typeof ROLE;
export type roleLabelType = (typeof ROLE)[roleType];

// 경력 타입
export type experienceType = keyof typeof EXPERIENCE;
export type experienceLabelType = (typeof EXPERIENCE)[experienceType];

/**
 * 프로필 타입
 * TODO: 실제 타입으로 변경
 */
export type Profile = {
  nickname: string;
  experience: string;
  activityMode: string;
  introText: string;
  roles: {
    id: number;
    code: string;
    name: string;
  };
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
  profileUrls: {
    id: number;
    profileId: number;
    label: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
