import { ALL_LABELS } from '@/constants/filter.constant';

/** 필터링 시 영문 -> 한글 라벨 */
export const getLabel = (key: string): string => {
  return ALL_LABELS[key] ?? key;
};

/**
 * 페이지 번호를 검증하고 유효한 범위로 보정 (1-based)
 * @param page - 검증할 페이지 번호
 * @param totalPage - 전체 페이지 수 (선택사항)
 * @returns 유효한 페이지 번호 (1-based)
 */
export function getValidPage(
  page: string | number | null,
  totalPage?: number,
): number {
  if (!page) return 1;

  const pageNum = Number(page);
  if (!pageNum || pageNum < 1) return 1;

  if (totalPage && pageNum > totalPage) return totalPage;

  return pageNum;
}
