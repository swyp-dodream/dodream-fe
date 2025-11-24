import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 내 모집글 지원자 중 추천 지원자 */
export default function useGetMyPostRecommendedApplicants(postId: bigint) {
  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myPostRecommendedApplicants,
      postId.toString(),
    ],
    queryFn: () => myApi.getMyPostRecommendedApplicants(postId),
  });
}
