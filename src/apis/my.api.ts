import { authApi } from '@/apis/fetcher/api';
import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type {
  GetMyApplicationDetailResponseType,
  MyPostApplicantDetailType,
  MyPostApplicationsType,
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
};

export default myApi;
