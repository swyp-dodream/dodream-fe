import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import postApi from '@/services/post.api';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내 모집글 추천 회원 */
export function useGetRecommendedUsers(postId: bigint) {
  const { data: profileExists, isSuccess } = useGetProfileExists();
  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myPostRecommendedUsers,
      BigInt(postId).toString(),
    ],
    queryFn: () => postApi.getMyPostRecommendedUsers(postId),
    enabled: isSuccess && profileExists.exists === true,
  });
}
