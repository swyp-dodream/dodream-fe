import type { HomeProjectType, PostType } from '@/types/post.type';
import { api } from './fetcher/api';

const postApi = {
  /** 게시글 목록 */
  getPosts: (type: HomeProjectType) => {
    const query = type === 'ALL' ? '' : `&projectType=${type}`;
    return api.get<PostType>(`/api/posts${query}`);
  },

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },
};

export default postApi;
