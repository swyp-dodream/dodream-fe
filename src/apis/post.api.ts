import type { PostCreateFormData } from '@/schemas/post.schema';
import type {
  HomeProjectType,
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

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },

  createPost: (payload: PostCreateFormData) => {
    return authApi.post<void>(`/api/posts`, payload);
  },
};

export default postApi;
