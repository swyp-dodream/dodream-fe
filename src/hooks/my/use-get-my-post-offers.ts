import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

/** 내 모집글 제안 내역 */
export default function useGetMyPostOffers(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostOffers, postId.toString()],
    queryFn: () => clientApis.posts.getMyPostOffers(postId),
  });
}
