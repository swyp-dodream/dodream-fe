import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';
import type { Reaction, UserReview } from '@/types/review.type';

/** 후기 작성 */
export default function useCreateReview() {
  return useMutation({
    mutationFn: ({
      reviews,
      postId,
    }: {
      reviews: UserReview[];
      postId: bigint;
    }) =>
      Promise.all(
        reviews
          .filter(
            (r): r is UserReview & { reaction: Reaction } =>
              r.reaction !== null,
          )
          .map((review) =>
            clientApis.review.createReviews({
              postId: postId.toString(),
              toUserId: review.userId.toString(),
              feedbackType: review.reaction,
              options: review.tags,
            }),
          ),
      ),
    // TODO - 쿼리 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
  });
}
