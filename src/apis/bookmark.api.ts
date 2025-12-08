import { api } from '@/apis/fetcher/api';

const bookmarkApi = {
  /** 북마크 토글 */
  toggleBookmark: (postId: bigint) => {
    return api.post(`/api/bookmarks/${BigInt(postId)}`);
  },
};

export default bookmarkApi;
