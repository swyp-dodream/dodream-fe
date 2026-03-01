export type ReviewTag =
  | 'GOOD_COMMUNICATION'
  | 'KEEPS_PROMISES'
  | 'RESPONSIBLE'
  | 'POSITIVE_ENERGY'
  | 'PROBLEM_SOLVER'
  | 'RESPECTS_OPINIONS'
  | 'POOR_COMMUNICATION'
  | 'IGNORES_OPINIONS'
  | 'LACKS_RESPONSIBILITY'
  | 'NEGATIVE_INFLUENCE'
  | 'POOR_PROBLEM_SOLVING'
  | 'BREAKS_PROMISES';

export type Reaction = 'positive' | 'negative';

export type UserReview = {
  userId: bigint;
  reaction: Reaction | null;
  tags: ReviewTag[];
};

// 리뷰 모달 리듀서 관련 타입
/** 리뷰 state */
export type ReviewState = {
  showIntro: boolean;
  userIndex: number;
  step: 1 | 2;
  reviews: UserReview[];
};

/** 리뷰 action */
export type ReviewAction =
  | { type: 'START_REVIEW' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | {
      type: 'SET_REACTION';
      payload: { userId: bigint; reaction: Reaction | null };
    }
  | { type: 'SET_TAGS'; payload: { userId: bigint; tags: ReviewTag[] } };
