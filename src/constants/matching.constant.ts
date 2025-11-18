export const MATCHING_CANCEL_REASON_CODES = [
  'OTHER_MEMBER',
  'SCHEDULE',
  'ROLE_MISMATCH',
  'OTHER',
] as const;
export type MatchingCancelReasonCode =
  (typeof MATCHING_CANCEL_REASON_CODES)[number];

export const MATCHING_CANCEL_REASON_OPTIONS: Record<
  MatchingCancelReasonCode,
  string
> = {
  OTHER_MEMBER: '다른 멤버와 함께 하기로 했어요',
  SCHEDULE: '일정이 맞지 않았어요',
  ROLE_MISMATCH: '기대하는 역할과 방향이 달랐어요',
  OTHER: '기타',
};
