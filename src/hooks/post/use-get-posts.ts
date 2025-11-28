import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 게시물 목록 */
export function useGetPosts(query: string) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.posts, query],
    queryFn: () => postApi.getPosts(query),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/** 게시물 상세 정보 */
export function useGetPostDetail(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.postDetail, BigInt(postId).toString()],
    queryFn: () => postApi.getPostDetail(BigInt(postId)),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
