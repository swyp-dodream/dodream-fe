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

export const convertAgeValue = (age: keyof typeof AGE_RANGES | null) => {
  if (age === null) return '선택안함';
  return AGE_VALUE_MAP[age] ?? '선택안함';
};

export const parseAgeValue = (
  label: string | null,
): keyof typeof AGE_RANGES | null => {
  if (!label || label === '선택안함') return null;
  return AGE_VALUE_REVERSE_MAP[label] ?? null;
};

/** 성별 변환 */
const GENDER_VALUE_MAP: Record<keyof typeof GENDER, string> = {
  M: '남성',
  F: '여성',
  NA: '선택안함',
};
const GENDER_VALUE_REVERSE_MAP = createReverseMap(GENDER_VALUE_MAP);

export const convertGenderValue = (
  gender: keyof typeof GENDER | null,
): string => {
  if (gender === null) return '선택안함';

  return GENDER_VALUE_MAP[gender] || '선택안함';
};

export const parseGenderValue = (
  label: string | null,
): keyof typeof GENDER | null => {
  if (!label) return null;
  return GENDER_VALUE_REVERSE_MAP[label] ?? null;
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
  experience: keyof typeof EXPERIENCE | null,
): string => {
  if (experience === null) return '선택안함';

  return EXPERIENCE_VALUE_MAP[experience] || '선택안함';
};

export const parseExperienceValue = (
  label: string | null,
): keyof typeof EXPERIENCE | null => {
  if (!label || label === '선택안함') return null;
  return EXPERIENCE_VALUE_REVERSE_MAP[label] ?? null;
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
  mode: keyof typeof ACTIVITY_MODE | null,
): string => {
  if (mode === null) return '선택안함';

  return ACTIVITY_MODE_VALUE_MAP[mode] || '선택안함';
};

export const parseActivityModeValue = (
  label: string | null,
): keyof typeof ACTIVITY_MODE | null => {
  if (!label || label === '선택안함') return null;
  return ACTIVITY_MODE_VALUE_REVERSE_MAP[label] ?? null;
};

/** 직군 변환 */
const ROLE_VALUE_REVERSE_MAP = createReverseMap(ROLE);

export const convertRoleValue = (role: keyof typeof ROLE | null): string => {
  if (role === null) return '선택안함';

  return ROLE[role] || '선택안함';
};

export const parseRoleValue = (
  label: string | null,
): keyof typeof ROLE | null => {
  if (!label || label === '선택안함') return null;
  return ROLE_VALUE_REVERSE_MAP[label] ?? null;
};

/** 기술 스택 변환 (TechStackType -> ID) */
const TECH_STACK_ID_REVERSE_MAP = createReverseMap(TECH_STACK_ID_MAP);

export const convertTechStackToId = (stack: TechStackType): number | null => {
  const id = TECH_STACK_ID_REVERSE_MAP[stack];
  return id ? Number(id) : null;
};

/** 관심 분야 변환 (InterestType -> ID) */
const INTERESTS_ID_REVERSE_MAP = createReverseMap(INTERESTS_ID_MAP);

export const convertInterestToId = (interest: InterestsType): number | null => {
  const id = INTERESTS_ID_REVERSE_MAP[interest];
  return id ? Number(id) : null;
};
