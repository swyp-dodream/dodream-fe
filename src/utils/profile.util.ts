import {
  type ACTIVITY_MODE,
  type AGE_RANGES,
  type EXPERIENCE,
  type GENDER,
  INTERESTS_ID_MAP,
  ROLE,
  TECH_STACK_ID_MAP,
} from '@/constants/profile.constant';
import type { InterestsType, TechStackType } from '@/types/profile.type';
import { createReverseMap } from '@/utils/transform.util';

/** 연령대 변환 */
const AGE_VALUE_MAP: Record<keyof typeof AGE_RANGES, string> = {
  '10s': '십대',
  '20s': '이십대',
  '30s': '삼십대',
  '40plus': '사십대이상',
};
const AGE_VALUE_REVERSE_MAP = createReverseMap(AGE_VALUE_MAP);

export const convertAgeValue = (age: keyof typeof AGE_RANGES | undefined) => {
  if (age === undefined) return '선택안함';
  return AGE_VALUE_MAP[age] ?? '선택안함';
};

export const parseAgeValue = (
  label: string | undefined,
): keyof typeof AGE_RANGES | undefined => {
  if (!label || label === '선택안함') return undefined;
  return AGE_VALUE_REVERSE_MAP[label] ?? undefined;
};

/** 성별 변환 */
const GENDER_VALUE_MAP: Record<keyof typeof GENDER, string> = {
  M: '남성',
  F: '여성',
  NA: '선택안함',
};
const GENDER_VALUE_REVERSE_MAP = createReverseMap(GENDER_VALUE_MAP);

export const convertGenderValue = (
  gender: keyof typeof GENDER | undefined,
): string => {
  if (gender === undefined) return '선택안함';

  return GENDER_VALUE_MAP[gender] || '선택안함';
};

export const parseGenderValue = (
  label: string | undefined,
): keyof typeof GENDER | undefined => {
  if (!label) return undefined;
  return GENDER_VALUE_REVERSE_MAP[label] ?? undefined;
};

/** 경력 변환 */
const EXPERIENCE_VALUE_MAP: Record<keyof typeof EXPERIENCE, string> = {
  new: '신입',
  '1to3': '일년이상삼년미만',
  '3to5': '삼년이상오년미만',
  '5plus': '오년이상',
};
const EXPERIENCE_VALUE_REVERSE_MAP = createReverseMap(EXPERIENCE_VALUE_MAP);

export const convertExperienceValue = (
  experience: keyof typeof EXPERIENCE | undefined,
): string => {
  if (experience === undefined) return '선택안함';

  return EXPERIENCE_VALUE_MAP[experience] || '선택안함';
};

export const parseExperienceValue = (
  label: string | undefined,
): keyof typeof EXPERIENCE | undefined => {
  if (!label || label === '선택안함') return undefined;
  return EXPERIENCE_VALUE_REVERSE_MAP[label] ?? undefined;
};

/** 활동 방식 변환 */
const ACTIVITY_MODE_VALUE_MAP: Record<keyof typeof ACTIVITY_MODE, string> = {
  ONLINE: '온라인',
  OFFLINE: '오프라인',
  HYBRID: '하이브리드',
};
const ACTIVITY_MODE_VALUE_REVERSE_MAP = createReverseMap(
  ACTIVITY_MODE_VALUE_MAP,
);

export const convertActivityModeValue = (
  mode: keyof typeof ACTIVITY_MODE | undefined,
): string => {
  if (mode === undefined) return '선택안함';

  return ACTIVITY_MODE_VALUE_MAP[mode] || '선택안함';
};

export const parseActivityModeValue = (
  label: string | undefined,
): keyof typeof ACTIVITY_MODE | undefined => {
  if (!label || label === '선택안함') return undefined;
  return ACTIVITY_MODE_VALUE_REVERSE_MAP[label] ?? undefined;
};

/** 직군 변환 */
const ROLE_VALUE_REVERSE_MAP = createReverseMap(ROLE);

export const convertRoleValue = (
  role: keyof typeof ROLE | undefined,
): string => {
  if (role === undefined) return '선택안함';

  return ROLE[role] || '선택안함';
};

export const parseRoleValue = (
  label: string | undefined,
): keyof typeof ROLE | undefined => {
  if (!label || label === '선택안함') return undefined;
  return ROLE_VALUE_REVERSE_MAP[label] ?? undefined;
};

/** 기술 스택 변환 (TechStackType -> ID) */
const TECH_STACK_ID_REVERSE_MAP = createReverseMap(TECH_STACK_ID_MAP);

export const convertTechStackToId = (
  stack: TechStackType,
): number | undefined => {
  const id = TECH_STACK_ID_REVERSE_MAP[stack];
  return id ? Number(id) : undefined;
};

/** 관심 분야 변환 (InterestType -> ID) */
const INTERESTS_ID_REVERSE_MAP = createReverseMap(INTERESTS_ID_MAP);

export const convertInterestToId = (
  interest: InterestsType,
): number | undefined => {
  const id = INTERESTS_ID_REVERSE_MAP[interest];
  return id ? Number(id) : undefined;
};
