import type {
  ACTIVITY_MODE,
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
export type GenderType = keyof typeof GENDER;
export type GenderLabelType = (typeof GENDER)[GenderType];

// 직군 타입
export type RoleType = keyof typeof ROLE;
export type RoleLabelType = (typeof ROLE)[RoleType];

// 경력 타입
export type ExperienceType = keyof typeof EXPERIENCE;
export type ExperienceLabelType = (typeof EXPERIENCE)[ExperienceType];

// 선호 방식 타입
export type ActivityModeType = keyof typeof ACTIVITY_MODE;
export type ActivityModeLabelType = (typeof ACTIVITY_MODE)[ActivityModeType];

// 기술 스택 타입
// TODO: 추후 백엔드에서 받아오는 것으로 수정
export type TechStackType =
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'vue'
  | 'svelte'
  | 'nextjs'
  | 'java'
  | 'spring'
  | 'nodejs'
  | 'nestjs'
  | 'go'
  | 'express'
  | 'mysql'
  | 'mongodb'
  | 'ruby'
  | 'python'
  | 'django'
  | 'php'
  | 'graphql'
  | 'firebase'
  | 'swift'
  | 'objective-c'
  | 'kotlin'
  | 'flutter'
  | 'react-native'
  | 'zeplin'
  | 'adobe-xd'
  | 'figma'
  | 'sketch';

// 관심 분야 타입
// TODO: 추후 백엔드에서 받아오는 것으로 수정
export type InterestsType =
  // 기술
  | 'ai'
  | 'mobility'
  | 'data'
  // 비즈니스
  | 'ecommerce'
  | 'o2o'
  | 'finance'
  // 사회
  | 'environment'
  | 'local'
  | 'education'
  // 라이프
  | 'fnb'
  | 'fashion-beauty'
  | 'health'
  | 'travel'
  | 'sports'
  | 'pet'
  // 문화
  | 'game'
  | 'media'
  | 'art-performance';

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
