import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';

export default function useGetMyReviews(postId: bigint) {
  return useQuery({
    queryKey: [],
    queryFn: () => clientApis.review.getPostReviews(BigInt(postId)),
  });
}
