import type { PRESERVE_PARAMS } from '@/constants/filter.constant';

/** 필터링 종류 */
export type SortType = 'LATEST' | 'DEADLINE' | 'POPULAR';

/** 필터 탭에서 제외할 팔터 타입 */
export type PreserveParamType = (typeof PRESERVE_PARAMS)[number];
