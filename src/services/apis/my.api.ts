import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type {
  GetMyApplicationDetailResponseType,
  MyPostApplicantDetailType,
  MyPostApplicantProfileType,
  MyPostApplicationsType,
  MyPostOffersType,
  MyPostRecommendedApplications,
  MyPostsResponseType,
} from '@/types/my.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createMyApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** 내 지원 상세 조회 */
    getMyApplicationDetail: (applicationId: bigint) =>
      apiClient.get<GetMyApplicationDetailResponseType>(
        `/api/my/applications/${BigInt(applicationId)}`,
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

    /** 내 모집글 지원자 프로필 조회 */
    getMyPostApplicantProfile: (postId: bigint, userId: bigint) =>
      apiClient.get<MyPostApplicantProfileType>(
        `/api/profiles/applicant/${userId}/post/${postId}`,
      ),

    /** 지원 수락 */
    match: (postId: bigint, applicationId: bigint) =>
      apiClient.post<void>(
        `/api/matched/${postId}/applications/${applicationId}/accept`,
      ),

    /** 내 모집글 제안 내역 */
    getMyPostOffers: (postId: bigint) =>
      apiClient.get<MyPostOffersType>(`/api/posts/${postId}/recruits/offers`),

    /** 내 모집글 지원자 중 추천 */
    generateMyPostRecommendedApplicants: (postId: bigint) =>
      apiClient.post<MyPostRecommendedApplications>(
        `/api/recommendations/applicants/${postId}`,
      ),
  };
}
