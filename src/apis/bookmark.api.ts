import { authApi } from '@/apis/fetcher/api';

const bookmarkApi = {
  /** 북마크 토글 */
  toggleBookmark: (postId: bigint) => {
    return authApi.post(`/api/bookmarks/${BigInt(postId)}`);
  },
};

export default bookmarkApi;
