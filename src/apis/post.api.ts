import type {
  HomeProjectType,
  PostType,
  RecommendedPostsType,
} from '@/types/post.type';
import { api, authApi } from './fetcher/api';

const postApi = {
  /** 게시글 목록 */
  getPosts: (type: HomeProjectType) => {
    const query = type === 'ALL' ? '' : `?projectType=${type}`;
    return api.get<PostType>(`/api/posts${query}`);
  },

  /** AI 추천 게시글 */
  getRecommendedPosts: () => {
    return authApi.get<RecommendedPostsType>(`/api/recommendations`);
  },

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },
};

export default postApi;
