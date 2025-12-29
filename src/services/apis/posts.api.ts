import type {
  PostCreateFormData,
  PostUpdateFormData,
} from '@/schemas/post.schema';
import type {
  MyPostApplicantDetailType,
  MyPostApplicationsType,
  MyPostOffersType,
  MyPostsResponseType,
} from '@/types/my.type';
import type {
  CreatePostResponseType,
  PostDetailType,
  PostMembersType,
  PostType,
  UpdatePostResponseType,
} from '@/types/post.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createPostsApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** -- 모집글 관련 -- */

    /** 모집글 수정 */
    updatePost: (postId: bigint, payload: PostUpdateFormData) =>
      apiClient.put<UpdatePostResponseType>(
        `/api/posts/${postId.toString()}`,
        payload,
      ),

    /** 모집글 삭제 */
    deletePost: (postId: bigint) =>
      apiClient.delete(`/api/posts/${postId.toString()}`),

    /** 모집글 목록 조회 */
    getPosts: (query: string) =>
      apiClient.get<PostType>(`/api/home?size=12&${query}`),

    /** 모집글 생성 */
    createPost: (payload: PostCreateFormData) =>
      apiClient.post<CreatePostResponseType>('/api/posts', payload),

    /** 모집글 지원 */
    apply: (postId: bigint, data: { roleId: number; message: string }) =>
      apiClient.post<void>(`/api/posts/${BigInt(postId)}/apply`, data),

    /** 모집글 상세 조회 */
    getPostDetail: (id: bigint) =>
      apiClient.get<PostDetailType>(`/api/posts/${BigInt(id)}`),

    /** 내가 쓴 글 목록 조회 */
    getMyPosts: (type: string, page: number, size = 10) => {
      const tab = type === 'PROJECT' ? 'project' : 'study';
      return apiClient.get<MyPostsResponseType>(
        `/api/posts/my?size=${size}&tab=${tab}&page=${page}`,
      );
    },

    /** -- 모집글의 모집 관련 -- */

    /** 내가 제안한 내역 조회 */
    getMyPostOffers: (postId: bigint) =>
      apiClient.get<MyPostOffersType>(`/api/posts/${postId}/recruits/offers`),

    /** 모집글 멤버 내역 조회 */
    getPostMembers: (id: bigint) =>
      apiClient.get<PostMembersType>(
        `/api/posts/${BigInt(id)}/recruits/members`,
      ),

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
  };
}
