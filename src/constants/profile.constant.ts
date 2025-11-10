export const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]*$/;

/**
 * 연령대 값 객체
 * TODO: 상수 중복될 경우 삭제
 */
export const AGE_RANGES = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  OVER_FORTY: '40대 이상',
} as const;

/**
 * 연령대 값 배열
 * TODO: 상수 중복될 경우 삭제
 */
export const AGE_RANGE_LIST = Object.entries(AGE_RANGES).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
