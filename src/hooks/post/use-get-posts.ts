import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

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
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.postDetail, postId.toString()],
    queryFn: () => {
      if (isSuccess && profileExists?.exists === true) {
        return postApi.getPostDetailAuth(BigInt(postId));
      }
      return postApi.getPostDetail(BigInt(postId));
    },
    enabled: isSuccess,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
