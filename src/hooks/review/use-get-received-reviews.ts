import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

/** 특정 유저가 받은 리뷰 조회 */
export default function useGetReceivedReviews(userId: bigint) {
  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.reviews,
      QUERY_KEY.userReviews,
      userId.toString(),
    ],
    queryFn: () => clientApis.review.getUserReviews(BigInt(userId)),
  });
}
