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

/** 프로필 스키마 */
export const profileFormSchema = z.object({
  nickname: nicknameSchema,
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
