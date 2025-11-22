import { useMutation } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

/** 제안하기 */
export default function useOffer() {
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: bigint; userId: bigint }) =>
      postApi.offer(postId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostRecommendedUsers,
          variables.postId.toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostApplications,
          variables.postId.toString(),
        ],
      });
      // TODO: 제안 내역 무효화
    },
  });
}
