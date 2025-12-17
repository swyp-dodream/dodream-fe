import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import postApi from '@/services/post.api';

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
          BigInt(variables.postId).toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostApplications,
          BigInt(variables.postId).toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostOffers,
          BigInt(variables.postId).toString(),
        ],
      });
    },
  });
}
