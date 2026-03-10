import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';
import type { UserReview } from '@/types/review.type';

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
          .filter((r) => r.reaction !== null)
          .map((review) =>
            clientApis.review.createReviews({
              postId: BigInt(postId).toString(),
              toUserId: BigInt(review.userId).toString(),
              feedbackType: review.reaction!,
              options: review.tags,
            }),
          ),
      ),
    // 리뷰 가능한 멤버 내역 무효화
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.reviewMembers,
          variables.postId.toString(),
        ],
      });
      // 특정 유저의 리뷰 무효화
      variables.reviews
        .filter((r) => r.reaction !== null)
        .forEach((review) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.userReviews, review.userId.toString()],
          });
        });
    },
  });
}
