import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';

/** 내가 받은 리뷰 */
export default function useGetReceivedPostReviews(postId: bigint) {
  return useQuery({
    queryKey: [],
    queryFn: () => clientApis.review.getReceivedReviews(BigInt(postId)),
  });
}
