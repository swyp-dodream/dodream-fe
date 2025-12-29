import type { MyPostRecommendedApplications } from '@/types/my.type';
import type {
  MyPostRecommendedUsersType,
  ProjectType,
  RecommendedPostsType,
} from '@/types/post.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createRecommendationsApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 내 모집글 지원 유저 AI 추천 */
    generateMyPostRecommendedApplicants: (postId: bigint) =>
      apiClient.post<MyPostRecommendedApplications>(
        `/api/recommendations/applicants/${postId}`,
      ),

    /** 추천 게시글 조회 */
    getRecommendedPosts: (projectType: ProjectType) =>
      apiClient.get<RecommendedPostsType>(
        `/api/recommendations?projectType=${projectType}`,
      ),

    /** 추천 프로필 조회 */
    getMyPostRecommendedUsers: (postId: bigint) =>
      apiClient.get<MyPostRecommendedUsersType>(
        `/api/recommendations/profiles/${BigInt(postId)}`,
      ),
  };
}
