import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

/** 내가 특정 게시글에서 받은 리뷰 */
export default function useGetReceivedPostReviews(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.reviews, postId.toString()],
    queryFn: () => clientApis.review.getReceivedReviews(BigInt(postId)),
  });
}
