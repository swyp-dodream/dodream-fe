import type {
  PostCreateFormData,
  PostUpdateFormData,
} from '@/schemas/post.schema';
import type {
  CreatePostResponseType,
  GetMyBookmarkedPostsResponseType,
  MyPostRecommendedUsersType,
  PostDetailType,
  PostMembersType,
  PostType,
  ProjectType,
  RecommendedPostsType,
  UpdatePostResponseType,
} from '@/types/post.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createPostApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /**
     * 게시글 목록
     * @param query - 쿼리 스트링
     */
    getPosts: (query: string) =>
      apiClient.get<PostType>(`/api/home?size=12&${query}`),

    /** AI 추천 게시글 */
    getRecommendedPosts: (projectType: ProjectType) =>
      apiClient.get<RecommendedPostsType>(
        `/api/recommendations?projectType=${projectType}`,
      ),

    /** 모집글 상세 데이터 */
    getPostDetail: (id: bigint) =>
      apiClient.get<PostDetailType>(`/api/posts/${BigInt(id)}`),

    /** 모집글 멤버 내역 */
    getPostMembers: (id: bigint) =>
      apiClient.get<PostMembersType>(
        `/api/posts/${BigInt(id)}/recruits/members`,
      ),

    /** 모집 지원 */
    apply: (postId: bigint, data: { roleId: number; message: string }) =>
      apiClient.post<void>(`/api/posts/${BigInt(postId)}/apply`, data),

    /** 모집글 생성 */
    createPost: (payload: PostCreateFormData) =>
      apiClient.post<CreatePostResponseType>('/api/posts', payload),

    /** 모집글 수정 */
    updatePost: (postId: bigint, payload: PostUpdateFormData) =>
      apiClient.put<UpdatePostResponseType>(
        `/api/posts/${postId.toString()}`,
        payload,
      ),

    /** 모집글 삭제 */
    deletePost: (postId: bigint) =>
      apiClient.delete(`/api/posts/${postId.toString()}`),

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

      return apiClient.get<GetMyBookmarkedPostsResponseType>(
        `/api/bookmarks?${params.toString()}`,
      );
    },

    /** 내 모집글 추천 유저 */
    getMyPostRecommendedUsers: (postId: bigint) =>
      apiClient.get<MyPostRecommendedUsersType>(
        `/api/recommendations/profiles/${BigInt(postId)}`,
      ),
  };
}
