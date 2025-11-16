import type { PostCreateFormData } from '@/schemas/post.schema';
import type {
  CreatePostResponseType,
  HomeProjectType,
  PostContentType,
  PostMembersType,
  PostType,
  RecommendedPostsType,
} from '@/types/post.type';
import { api, authApi } from './fetcher/api';

const postApi = {
  /**
   * 게시글 목록
   * @param projectType - 프로젝트 종류 (프로젝트/스터디)
   * TODO: 정렬, 필터링 추가
   */
  getPosts: (projectType: HomeProjectType) => {
    return api.get<PostType>(
      `/api/posts?sortType=LATEST&projectType=${projectType}`,
    );
  },

  /** AI 추천 게시글 */
  getRecommendedPosts: () => {
    return authApi.get<RecommendedPostsType>(`/api/recommendations`);
  },

  /** 모집글 상세 데이터 */
  getPostDetailAuth: (id: bigint) =>
    authApi.get<PostContentType>(`/api/posts/${BigInt(id)}`),
  getPostDetail: (id: bigint) =>
    api.get<PostContentType>(`/api/posts/${BigInt(id)}`),

  /** 모집글 멤버 내역 */
  getPostMembers: (id: bigint) =>
    api.get<PostMembersType>(`/api/posts/${BigInt(id)}/recruits/members`),

  /** 모집 지원 */
  apply: (postId: bigint, data: { roleId: number; message: string }) =>
    authApi.post<void>(`/api/posts/${BigInt(postId)}/apply`, data),

  /** 모집 지원 가능 여부 판단 */
  getApplyAvailable: (postId: bigint) =>
    authApi.get<{ canApply: boolean }>(
      `/api/posts/${BigInt(postId)}/can-apply`,
    ),

  /** 모집 지원 취소 */
  cancelApply: (applicationId: number) =>
    authApi.delete(`/api/my/applications/${applicationId}/cancel`),

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },

  createPost: (payload: PostCreateFormData) => {
    return authApi.post<CreatePostResponseType>(`/api/posts`, payload);
  },
};

export default postApi;
