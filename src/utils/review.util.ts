import type {
  Reaction,
  ReviewAction,
  ReviewResponseType,
  ReviewState,
  ReviewTag,
} from '@/types/review.type';

/**
 * 리뷰 모달의 액션을 정의한 함수
 */
export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    // 멤버 세팅
    case 'SET_MEMBERS':
      return {
        ...state,
        reviews: action.payload.map((member) => ({
          userId: member.userId,
          reaction: null,
          tags: [],
        })),
      };

    // 리뷰 시작 (인트로 제거)
    case 'START_REVIEW':
      return { ...state, showIntro: false };

    // 다음 버튼 클릭
    case 'NEXT':
      if (state.step === 1) return { ...state, step: 2 };
      return { ...state, userIndex: state.userIndex + 1, step: 1 };

    // 이전 버튼 클릭
    case 'PREV':
      if (state.step === 2) return { ...state, step: 1 };
      return { ...state, userIndex: state.userIndex - 1, step: 2 };

    // 긍정/부정 후기 선택
    case 'SET_REACTION': {
      const reviews = state.reviews.map((r) => {
        if (r.userId !== action.payload.userId) return r;

        const reactionChanged = r.reaction !== action.payload.reaction;
        return {
          ...r,
          reaction: action.payload.reaction,
          tags: reactionChanged ? [] : r.tags,
        };
      });
      return { ...state, reviews };
    }

    // 리뷰 상세 태그 선택
    case 'SET_TAGS': {
      const reviews = state.reviews.map((r) =>
        r.userId === action.payload.userId
          ? { ...r, tags: action.payload.tags }
          : r,
      );
      return { ...state, reviews };
    }

    default:
      return state;
  }
}

/** 전체 리뷰 목록 중 필요한 값만 계산 */
export function getReviewSummary(
  reviews: ReviewResponseType[],
  isPositive?: boolean,
) {
  // 긍정 리뷰 개수
  const positiveCount = reviews.filter(
    (r) => r.feedbackType === 'POSITIVE',
  ).length;

  // 부정 리뷰 개수
  const negativeCount = reviews.filter(
    (r) => r.feedbackType === 'NEGATIVE',
  ).length;

  // 긍정/부정 중 더 많은 타입
  const dominantType: Reaction =
    isPositive !== undefined
      ? isPositive
        ? 'POSITIVE'
        : 'NEGATIVE'
      : positiveCount >= negativeCount
        ? 'POSITIVE'
        : 'NEGATIVE';

  // 각 태그 개수 카운팅
  const sortedTagCounts = reviews
    .filter((r) => r.feedbackType === dominantType)
    .flatMap((r) => r.options)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
        return acc;
      },
      {} as Record<ReviewTag, number>,
    );

  // 태그 많은 순으로 정렬
  const result = Object.entries(sortedTagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag: tag as ReviewTag, count }));

  return { positiveCount, negativeCount, dominantType, result };
}
