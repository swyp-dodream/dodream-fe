import type { PostType } from '@/types/post.type';
import { api } from './fetcher/api';

const postApi = {
  /** 게시글 목록 */
  getPosts: () => api.get<PostType>('/api/posts'),

  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },
};

export default postApi;
