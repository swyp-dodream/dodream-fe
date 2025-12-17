import type { createApiMethods } from '../fetcher/create-api';

export function createBookmarkApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 북마크 토글 */
    toggleBookmark: (postId: bigint) =>
      apiClient.post(`/api/bookmarks/${BigInt(postId)}`),
  };
}
