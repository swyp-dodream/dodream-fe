import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import postApi from '@/services/post.api';

/** 지원 취소 */
export default function useCancelApply(postId: bigint) {
  return useMutation({
    mutationFn: (applicationId: bigint) => postApi.cancelApply(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.canApply,
          BigInt(postId).toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.postDetail,
          BigInt(postId).toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myAppliedPosts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.mySuggestedPosts],
      });
    },
  });
}
