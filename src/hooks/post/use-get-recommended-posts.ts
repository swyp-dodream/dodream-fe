import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';
import type { ProjectType } from '@/types/post.type';
import { useGetProfileExists } from '../profile/use-get-profile';

/** AI 추천 게시물 */
export default function useGetRecommendedPosts(projectType: ProjectType) {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.aiPost, projectType],
    queryFn: () => clientApis.recommendations.getRecommendedPosts(projectType),
    enabled: isSuccess && profileExists?.exists === true,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
