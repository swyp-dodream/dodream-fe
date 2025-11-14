import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../auth/use-get-profile';

export default function useGetRecommendedPosts() {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.aiPost],
    queryFn: postApi.getRecommendedPosts,
    enabled: !!profileExists?.exists,
  });
}
