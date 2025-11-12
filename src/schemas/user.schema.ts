import { z } from 'zod';
import { NICKNAME_REGEX } from '@/constants/profile.constant';

// 닉네임 실시간 검증용
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

/** 나이 스키마 */
export const ageSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  });

/** 성별 스키마 */
export const genderSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  });

/** 직군 스키마 */
export const roleSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  });

/** 경력 스키마 */
export const experienceSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  });

/** 선호 방식 스키마 */
export const activityModeSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, {
    message: '필수 선택 항목입니다',
  });

/** 관심 분야 스키마 */
export const interestsSchema = z
  .array(z.string())
  .min(1, '필수 선택 항목입니다');

/** 링크 스키마 */
const linkSchema = z.object({
  id: z.string(),
  value: z.string(),
  error: z.string().optional(),
});

const URL_PATTERN =
  /^(https?:\/\/)?([\da-z\u00a1-\uffff.-]+)\.([a-z.]{2,6})([/\w\u00a1-\uffff .-]*)*\/?$/i;

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
  age: ageSchema,
  gender: genderSchema,
  role: roleSchema,
  experience: experienceSchema,
  activityMode: activityModeSchema,
  interests: interestsSchema,
  links: linksSchema,
  intro: introSchema,
  acceptOffers: z.boolean(), // 지원 제안 받기
});

/** 프로필 폼 데이터 타입 */
export type ProfileFormData = z.infer<typeof profileFormSchema>;
