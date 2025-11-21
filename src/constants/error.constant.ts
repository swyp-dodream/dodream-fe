export const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  APPLY: {
    CONFLICT_MATCHED_ALREADY_CANCELED: '매칭이 취소된 모집글입니다.',
    CONFLICT: '이미 지원한 공고입니다.',
  },
} as const;
