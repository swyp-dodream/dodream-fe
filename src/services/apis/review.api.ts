import type {
  ReviewMemberResponseType,
  ReviewRequestType,
  ReviewResponseType,
} from '@/types/review.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createReviewsApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 리뷰 작성 */
    createReviews: (payload: ReviewRequestType) =>
      apiClient.post<ReviewRequestType>(`/api/feedbacks`, payload),

    getReviewMemberList: (postId: bigint) =>
      apiClient.get<ReviewMemberResponseType[]>(
        `/api/feedbacks/${postId}/members`,
      ),

    /** 내가 받은 리뷰 조회 */
    getMyReviews: () =>
      apiClient.get<ReviewResponseType[]>(`/api/feedbacks/my`),

    /** 특정 게시글에서 내가 작성한 리뷰 조회 */
    getMyReviewsByPost: (postId: bigint) =>
      apiClient.get<ReviewResponseType[]>(`/api/feedbacks/my/${postId}`),

    /** 특정 게시글에서 내가 받은 리뷰 조회 */
    getPostReviews: (postId: bigint) =>
      apiClient.get<ReviewResponseType[]>(`/api/feedbacks/my/post/${postId}`),
  };
}
