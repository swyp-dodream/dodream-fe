export const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]*$/;

/**
 * 연령대 값 객체
 * TODO: 상수 중복될 경우 삭제
 */
export const AGE_RANGES = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40plus': '40대 이상',
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

/**
 * 성별 값 객체
 * TODO: 상수 중복될 경우 삭제
 */
export const GENDER = {
  M: '남자',
  F: '여자',
  NA: '선택안함',
};

/**
 * 성별 값 객체 배열
 * TODO: 상수 중복될 경우 삭제
 */
export const GENDER_LIST = Object.entries(GENDER).map(([value, label]) => ({
  value,
  label,
}));
