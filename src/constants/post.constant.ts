import type { DurationType } from '@/types/post.type';

/** 기간 매핑 객체 */
export const DURATION_LABELS: Record<DurationType, string> = {
  UNDECIDED: '미정',
  UNDER_ONE_MONTH: '1개월 미만',
  ONE_MONTH: '1개월',
  TWO_MONTHS: '2개월',
  THREE_MONTHS: '3개월',
  FOUR_MONTHS: '4개월',
  FIVE_MONTHS: '5개월',
  SIX_MONTHS: '6개월',
  LONG_TERM: '장기',
};

export const DURATION_LIST = Object.entries(DURATION_LABELS).map(
  ([value, label]) => ({
    value: value as DurationType,
    label,
  }),
);
