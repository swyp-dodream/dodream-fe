import { ALL_LABELS } from '@/constants/filter.constant';

/** 필터링 시 영문 -> 한글 라벨 */
export const getLabel = (key: string): string => {
  return ALL_LABELS[key] ?? key;
};
