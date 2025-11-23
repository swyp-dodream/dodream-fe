import { authApi } from '@/apis/fetcher/api';
import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type {
  GetMyApplicationDetailResponseType,
  MyPostApplicantDetailType,
  MyPostApplicantProfileType,
  MyPostApplicationsType,
  MyPostOffersType,
  MyPostsResponseType,
} from '@/types/my.type';

const myApi = {
  /** 내 지원 상세 조회 */
  getMyApplicationDetail: (applicationId: bigint) => {
    return authApi.get<GetMyApplicationDetailResponseType>(
      `/api/my/applications/${BigInt(applicationId)}`,
    );
  },

  /** 매칭 취소 */
  cancelMatching: (
    matchingId: bigint,
    reasonCode: MatchingCancelReasonCode,
    reasonText: string,
  ) => {
    return authApi.post(`/api/matched/${BigInt(matchingId)}/cancel`, {
      reasonCode,
      reasonText,
    });
  },

  /** 내가 쓴 글 목록 */
  getMyPosts: (type: string) => {
    const tab = type === 'PROJECT' ? 'project' : 'study';
    return authApi.get<MyPostsResponseType>(`/api/posts/my?tab=${tab}`);
  },

  /** 내 모집글 지원 목록 조회 */
  getMyPostApplications: (postId: bigint) =>
    authApi.get<MyPostApplicationsType>(
      `/api/posts/${BigInt(postId)}/recruits/applications`,
    ),

  /** 내 모집글 지원자 상세 정보 */
  getMyPostApplicantDetail: (postId: bigint, applicationId: bigint) =>
    authApi.get<MyPostApplicantDetailType>(
      `/api/posts/${postId}/recruits/applications/${applicationId}`,
    ),

  /** 내 모집글 지원자 프로필 조회 */
  getMyPostApplicantProfile: (postId: bigint, userId: bigint) =>
    authApi.get<MyPostApplicantProfileType>(
      `/api/profiles/applicant/${userId}/post/${postId}`,
    ),

  /** 지원 수락 */
  match: (postId: bigint, applicationId: bigint) =>
    authApi.post<void>(
      `/api/matched/${postId}/applications/${applicationId}/accept`,
    ),

  /** 내 모집글 제안 내역 */
  getMyPostOffers: (postId: bigint) =>
    authApi.get<MyPostOffersType>(`/api/posts/${postId}/recruits/offers`),
};

export default myApi;
