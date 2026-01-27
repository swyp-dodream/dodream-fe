import { z } from 'zod';
import {
  ACTIVITY_MODE,
  AGE_RANGES,
  EXPERIENCE,
  GENDER,
  INTERESTS,
  NICKNAME_REGEX,
  ROLE,
  TECH_STACK_MAP,
} from '@/constants/profile.constant';
import type { InterestsType, TechStackType } from '@/types/profile.type';

/** URL 정규식 */
const URL_PATTERN =
  /^(https?:\/\/)?([\da-z\u00a1-\uffff.-]+)\.([a-z.]{2,6})([/\w\u00a1-\uffff .-]*)*\/?$/i;

/** 닉네임 실시간 검증용 */
export const nicknameValidations = {
  length: z.string().max(10),
  format: z.string().regex(NICKNAME_REGEX),
};

/** 닉네임 스키마 */
export const nicknameSchema = z
  .string()
  .min(1, '필수 입력 항목입니다')
  .max(10, ' ')
  .regex(NICKNAME_REGEX, ' ');

/**
 * 나이, 성별, 직군, 경력, 선호 방식 스키마
 * - 기존에 있던 타입 활용
 */
export const ageSchema = z.enum(
  Object.keys(AGE_RANGES) as [
    keyof typeof AGE_RANGES,
    ...Array<keyof typeof AGE_RANGES>,
  ],
);

export const genderSchema = z.enum(
  Object.keys(GENDER) as [keyof typeof GENDER, ...Array<keyof typeof GENDER>],
);

export const roleSchema = z.enum(
  Object.keys(ROLE) as [keyof typeof ROLE, ...Array<keyof typeof ROLE>],
);

export const experienceSchema = z.enum(
  Object.keys(EXPERIENCE) as [
    keyof typeof EXPERIENCE,
    ...Array<keyof typeof EXPERIENCE>,
  ],
);

export const activityModeSchema = z.enum(
  Object.keys(ACTIVITY_MODE) as [
    keyof typeof ACTIVITY_MODE,
    ...Array<keyof typeof ACTIVITY_MODE>,
  ],
);

/** 기술 스택 스키마 */
export const techStacksSchema = z.array(
  z.enum(Object.keys(TECH_STACK_MAP) as [TechStackType, ...TechStackType[]]),
);

/** 관심 분야 스키마 */
export const interestsSchema = z
  .array(z.enum(Object.keys(INTERESTS) as [InterestsType, ...InterestsType[]]))
  .min(1, '필수 선택 항목입니다');

/** 링크 스키마 */
const linkSchema = z.object({
  id: z.string(),
  value: z.string(),
  error: z.string().optional(),
});

export const linksSchema = z.array(linkSchema).refine(
  (links) => {
    if (links.some((link) => link.error)) {
      return false;
    }

    return links.every((link) => {
      if (!link.value) return true;
      return URL_PATTERN.test(link.value);
    });
  },
  { message: '유효한 URL을 입력해 주세요' },
);

/** 자기소개 스키마 */
export const introSchema = z.string().min(1, '필수 입력 항목입니다');

/** 전체 프로필 스키마 */
export const profileFormSchema = z.object({
  nickname: nicknameSchema,
  age: ageSchema.nullable().refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  }),
  gender: genderSchema.nullable().refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  }),
  role: roleSchema
    .nullable()
    .refine((val) => val !== null, {
      message: '필수 선택 항목입니다',
    })
    .transform((val) => val!),
  experience: experienceSchema
    .nullable()
    .refine((val) => val !== null, {
      message: '필수 선택 항목입니다',
    })
    .transform((val) => val!),
  activityMode: activityModeSchema
    .nullable()
    .refine((val) => val !== null, {
      message: '필수 선택 항목입니다',
    })
    .transform((val) => val!),
  techStacks: techStacksSchema,
  interests: interestsSchema,
  links: linksSchema,
  intro: introSchema,
  acceptOffers: z.boolean(),
});

/** 프로필 폼 데이터 타입 */
export type ProfileFormData = z.infer<typeof profileFormSchema>;

/** 프로필 수정용 스키마 (age, gender, acceptOffers 제외) */
export const profileEditFormSchema = profileFormSchema.omit({
  age: true,
  gender: true,
  acceptOffers: true,
});

/** 프로필 수정 폼 데이터 타입 */
export type ProfileEditFormData = z.infer<typeof profileEditFormSchema>;
export type ProfileEditFormInput = z.input<typeof profileEditFormSchema>;
