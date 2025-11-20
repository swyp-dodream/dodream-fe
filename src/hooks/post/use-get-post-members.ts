import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 모집글의 매칭된 멤버 */
export default function useGetPostMembers(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.postMembers, postId.toString()],
    queryFn: () => postApi.getPostMembers(postId),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
