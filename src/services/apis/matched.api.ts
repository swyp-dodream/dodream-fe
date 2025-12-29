import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type { GetMyMatchedPostsResponseType } from '@/types/post.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createMatchedApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 지원 수락 */
    match: (postId: bigint, applicationId: bigint) =>
      apiClient.post<void>(
        `/api/matched/${postId}/applications/${applicationId}/accept`,
      ),

    /** 매칭 취소 */
    cancelMatching: (
      matchingId: bigint,
      reasonCode: MatchingCancelReasonCode,
      reasonText: string,
    ) =>
      apiClient.post(`/api/matched/${BigInt(matchingId)}/cancel`, {
        reasonCode,
        reasonText,
      }),

    /** 내가 매칭된 글 목록 조회 */
    getMyMatchedPosts: (page?: number, size: number = 10) => {
      const params = new URLSearchParams();

      if (page) params.set('page', String(page));
      if (size) params.set('size', String(size));

      return apiClient.get<GetMyMatchedPostsResponseType>(
        `/api/matched?${params.toString()}`,
      );
    },
  };
}
