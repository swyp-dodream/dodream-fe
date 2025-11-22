import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 내 모집글 추천 회원 */
export function useGetRecommendedUsers(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.myPostRecommendedUsers],
    queryFn: () => postApi.getMyPostRecommendedUsers(postId),
  });
}
