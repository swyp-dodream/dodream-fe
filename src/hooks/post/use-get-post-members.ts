import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

/** 모집글의 매칭된 멤버 */
export default function useGetPostMembers(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.postMembers, BigInt(postId).toString()],
    queryFn: () => clientApis.post.getPostMembers(postId),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
