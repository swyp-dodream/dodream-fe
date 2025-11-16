import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

/** AI 추천 게시물 */
export default function useGetRecommendedPosts() {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.aiPost],
    queryFn: postApi.getRecommendedPosts,
    enabled: !!profileExists?.exists,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
