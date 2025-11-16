import * as z from 'zod';

export const updateProfileSettingsFormSchema = z.object({
  gender: z.enum(['남성', '여성', '선택안함']),
  ageBand: z.enum(['십대', '이십대', '삼십대', '사십대이상', '선택안함']),
  isPublic: z.boolean(),
  proposalProjectOn: z.boolean(),
  proposalStudyOn: z.boolean(),
});

export type UpdateProfileSettingsFormData = z.infer<
  typeof updateProfileSettingsFormSchema
>;
