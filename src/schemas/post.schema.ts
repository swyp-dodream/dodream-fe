import * as z from 'zod';

const REQUIRED_SELECT_MESSAGE = '필수 선택 항목입니다.';
const REQUIRED_INPUT_MESSAGE = '필수 입력 항목입니다.';

// export const postCreateFormSchema = z
//   .object({
//     title: z.string().trim().min(1, REQUIRED_SELECT_MESSAGE),
//     projectType: z.enum(['PROJECT', 'STUDY'], {
//       error: REQUIRED_SELECT_MESSAGE,
//     }),
//     interestIds: z.array(z.int()),
//     roles: z
//       .array(z.object({ roleId: z.int(), count: z.int() }))
//       .min(1, REQUIRED_SELECT_MESSAGE),
//     stackIds: z.array(z.int()).min(1, REQUIRED_SELECT_MESSAGE),
//     activityMode: z.enum(['ONLINE', 'OFFLINE', 'HYBRID'], {
//       error: REQUIRED_SELECT_MESSAGE,
//     }),
//     duration: z.enum(
//       [
//         'UNDECIDED',
//         'UNDER_ONE_MONTH',
//         'ONE_MONTH',
//         'TWO_MONTHS',
//         'THREE_MONTHS',
//         'FOUR_MONTHS',
//         'FIVE_MONTHS',
//         'SIX_MONTHS',
//         'LONG_TERM',
//       ],
//       { error: REQUIRED_SELECT_MESSAGE },
//     ),
//     deadlineAt: z.date({ error: REQUIRED_SELECT_MESSAGE }),
//     content: z.string().trim().min(1, REQUIRED_INPUT_MESSAGE),
//   })
//   .superRefine((data, ctx) => {
//     if (data.projectType === 'PROJECT' && data.interestIds.length === 0) {
//       ctx.addIssue({
//         code: 'custom',
//         path: ['interestIds'],
//         message: REQUIRED_SELECT_MESSAGE,
//       });
//     }
//   });

const baseSchema = z.object({
  title: z.string().trim().min(1, REQUIRED_SELECT_MESSAGE),
  roles: z
    .array(z.object({ roleId: z.int(), count: z.int() }))
    .min(1, REQUIRED_SELECT_MESSAGE),
  stackIds: z.array(z.int()).min(1, REQUIRED_SELECT_MESSAGE),
  interestIds: z.array(z.int()),
  activityMode: z.enum(['ONLINE', 'OFFLINE', 'HYBRID'], {
    error: REQUIRED_SELECT_MESSAGE,
  }),
  duration: z.enum(
    [
      'UNDECIDED',
      'UNDER_ONE_MONTH',
      'ONE_MONTH',
      'TWO_MONTHS',
      'THREE_MONTHS',
      'FOUR_MONTHS',
      'FIVE_MONTHS',
      'SIX_MONTHS',
      'LONG_TERM',
    ],
    { error: REQUIRED_SELECT_MESSAGE },
  ),
  deadlineAt: z.date({ error: REQUIRED_SELECT_MESSAGE }),
  content: z.string().trim().min(1, REQUIRED_INPUT_MESSAGE),
});

const projectSchema = baseSchema.extend({
  projectType: z.literal('PROJECT'),
  interestIds: z.array(z.int()).min(1, REQUIRED_SELECT_MESSAGE),
});

const studySchema = baseSchema.extend({
  projectType: z.literal('STUDY'),
  interestIds: z.array(z.int()),
});

export const postCreateFormSchema = z.discriminatedUnion('projectType', [
  projectSchema,
  studySchema,
]);

export type PostCreateFormData = z.infer<typeof postCreateFormSchema>;
