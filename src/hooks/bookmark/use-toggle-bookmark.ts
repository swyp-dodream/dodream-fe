import { useMutation } from '@tanstack/react-query';
import bookmarkApi from '@/apis/bookmark.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

export default function useToggleBookmark() {
  return useMutation({
    mutationFn: (postId: bigint) => bookmarkApi.toggleBookmark(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.posts],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.postDetail, postId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myAppliedPosts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.mySuggestedPosts],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEY.auth, QUERY_KEY.myMatchedPosts],
      // });
    },
  });
}
