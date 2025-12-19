import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

/** 게시물 목록 */
export function useGetPosts(query: string) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.posts, query],
    queryFn: () => clientApis.posts.getPosts(query),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/** 게시물 상세 정보 */
export function useGetPostDetail(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.postDetail, BigInt(postId).toString()],
    queryFn: () => clientApis.posts.getPostDetail(BigInt(postId)),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
