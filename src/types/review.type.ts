/** 리뷰 요청 타입 */
export type ReviewRequestType = {
  postId: string;
  toUserId: string;
  feedbackType: Reaction;
  options: ReviewTag[];
};

/** 리뷰 작성할 수 있는 멤버 내역 */
export type ReviewMemberResponseType = {
  userId: bigint;
  nickname: string;
};

/** 리뷰 응답 타입 */
export type ReviewResponseType = {
  feedbackId: bigint;
  postId: bigint;
  postTitle: string;
  feedbackType: Reaction;
  options: ReviewTag[];
  receivedAt: string;
};

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

export type Reaction = 'POSITIVE' | 'NEGATIVE';

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
  | {
      type: 'SET_MEMBERS';
      payload: ReviewMemberResponseType[];
    }
  | { type: 'START_REVIEW' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | {
      type: 'SET_REACTION';
      payload: { userId: bigint; reaction: Reaction | null };
    }
  | { type: 'SET_TAGS'; payload: { userId: bigint; tags: ReviewTag[] } };
