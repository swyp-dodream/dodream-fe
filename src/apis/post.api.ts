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

  /** 게시물 상세 데이터 */
  getPostDetail: (id: number) => api.get<PostContentType>(`/api/posts/${id}`),

  /** 게시물 멤버 내역 */
  getPostMembers: (id: number) =>
    api.get<PostMembersType>(`/api/posts/${id}/recruits/members`),

  /** 게시물 지원 */
  apply: (postId: number, data: { roleId: number; message: string }) =>
    authApi.post<void>(`/api/posts/${postId}/apply`, data),

  /** 게시물 지원 가능 여부 판단 */
  getApplyAvailable: (postId: number) =>
    authApi.get<{ canApply: boolean }>(`/api/posts/${postId}/can-apply`),

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },

  createPost: (payload: PostCreateFormData) => {
    return authApi.post<CreatePostResponseType>(`/api/posts`, payload);
  },
};

export default postApi;
