import type { PostCreateFormData } from '@/schemas/post.schema';
import type {
  CreatePostResponseType,
  GetMyAppliedPostsResponseType,
  GetMyBookmarkedPostsResponseType,
  GetMyMatchedPostsResponseType,
  GetMySuggestedPostResponseType,
  MyPostRecommendedUsersType,
  PostDetailType,
  PostMembersType,
  PostType,
  ProjectType,
  RecommendedPostsType,
} from '@/types/post.type';
import { api, authApi } from './fetcher/api';

const postApi = {
  /**
   * 게시글 목록
   * @parma query - 쿼리 스트링
   */
  getPosts: (query: string) =>
    authApi.get<PostType>(`/api/home?size=12&${query}`),

  /** AI 추천 게시글 */
  getRecommendedPosts: (projectType: ProjectType) =>
    authApi.get<RecommendedPostsType>(
      `/api/recommendations?projectType=${projectType}`,
    ),

  /** 모집글 상세 데이터 */
  getPostDetail: (id: bigint) =>
    authApi.get<PostDetailType>(`/api/posts/${BigInt(id)}`),

  /** 모집글 멤버 내역 */
  getPostMembers: (id: bigint) =>
    api.get<PostMembersType>(`/api/posts/${BigInt(id)}/recruits/members`),

  /** 모집 지원 */
  apply: (postId: bigint, data: { roleId: number; message: string }) =>
    authApi.post<void>(`/api/posts/${BigInt(postId)}/apply`, data),

  cancelApply: (applicationId: bigint) =>
    authApi.delete(`/api/my/applications/${applicationId}/cancel`),

  /** 제안 취소 */
  cancelOffer: (suggestionId: bigint) => {
    return authApi.delete<void>(
      `/api/my/suggestions/suggestions/${BigInt(suggestionId)}/cancel`,
    );
  },

  createPost: (payload: PostCreateFormData) => {
    return authApi.post<CreatePostResponseType>(`/api/posts`, payload);
  },

  /** 내가 지원한 글 목록 조회 */
  getMyAppliedPosts: (page?: number, size: number = 10) => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMyAppliedPostsResponseType>(
      `/api/my/applications?${params.toString()}`,
    );
  },

  /** 내가 제안 받은 글 목록 조회 */
  getMySuggestedPosts: (page?: number, size: number = 10) => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMySuggestedPostResponseType>(
      `/api/my/suggestions?${params.toString()}`,
    );
  },

  /** 내가 북마크한 글 목록 조회 */
  getMyBookmarkedPosts: (
    projectType: ProjectType,
    page?: number,
    size: number = 10,
  ) => {
    const params = new URLSearchParams();

    params.set('projectType', projectType);
    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMyBookmarkedPostsResponseType>(
      `/api/bookmarks?${params.toString()}`,
    );
  },

  /** 내가 매칭된 글 목록 조회 */
  getMyMatchedPosts: (page?: number, size: number = 10) => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (size) params.set('size', String(size));

    return authApi.get<GetMyMatchedPostsResponseType>(
      `/api/matched?${params.toString()}`,
    );
  },

  /** 내 모집글 추천 유저 */
  getMyPostRecommendedUsers: (postId: bigint) =>
    authApi.get<MyPostRecommendedUsersType>(
      `/api/recommendations/profiles/${BigInt(postId)}`,
    ),

  /** 멤버 제안 */
  offer: (postId: bigint, userId: bigint) =>
    authApi.post(`/api/my/suggestions/${BigInt(postId)}/suggestions`, {
      toUserId: BigInt(userId).toString(),
      suggestionMessage: '',
    }),
};

export default postApi;
