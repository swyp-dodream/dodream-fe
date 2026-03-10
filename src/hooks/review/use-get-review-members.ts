import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';
import type { ReviewMemberResponseType } from '@/types/review.type';

/** 리뷰 작성 가능한 멤버 내역 */
export default function useGetReviewMembers(postId: bigint) {
  return useQuery<ReviewMemberResponseType[]>({
    queryKey: [],
    queryFn: () => clientApis.review.getReviewMemberList(BigInt(postId)),
  });
}
