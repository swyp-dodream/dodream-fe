import { useMutation } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';

/** 내 모집글 지원자 중 추천 지원자 생성 */
export default function useGenerateMyPostRecommendedApplicants(postId: bigint) {
  return useMutation({
    mutationFn: () =>
      clientApis.recommendations.generateMyPostRecommendedApplicants(postId),
  });
}
