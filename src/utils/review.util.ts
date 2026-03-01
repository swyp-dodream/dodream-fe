import type { ReviewAction, ReviewState } from '@/types/review.type';

/**
 * 리뷰 모달의 액션을 정의한 함수
 */
export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
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
      const reviews = state.reviews.map((r) =>
        r.userId === action.payload.userId
          ? { ...r, reaction: action.payload.reaction }
          : r,
      );
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
