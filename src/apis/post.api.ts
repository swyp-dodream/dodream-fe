import type { PostCreateFormData } from '@/schemas/post.schema';
import type {
  CreatePostResponseType,
  GetMyAppliedPostsResponseType,
  GetMySuggestedPostResponseType,
  PostDetailType,
  PostMembersType,
  PostType,
  RecommendedPostsType,
} from '@/types/post.type';
import { api, authApi } from './fetcher/api';

const postApi = {
  /**
   * 게시글 목록
   * @parma query - 쿼리 스트링
   */
  getPosts: (query: string) => api.get<PostType>(`/api/home?size=12&${query}`),

  /** AI 추천 게시글 */
  getRecommendedPosts: () => {
    return authApi.get<RecommendedPostsType>(`/api/recommendations`);
  },

  /** 모집글 상세 데이터 */
  getPostDetailAuth: (id: bigint) =>
    authApi.get<PostDetailType>(`/api/posts/${BigInt(id)}`),
  getPostDetail: (id: bigint) =>
    api.get<PostDetailType>(`/api/posts/${BigInt(id)}`),

  /** 모집글 멤버 내역 */
  getPostMembers: (id: bigint) =>
    api.get<PostMembersType>(`/api/posts/${BigInt(id)}/recruits/members`),

  /** 모집 지원 */
  apply: (postId: bigint, data: { roleId: number; message: string }) =>
    authApi.post(`/api/posts/${BigInt(postId)}/apply`, data),

  /** 모집 지원 가능 여부 판단 */
  getApplyAvailable: (postId: bigint) =>
    authApi.get<{ canApply: boolean }>(
      `/api/posts/${BigInt(postId)}/can-apply`,
    ),

  /** 모집 지원 취소 */
  cancelApply: (applicationId: bigint) =>
    authApi.delete(`/api/my/applications/${applicationId}/cancel`),

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },

  createPost: (payload: PostCreateFormData) => {
    return authApi.post<CreatePostResponseType>(`/api/posts`, payload);
  },

  /** 내가 지원한 글 목록 조회 */
  getMyAppliedPosts: (page?: number, size?: number) => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMyAppliedPostsResponseType>(
      `/api/my/applications?${params.toString()}`,
    );
  },

  /** 내가 제안 받은 글 목록 조회 */
  getMySuggestedPosts: (page?: number, size?: number) => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMySuggestedPostResponseType>(
      `/api/my/suggestions?${params.toString()}`,
    );
  },
};

export default postApi;
