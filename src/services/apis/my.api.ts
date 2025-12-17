import type {
  GetMyApplicationDetailResponseType,
  MyPostApplicantDetailType,
  MyPostApplicationsType,
  MyPostOffersType,
  MyPostsResponseType,
} from '@/types/my.type';
import type {
  GetMyAppliedPostsResponseType,
  GetMySuggestedPostResponseType,
} from '@/types/post.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createMyApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** -- 내 제안 내역 -- */

    /** 멤버 제안 보내기 */
    offer: (postId: bigint, userId: bigint) =>
      apiClient.post(`/api/my/suggestions/${BigInt(postId)}/suggestions`, {
        toUserId: BigInt(userId).toString(),
        suggestionMessage: '',
      }),

    /** 내가 제안 받은 글 목록 조회 */
    getMySuggestedPosts: (page?: number, size: number = 10) => {
      const params = new URLSearchParams();

      if (page) params.set('page', String(page));
      if (size) params.set('size', String(size));

      return apiClient.get<GetMySuggestedPostResponseType>(
        `/api/my/suggestions?${params.toString()}`,
      );
    },

    /** 제안 취소 */
    cancelOffer: (suggestionId: bigint) =>
      apiClient.delete<void>(
        `/api/my/suggestions/suggestions/${BigInt(suggestionId)}/cancel`,
      ),

    /** -- 내 지원 내역 -- */

    /** 내가 지원한 글 목록 조회 */
    getMyAppliedPosts: (page?: number, size: number = 10) => {
      const params = new URLSearchParams();

      if (page) params.set('page', String(page));
      if (size) params.set('size', String(size));

      return apiClient.get<GetMyAppliedPostsResponseType>(
        `/api/my/applications?${params.toString()}`,
      );
    },

    /** 내 지원 상세 조회 */
    getMyApplicationDetail: (applicationId: bigint) =>
      apiClient.get<GetMyApplicationDetailResponseType>(
        `/api/my/applications/${BigInt(applicationId)}`,
      ),

    /** 지원 취소 */
    cancelApply: (applicationId: bigint) =>
      apiClient.delete(`/api/my/applications/${applicationId}/cancel`),

    /** 내가 쓴 글 목록 */
    getMyPosts: (type: string, page: number, size = 10) => {
      const tab = type === 'PROJECT' ? 'project' : 'study';
      return apiClient.get<MyPostsResponseType>(
        `/api/posts/my?size=${size}&tab=${tab}&page=${page}`,
      );
    },

    /** 내 모집글 지원 목록 조회 */
    getMyPostApplications: (postId: bigint) =>
      apiClient.get<MyPostApplicationsType>(
        `/api/posts/${BigInt(postId)}/recruits/applications`,
      ),

    /** 내 모집글 지원자 상세 정보 */
    getMyPostApplicantDetail: (postId: bigint, applicationId: bigint) =>
      apiClient.get<MyPostApplicantDetailType>(
        `/api/posts/${postId}/recruits/applications/${applicationId}`,
      ),

    /** 내 모집글 제안 내역 */
    getMyPostOffers: (postId: bigint) =>
      apiClient.get<MyPostOffersType>(`/api/posts/${postId}/recruits/offers`),
  };
}
